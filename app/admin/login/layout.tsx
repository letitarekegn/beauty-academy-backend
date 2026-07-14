import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Login - Arkani Beauty Academy",
  description: "Sign in to the Arkani Beauty Academy admin dashboard",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}