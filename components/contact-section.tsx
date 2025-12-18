import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build <span className="text-primary">Together</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Currently freelancing with Hypeliv Solutions and actively seeking new freelance projects. Let's create
            something exceptional together.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
            <a
              href="mailto:work@raghav-verma.com"
              className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
            >
              <Mail className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="font-semibold text-sm group-hover:text-primary transition-colors">
                  work@raghav-verma.com
                </div>
              </div>
            </a>

            <a
              href="tel:+919717994197"
              className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
            >
              <Phone className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Phone</div>
                <div className="font-semibold text-sm group-hover:text-primary transition-colors">+91 9717994197</div>
              </div>
            </a>

            <a
              href="https://github.com/Raghaverma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group"
            >
              <Github className="w-5 h-5 text-primary" />
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
              <Linkedin className="w-5 h-5 text-primary" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">LinkedIn</div>
                <div className="font-semibold text-sm group-hover:text-primary transition-colors">/raghav-verma</div>
              </div>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
              <a href="mailto:work@raghav-verma.com">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Portfolio
              </a>
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Based in New Delhi, India • Available for Freelance Projects</span>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center font-mono text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Raghav Verma. Built with Next.js & Tailwind CSS.</div>
          <div className="mt-2">Designed with precision. Engineered with passion.</div>
        </div>
      </div>
    </section>
  )
}
