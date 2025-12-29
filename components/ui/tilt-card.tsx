"use client"

import React, { useRef, useState } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"

interface TiltCardProps {
    children: React.ReactNode
    className?: string
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 100, damping: 10 })
    const mouseY = useSpring(y, { stiffness: 100, damping: 10 })

    function onMouseMove({ clientX, clientY }: React.MouseEvent) {
        if (!ref.current) return
        if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return

        const { left, top, width, height } = ref.current.getBoundingClientRect()

        const xPct = (clientX - left) / width - 0.5
        const yPct = (clientY - top) / height - 0.5

        x.set(xPct)
        y.set(yPct)
    }

    function onMouseLeave() {
        x.set(0)
        y.set(0)
    }

    const rotateX = useMotionTemplate`${mouseY.get() * -20}deg`
    const rotateY = useMotionTemplate`${mouseX.get() * 20}deg`

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative transform-gpu transition-all duration-200 ease-linear ${className}`}
        >
            {children}
        </motion.div>
    )
}
