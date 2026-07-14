"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Edit2, Trash2 } from "lucide-react"
import { format } from "date-fns"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Student = {
  id: string
  full_name: string
  email: string
  phone: string
  batch?: string
  status?: string
  enroll_date?: string
}

interface StudentTableProps {
  searchQuery?: string
  filterStatus?: string
  refreshKey?: number
}

export function StudentTable({ searchQuery = "", filterStatus = "all", refreshKey = 0 }: StudentTableProps) {
  const [allStudents, setAllStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStudents() {
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
    }

    fetchStudents()
  }, [refreshKey])

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
              <th className="px-6 py-4 text-left text-sm font-semibold">Batch</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Enroll Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border">
            {students.map((student) => (
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
                  {student.batch || "-"}
                </td>

                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {student.status || "Active"}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {student.enroll_date
                    ? format(new Date(student.enroll_date), "MMM dd, yyyy")
                    : "-"}
                </td>

                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-muted-foreground hover:text-primary">
                      <Edit2 size={16} />
                    </button>

                    <button className="p-2 text-muted-foreground hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {students.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No students found</p>
        </div>
      )}
    </div>
  )
}