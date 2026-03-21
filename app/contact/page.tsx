"use client"

import { useState } from "react"
import { Navigation } from "@/components/layout/navigation"
import { SiteFooter } from "@/components/layout/site-footer"
import { Loader2, AlertCircle, Download } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Something went wrong")
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error.message)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <Navigation />
      <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Hero */}
        <section className="mb-24">
          <div className="max-w-3xl">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#944a32] mb-4">
              Availability: Open for Projects
            </p>
            <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-light italic tracking-tight text-[#5f5e5e] leading-[1.05]">
              Let&apos;s build something intentional.
            </h1>
          </div>
        </section>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* Info */}
          <aside className="lg:col-span-4 space-y-16">
            <div className="bg-[#f3f4f1] p-8 relative">
              <div className="space-y-10">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#655d59] block mb-4">
                    Primary Contact
                  </span>
                  <a
                    href="mailto:raghav.verma.work@gmail.com"
                    className="font-headline text-lg italic text-[#2f3331] hover:text-[#944a32] transition-colors duration-300 break-all"
                  >
                    raghav.verma.work@gmail.com
                  </a>
                </div>

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#655d59] block mb-4">
                    Curriculum Vitae
                  </span>
                  <a
                    href="/RaghavVerma_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="inline-flex items-center gap-2 bg-[#5f5e5e] text-[#faf7f6] px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#944a32] transition-all duration-300"
                  >
                    <Download size={14} />
                    Download Resume
                  </a>
                </div>

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#655d59] block mb-4">
                    Digital Footprint
                  </span>
                  <div className="flex gap-6">
                    <Link
                      href="https://github.com/Raghaverma"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs uppercase tracking-widest text-[#5f5e5e] hover:text-[#944a32] transition-colors"
                    >
                      GitHub
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/raghaverma/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-sans text-xs uppercase tracking-widest text-[#5f5e5e] hover:text-[#944a32] transition-colors"
                    >
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center py-24 bg-white border border-[#e0e3e0] overflow-hidden relative"
              >
                {/* Animated ring + check */}
                <motion.div
                  className="relative mb-8"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    {/* Background circle */}
                    <circle cx="40" cy="40" r="36" fill="none" stroke="#f3f4f1" strokeWidth="3" />
                    {/* Animated ring */}
                    <motion.circle
                      cx="40" cy="40" r="36"
                      fill="none"
                      stroke="#944a32"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="226"
                      initial={{ strokeDashoffset: 226 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ delay: 0.2, duration: 0.7, ease: "easeInOut" }}
                      style={{ rotate: -90, transformOrigin: "40px 40px" }}
                    />
                    {/* Animated checkmark */}
                    <motion.path
                      d="M24 40 L35 51 L56 30"
                      fill="none"
                      stroke="#944a32"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="45"
                      initial={{ strokeDashoffset: 45 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ delay: 0.85, duration: 0.4, ease: "easeOut" }}
                    />
                  </svg>
                </motion.div>

                <motion.h4
                  className="font-headline text-4xl mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55, duration: 0.4, ease: "easeOut" }}
                >
                  Message Sent
                </motion.h4>

                <motion.p
                  className="text-[#5c605d] text-center max-w-xs leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.68, duration: 0.4, ease: "easeOut" }}
                >
                  Thanks for reaching out. I&apos;ll get back to you soon.
                </motion.p>

                <motion.button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-[10px] uppercase tracking-[0.2em] font-bold text-[#944a32] hover:underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.3 }}
                >
                  Send another
                </motion.button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-10 bg-white p-8 md:p-12 border border-[#e0e3e0]"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#655d59]">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      minLength={2}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full border-0 border-b border-[#afb3b0] focus:border-[#944a32] focus:outline-none bg-transparent py-3 placeholder:text-[#afb3b0] text-[#2f3331] transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-[#655d59]">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                      className="w-full border-0 border-b border-[#afb3b0] focus:border-[#944a32] focus:outline-none bg-transparent py-3 placeholder:text-[#afb3b0] text-[#2f3331] transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-[#655d59]">
                    Your Inquiry
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    required
                    maxLength={500}
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className="w-full border-0 border-b border-[#afb3b0] focus:border-[#944a32] focus:outline-none bg-transparent py-3 placeholder:text-[#afb3b0] text-[#2f3331] transition-colors resize-none text-sm"
                  />
                  <div className="text-xs text-[#afb3b0] text-right">
                    {formData.message.length}/500
                  </div>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-[#9f403d]">
                    <AlertCircle size={16} />
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full md:w-auto bg-[#2f3331] text-[#faf7f6] px-12 py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#944a32] transition-all duration-300 flex items-center gap-2 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
