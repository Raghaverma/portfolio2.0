"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Home,
    Briefcase,
    Code2,
    FolderGit2,
    Mail,
    Github,
    Linkedin,
    FileText,
    Calendar,
    Search,
} from "lucide-react"

/**
 * Command Palette Component
 * Keyboard-accessible command menu for quick navigation
 * Triggered with Cmd+K (Mac) or Ctrl+K (Windows/Linux)
 */
export function CommandPalette() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    // Handle keyboard shortcut
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = useCallback((command: () => void) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            {/* Keyboard Hint Button */}
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-primary/90 hover:bg-primary text-primary-foreground rounded-full shadow-lg transition-all hover:scale-105 backdrop-blur-sm"
                aria-label="Open command palette"
            >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline text-sm font-medium">Quick Actions</span>
                <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-primary-foreground/20 bg-primary-foreground/10 px-1.5 font-mono text-[10px] font-medium">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>

                    <CommandGroup heading="Navigation">
                        <CommandItem
                            onSelect={() => runCommand(() => router.push("/"))}
                        >
                            <Home className="mr-2 h-4 w-4" />
                            <span>Home</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => router.push("/experience"))}
                        >
                            <Briefcase className="mr-2 h-4 w-4" />
                            <span>Experience</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => router.push("/skills"))}
                        >
                            <Code2 className="mr-2 h-4 w-4" />
                            <span>Skills</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => router.push("/projects"))}
                        >
                            <FolderGit2 className="mr-2 h-4 w-4" />
                            <span>Projects</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => {
                                const element = document.getElementById("contact")
                                if (element) {
                                    element.scrollIntoView({ behavior: "smooth" })
                                }
                            })}
                        >
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Contact</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Quick Actions">
                        <CommandItem
                            onSelect={() => runCommand(() => {
                                window.open("https://github.com/Raghaverma", "_blank")
                            })}
                        >
                            <Github className="mr-2 h-4 w-4" />
                            <span>View GitHub Profile</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => {
                                window.open("https://www.linkedin.com/in/raghaverma/", "_blank")
                            })}
                        >
                            <Linkedin className="mr-2 h-4 w-4" />
                            <span>Connect on LinkedIn</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => {
                                window.open("https://cal.com/raghaverma/30min", "_blank")
                            })}
                        >
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Book a Call</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => {
                                window.open("/RaghavVerma_CV.pdf", "_blank")
                            })}
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Download Resume</span>
                        </CommandItem>
                    </CommandGroup>

                    <CommandSeparator />

                    <CommandGroup heading="Projects">
                        <CommandItem
                            onSelect={() => runCommand(() => router.push("/projects#all"))}
                        >
                            <FolderGit2 className="mr-2 h-4 w-4" />
                            <span>View All Projects</span>
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => {
                                router.push("/projects")
                                // After navigation, we could filter by tech stack
                                // This would require state management or URL params
                            })}
                        >
                            <Code2 className="mr-2 h-4 w-4" />
                            <span>Filter by Technology</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
