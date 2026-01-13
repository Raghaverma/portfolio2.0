"use client"

import { useState } from "react"
import { Mail, MapPin, Github, Linkedin, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCard } from "@/components/ui/tilt-card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactSection() {
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error: any) {
      setStatus("error")
      setErrorMessage(error.message)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section id="contact" className="py-10 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard className="glass-card rounded-lg p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column: Info */}
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Let's Build <span className="text-primary">&#123;Together&#125;</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Currently freelancing with Hypeliv Solutions and actively seeking new freelance projects. Let's create
                something exceptional together.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href="https://github.com/Raghaverma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                >
                  <Github className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">GitHub</div>
                    <div className="font-semibold text-sm group-hover:text-primary transition-colors">@Raghaverma</div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/raghaverma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">LinkedIn</div>
                    <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                      /raghav-verma
                    </div>
                  </div>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
                  <a href="https://cal.com/raghaverma/30min" target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Book a Call
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/RaghavVerma_CV.pdf" target="_blank" rel="noopener noreferrer" download>
                    <FileText className="w-4 h-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground/60 font-mono">
                <MapPin className="w-3 h-3" />
                <span>Based in New Delhi, India • Available for Freelance Projects</span>
              </div>
            </div>

            {/* Right Column: API Form */}
            <div className="bg-background/40 p-6 rounded-lg border border-border/50">
              <h3 className="text-xl font-bold mb-4">Send a Message</h3>
              {status === "success" ? (
                <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="flex justify-center">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold">Message Sent!</h4>
                  <p className="text-muted-foreground">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <Button onClick={() => setStatus("idle")} variant="outline">
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      minLength={2}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can I help you?"
                      required
                      maxLength={500}
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={status === "loading"}
                    />
                    <div className="text-xs text-muted-foreground text-right">{formData.message.length}/500</div>
                  </div>

                  {status === "error" && (
                    <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errorMessage}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/10 text-center">
            <div className="text-xs text-muted-foreground/60 font-mono">
              © {new Date().getFullYear()} Raghav Verma. All systems nominal.
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  )
}
