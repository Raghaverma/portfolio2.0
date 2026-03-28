"use client"

import { useState } from "react"
import { Loader2, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ContactSectionNew() {
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
    <section
      id="contact"
      className="px-6 md:px-12 pb-20 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 py-20 bg-[#f3f4f1] px-8 md:px-16">
        {/* Left */}
        <div className="lg:col-span-5">
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#944a32]">
            Inquiry
          </span>
          <h2 className="font-headline text-5xl mt-4 mb-8 leading-tight">
            Let&apos;s build something{" "}
            <span className="serif-italic">intentional.</span>
          </h2>
          <p className="text-[#5c605d] leading-relaxed mb-6">
            Currently accepting new projects and collaborations. If you have an
            idea that needs architectural precision and a humanist touch, I&apos;d
            love to hear it.
          </p>
          <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#655d59] mb-12">
            Usually replies within 24–48 hours
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#944a32] shadow-sm text-sm font-bold">
                @
              </div>
              <a
                href="mailto:raghav.verma.work@gmail.com"
                className="text-sm font-medium hover:text-[#944a32] transition-colors"
              >
                raghav.verma.work@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#944a32] shadow-sm text-sm font-bold">
                in
              </div>
              <a
                href="https://www.linkedin.com/in/raghaverma/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-[#944a32] transition-colors"
              >
                linkedin.com/in/raghaverma
              </a>
            </div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center py-20 bg-white p-8 md:p-12 shadow-sm"
            >
              <motion.div
                className="relative mb-8"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="36" fill="none" stroke="#f3f4f1" strokeWidth="3" />
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
                className="font-headline text-3xl mb-3"
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
              className="space-y-10 bg-white p-8 md:p-12 shadow-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                  rows={4}
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
    </section>
  )
}
