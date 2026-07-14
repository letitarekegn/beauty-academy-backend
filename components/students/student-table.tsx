"use client"

import { useCallback, useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Edit2, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { StudentModal } from "./student-modal"
import { COURSES, type Student } from "./types"
import { SuccessToast } from "@/components/success-toast"
import { ConfirmDialog } from "@/components/confirm-dialog"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function courseLabel(value: string) {
  return COURSES.find((c) => c.value === value)?.label ?? value
}

interface StudentTableProps {
  searchQuery?: string
  filterStatus?: string
  refreshKey?: number
}

export function StudentTable({ searchQuery = "", filterStatus = "all", refreshKey = 0 }: StudentTableProps) {
  const [allStudents, setAllStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [showEditSuccess, setShowEditSuccess] = useState(false)

  const fetchStudents = useCallback(async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("id", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setAllStudents(data || [])
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents, refreshKey])

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return

    setDeleting(true)
    const { error } = await supabase.from("students").delete().eq("id", deleteTarget.id)
    setDeleting(false)

    if (error) {
      console.error(error)
      alert("Failed to delete student.")
      return
    }

    setAllStudents((prev) => prev.filter((s) => s.id !== deleteTarget.id))
    setDeleteTarget(null)
  }

  const handleEditSuccess = () => {
    fetchStudents()
    setShowEditSuccess(true)
    setTimeout(() => setShowEditSuccess(false), 4000)
  }

  const students = allStudents.filter((student) => {
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      student.full_name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    const matchesFilter = filterStatus === "all" || student.status === filterStatus
    return matchesSearch && matchesFilter
  })

  if (loading) {
    return <p className="p-4">Loading students...</p>
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Course</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Total Fee</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Enrolled</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {students.map((student) => {
              const isGraduated = student.graduation_status === "graduated"
              return (
                <tr key={student.id} className="hover:bg-muted/50 transition-colors">

                  <td className="px-6 py-4 text-sm font-medium">
                    {student.full_name}
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {student.email}
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {student.phone}
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {student.courses?.length ? student.courses.map(courseLabel).join(", ") : "-"}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {student.total_fee != null ? `${student.total_fee.toLocaleString()} ETB` : "-"}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isGraduated ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                    }`}>
                      {isGraduated ? "Graduated" : student.status || "Active"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {student.created_at
                      ? format(new Date(student.created_at), "MMM dd, yyyy")
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingStudent(student)}
                        className="p-2 text-muted-foreground hover:text-primary"
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        onClick={() => setDeleteTarget(student)}
                        className="p-2 text-muted-foreground hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No students found</p>
        </div>
      )}

      {editingStudent && (
        <StudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
          onSuccess={handleEditSuccess}
        />
      )}

      {showEditSuccess && <SuccessToast message="Student updated successfully!" />}

      {deleteTarget && (
        <ConfirmDialog
          title="Delete student"
          message={`Are you sure you want to delete ${deleteTarget.full_name}? This action cannot be undone.`}
          confirmLabel="Delete"
          loading={deleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}
