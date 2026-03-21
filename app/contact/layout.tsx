import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Raghav Verma",
  description:
    "Get in touch with Raghav Verma — full-stack developer based in New Delhi. Available for freelance projects, full-time opportunities, and collaborations.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
