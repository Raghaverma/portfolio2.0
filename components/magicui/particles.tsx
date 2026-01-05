"use client";

import React, { useEffect, useRef } from "react";

interface ParticlesProps {
    className?: string;
    quantity?: number;
    staticity?: number; // Kept for compatibility but unused
    ease?: number; // Kept for compatibility but unused
    size?: number;
    refresh?: boolean;
    color?: string;
    vx?: number;
    vy?: number;
}

function hexToRgb(hex: string): number[] {
    hex = hex.replace("#", "");
    const hexInt = parseInt(hex, 16);
    const red = (hexInt >> 16) & 255;
    const green = (hexInt >> 8) & 255;
    const blue = hexInt & 255;
    return [red, green, blue];
}

export default function Particles({
    className = "",
    quantity = 100,
    staticity = 50,
    ease = 50,
    size = 0.4,
    refresh = false,
    color = "#ffffff",
    vx = 0,
    vy = 0,
}: ParticlesProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const context = useRef<CanvasRenderingContext2D | null>(null);
    const circles = useRef<any[]>([]);
    const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

    useEffect(() => {
        if (canvasRef.current) {
            context.current = canvasRef.current.getContext("2d");
        }
        initCanvas();
        animate();
        window.addEventListener("resize", initCanvas);

        return () => {
            window.removeEventListener("resize", initCanvas);
        };
    }, [color]);

    useEffect(() => {
        initCanvas();
    }, [refresh]);

    const initCanvas = () => {
        resizeCanvas();
        drawParticles();
    };

    type Circle = {
        x: number;
        y: number;
        size: number;
        alpha: number;
        dy: number;
        char: string;
    };

    const codeChars = ["{", "}", "</>", ";", "0", "1", "&&", "||", "[]", "=>", "()", "*"];

    const resizeCanvas = () => {
        if (canvasContainerRef.current && canvasRef.current && context.current) {
            circles.current.length = 0;
            canvasSize.current.w = canvasContainerRef.current.offsetWidth;
            canvasSize.current.h = canvasContainerRef.current.offsetHeight;
            canvasRef.current.width = canvasSize.current.w * dpr;
            canvasRef.current.height = canvasSize.current.h * dpr;
            canvasRef.current.style.width = `${canvasSize.current.w}px`;
            canvasRef.current.style.height = `${canvasSize.current.h}px`;
            context.current.scale(dpr, dpr);
        }
    };

    const circleParams = (): Circle => {
        const x = Math.floor(Math.random() * canvasSize.current.w);
        const y = Math.floor(Math.random() * canvasSize.current.h);
        const pSize = Math.floor(Math.random() * 10) + 10; // Font size
        const alpha = parseFloat((Math.random() * 0.4 + 0.1).toFixed(1));

        // Falling speed
        const dy = (Math.random() * 0.2) + 0.1;

        const char = codeChars[Math.floor(Math.random() * codeChars.length)];
        return {
            x,
            y,
            size: pSize,
            alpha,
            dy,
            char,
        };
    };

    const drawCircle = (circle: Circle, update = false) => {
        if (context.current) {
            const { x, y, size, alpha, char } = circle;

            context.current.font = `${size}px monospace`;
            context.current.fillStyle = `rgba(${hexToRgb(color).join(", ")}, ${alpha})`;
            context.current.fillText(char, x, y);

            if (!update) {
                circles.current.push(circle);
            }
        }
    };

    const clearContext = () => {
        if (context.current) {
            context.current.clearRect(
                0,
                0,
                canvasSize.current.w,
                canvasSize.current.h,
            );
        }
    };

    const drawParticles = () => {
        clearContext();
        const particleCount = quantity;
        for (let i = 0; i < particleCount; i++) {
            const circle = circleParams();
            drawCircle(circle);
        }
    };

    const animate = () => {
        clearContext();
        circles.current.forEach((circle: Circle, i: number) => {
            // Move down
            circle.y += circle.dy;

            // Reset if out of view (bottom)
            if (circle.y > canvasSize.current.h + circle.size) {
                circle.y = -circle.size;
                circle.x = Math.floor(Math.random() * canvasSize.current.w); // Randomize x entry
            }

            drawCircle(circle, true);
        });
        window.requestAnimationFrame(animate);
    };

    return (
        <div className={className} ref={canvasContainerRef} aria-hidden="true">
            <canvas ref={canvasRef} />
        </div>
    );
}
