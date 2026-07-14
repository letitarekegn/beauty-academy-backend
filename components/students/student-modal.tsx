'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { COURSES, type Student } from './types';
import { getCoursePrice } from '@/components/prices/get-course-price';

interface StudentModalProps {
  student?: Student;
  onClose: () => void;
  onSuccess?: () => void;
}

export function StudentModal({ student, onClose, onSuccess }: StudentModalProps) {
  const isEditing = Boolean(student);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: student?.full_name ?? '',
    email: student?.email ?? '',
    phone: student?.phone ?? '',
    gender: student?.gender ?? '',
    age: student?.age?.toString() ?? '',
    address: student?.address ?? '',
    course: student?.courses?.[0] ?? 'makeup',
    schedule: student?.schedule ?? 'morning',
    experience: student?.experience ?? 'none',
    graduated: student?.graduation_status === 'graduated',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload: Record<string, unknown> = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      age: formData.age ? Number(formData.age) : null,
      address: formData.address,
      courses: [formData.course],
      schedule: formData.schedule,
      experience: formData.experience,
      graduation_status: formData.graduated ? 'graduated' : 'not_graduated',
      status: formData.graduated ? 'graduated' : 'active',
    };

    // Stamp graduated_at when transitioning to graduated, or backfill it for
    // a student that's already graduated but is somehow missing the date
    // (e.g. graduated before this field existed). An unrelated edit while
    // already graduated with a date set must not bump it, and un-graduating
    // clears it.
    const wasGraduated = student?.graduation_status === 'graduated';
    if (formData.graduated && (!wasGraduated || !student?.graduated_at)) {
      payload.graduated_at = new Date().toISOString();
    } else if (!formData.graduated && wasGraduated) {
      payload.graduated_at = null;
    }

    // Snapshot the course's current price only for new students — editing
    // an existing student must never change the fee they were charged.
    if (!isEditing) {
      payload.total_fee = await getCoursePrice(formData.course);
    }

    const { data, error } = isEditing
      ? await supabase.from('students').update(payload).eq('id', student!.id).select()
      : await supabase.from('students').insert([payload]).select();

    setLoading(false);

    if (error) {
      console.error(error);
      setError(error.message);
      return;
    }

    if (!data || data.length === 0) {
      setError('No student was updated. This usually means a database permission (RLS policy) is blocking the change.');
      return;
    }

    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">
            {isEditing ? 'Edit Student' : 'Add New Student'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Enter full name"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter email"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Course */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Course</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {COURSES.map((course) => (
                <option key={course.value} value={course.value}>{course.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Schedule */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Schedule</label>
              <select
                name="schedule"
                value={formData.schedule}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="weekend">Weekend</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Experience</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="none">None</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Graduation toggle - only meaningful once a student already exists */}
          {isEditing && (
            <label className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5">
              <input
                type="checkbox"
                name="graduated"
                checked={formData.graduated}
                onChange={handleInputChange}
                className="size-4"
              />
              <span className="text-sm font-medium text-foreground">Mark as Graduated</span>
            </label>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
