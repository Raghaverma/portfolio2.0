"use client"

import dynamic from "next/dynamic"

// `ssr: false` requires a Client Component — this wrapper enables it from the Server layout
export const GreetingPreloaderClient = dynamic(
  () => import("@/components/shared/greetings-preloader").then((m) => ({ default: m.GreetingPreloader })),
  { ssr: false }
)
