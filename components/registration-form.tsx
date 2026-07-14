'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { supabase } from "@/lib/supabase"
import { getCoursePrice } from "@/components/prices/get-course-price"

export function RegistrationForm() {
  const [toast, setToast] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    gender: '',
    age: '',
    address: '',
    course: 'makeup',
    schedule: 'morning',
    experience: 'none',
    source: '',
    notes: '',
    agreeTerms: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeTerms) {
      alert("Please agree to the terms and conditions")
      return
    }

    setLoading(true)

    // Snapshot the course's current price at signup time — if the price
    // changes later, this student keeps the fee they registered under.
    const totalFee = await getCoursePrice(formData.course)

    const { error } = await supabase.from("students").insert([
      {
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        gender: formData.gender,
        age: formData.age ? Number(formData.age) : null,
        address: formData.address,

        // course system (single or combo stored as array)
        courses: [formData.course],

        schedule: formData.schedule,
        experience: formData.experience,

        source: formData.source,
        notes: formData.notes,

        status: "active",
        total_fee: totalFee,
      },
    ])

    setLoading(false)

    if (error) {
      console.error(error)
      alert("Registration failed!")
      return
    }

    setToast(true)

    // RESET FORM (important)
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      gender: '',
      age: '',
      address: '',
      course: 'makeup',
      schedule: 'morning',
      experience: 'none',
      source: '',
      notes: '',
      agreeTerms: false,
    })

    setTimeout(() => {
      setToast(false)
    }, 4000)
  }

  return (
    <section id="register" className="py-20 bg-secondary/30 relative">

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-accent/30 shadow-lg rounded-2xl px-5 py-4">
          <CheckCircle size={22} className="text-accent" />
          <p className="text-sm font-semibold text-foreground">
            Registered successfully!
          </p>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Register Now</h2>
          <p className="text-gray-600 mt-4">
            Join Arkani Beauty Academy
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-sm border"
        >

          {/* Full Name */}
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full mb-4 p-3 border rounded"
            required
          />

          {/* Email */}
          <input
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full mb-4 p-3 border rounded"
            required
          />

          {/* Phone */}
          <input
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full mb-4 p-3 border rounded"
            required
          />

          {/* Age */}
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Age"
            className="w-full mb-4 p-3 border rounded"
            required
          />

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full mb-4 p-3 border rounded"
          >
            <option value="">Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>

          {/* Course */}
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="w-full mb-4 p-3 border rounded"
          >
            <option value="makeup">Makeup</option>
            <option value="hair">Hair</option>
            <option value="nails">Nails</option>
            <option value="hair-makeup">Hair & Makeup</option>
            <option value="hair-nails">Hair & Nails</option>
            <option value="makeup-nails">Makeup & Nails</option>
            <option value="full">Full Package</option>
          </select>

          {/* Schedule */}
          <select
            name="schedule"
            value={formData.schedule}
            onChange={handleInputChange}
            className="w-full mb-4 p-3 border rounded"
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="weekend">Weekend</option>
          </select>

          {/* Experience */}
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="w-full mb-4 p-3 border rounded"
          >
            <option value="none">None</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
          </select>

          {/* Address */}
          <input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full mb-4 p-3 border rounded"
          />

          {/* Source */}
          <input
            name="source"
            value={formData.source}
            onChange={handleInputChange}
            placeholder="How did you hear about us?"
            className="w-full mb-4 p-3 border rounded"
          />

          {/* Notes */}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Notes"
            className="w-full mb-4 p-3 border rounded"
          />

          {/* Terms */}
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
            />
            I agree to terms
          </label>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-3 rounded-full"
          >
            {loading ? "Registering..." : "Register Now"}
          </Button>

        </form>
      </div>
    </section>
  )
}
