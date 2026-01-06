import { Mail, MapPin, Github, Linkedin, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCard } from "@/components/ui/tilt-card"

export function ContactSection() {
  return (
    <section id="contact" className="py-10 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <TiltCard className="glass-card rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's Build <span className="text-primary">&#123;Together&#125;</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Currently freelancing with Hypeliv Solutions and actively seeking new freelance projects. Let's create
            something exceptional together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <a
              href="mailto:raghav.verma.work@gmail.com"
              className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group justify-center md:justify-start"
            >
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="text-left overflow-hidden">
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="font-semibold text-sm group-hover:text-primary transition-colors truncate">
                  raghav.verma.work@gmail.com
                </div>
              </div>
            </a>

            <a
              href="https://github.com/Raghaverma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group justify-center md:justify-start"
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
              className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors group justify-center md:justify-start"
            >
              <Linkedin className="w-5 h-5 text-primary flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">LinkedIn</div>
                <div className="font-semibold text-sm group-hover:text-primary transition-colors">/raghav-verma</div>
              </div>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

          <div className="mt-12 pt-8 border-t border-border/10">
            <div className="flex flex-col items-center justify-center gap-3 text-xs text-muted-foreground/60 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>Based in New Delhi, India • Available for Freelance Projects</span>
              </div>
              <div>© {new Date().getFullYear()} Raghav Verma. All systems nominal.</div>
            </div>
          </div>


        </TiltCard>

      </div>
    </section>
  )
}
