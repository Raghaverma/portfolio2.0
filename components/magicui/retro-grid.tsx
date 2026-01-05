"use client";

import { cn } from "@/lib/utils";

export default function RetroGrid({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "pointer-events-none absolute h-full w-full overflow-hidden perspective-200",
                className,
            )}
        >
            {/* Grid */}
            <div className="absolute inset-0 [transform:rotateX(35deg)]">
                <div
                    className={cn(
                        "animate-grid",
                        "[background-repeat:repeat] [background-size:60px_60px] [height:300%] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600px]",
                        // Light Styles
                        "[background-image:linear-gradient(to_right,rgba(0,0,0,0.4)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.4)_1px,transparent_0)]",
                        // Dark styles - Increased opacity to 0.4
                        "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_0)]",
                    )}
                />
            </div>

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-black" />
        </div>
    );
}
