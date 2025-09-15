"use client"

import type React from "react"
import dynamic from "next/dynamic"

const Providers = dynamic(() => import("./providers"), {
  ssr: false,
  loading: () => null,
})

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>
}