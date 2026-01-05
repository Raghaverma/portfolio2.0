"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
    HomeIcon,
    BriefcaseIcon,
    CodeIcon,
    FolderGit2Icon,
    MailIcon
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dock, DockIcon } from "@/components/magicui/dock"

const DATA = {
    navbar: [
        { href: "#hero", icon: HomeIcon, label: "Home" },
        { href: "#experience", icon: BriefcaseIcon, label: "Experience" },
        { href: "#skills", icon: CodeIcon, label: "Skills" },
        { href: "#projects", icon: FolderGit2Icon, label: "Projects" },
        { href: "#contact", icon: MailIcon, label: "Contact" },
    ],
}

export function DockDemo() {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false) // Scrolling down
            } else {
                setIsVisible(true) // Scrolling up
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const targetId = href.replace("#", "")
        const element = document.getElementById(targetId)
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <TooltipProvider>
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="z-50"
                        >
                            <Dock direction="middle">
                                {DATA.navbar.map((item) => (
                                    <DockIcon key={item.label}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={item.href}
                                                    aria-label={item.label}
                                                    onClick={(e) => handleLinkClick(e, item.href)}
                                                    className={cn(
                                                        buttonVariants({ variant: "ghost", size: "icon" }),
                                                        "size-12 rounded-full"
                                                    )}
                                                >
                                                    <item.icon className="size-4" />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{item.label}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </DockIcon>
                                ))}
                            </Dock>
                        </motion.div>
                    )}
                </AnimatePresence>
            </TooltipProvider>
        </div>
    )
}
