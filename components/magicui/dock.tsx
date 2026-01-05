"use client";

import React, { PropsWithChildren, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export interface DockProps extends VariantProps<typeof dockVariants> {
    className?: string;
    magnification?: number;
    distance?: number;
    direction?: "top" | "middle" | "bottom";
    children: React.ReactNode;
}

const dockVariants = cva(
    "mx-auto w-max mt-8 h-[58px] p-2 flex gap-4 rounded-2xl bg-card/70 backdrop-blur-md border border-border/50 dark:border-border/80 transition-colors duration-300",
);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
    (
        {
            className,
            children,
            magnification = 60,
            distance = 140,
            direction = "middle",
            ...props
        },
        ref,
    ) => {
        const mouseX = useMotionValue(Infinity);

        const renderChildren = () => {
            return React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        // @ts-ignore
                        mouseX: mouseX,
                        magnification: magnification,
                        distance: distance,
                    });
                }
                return child;
            });
        };

        return (
            <motion.div
                ref={ref}
                onMouseMove={(e) => mouseX.set(e.pageX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                {...props}
                className={cn(dockVariants({ className }), "items-end", {
                    "items-start": direction === "top",
                    "items-center": direction === "middle",
                    "items-end": direction === "bottom",
                })}
            >
                {renderChildren()}
            </motion.div>
        );
    },
);

Dock.displayName = "Dock";

export interface DockIconProps {
    size?: number;
    magnification?: number;
    distance?: number;
    mouseX?: any;
    className?: string;
    children?: React.ReactNode;
    props?: PropsWithChildren;
}

const DockIcon = ({
    size,
    magnification = 60,
    distance = 140,
    mouseX,
    className,
    children,
    ...props
}: DockIconProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const distanceCalc = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(
        distanceCalc,
        [-distance, 0, distance],
        [40, magnification, 40],
    );

    const width = useSpring(widthSync, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    return (
        <motion.div
            ref={ref}
            style={{ width }}
            className={cn(
                "flex aspect-square cursor-pointer items-center justify-center rounded-full",
                className,
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export { Dock, DockIcon, dockVariants };
