import { supabase } from '@/lib/supabase'

// Snapshots the course's *current* price. Only call this when creating a new
// student — never on edit — so existing students keep the price they were
// originally charged even if this course's price changes later.
export async function getCoursePrice(course: string): Promise<number | null> {
  const { data, error } = await supabase
    .from('course_prices')
    .select('price')
    .eq('course', course)
    .maybeSingle()

  if (error) {
    console.error(error)
    return null
  }

  return data?.price ?? null
}
