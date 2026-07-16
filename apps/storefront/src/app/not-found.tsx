import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@modules/common/components/ui"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "404 | ASNORA BY AMNA NASIR",
  description: "The page you are looking for could not be found.",
}

export default function NotFound() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-[calc(100vh-64px)] bg-luxury-black px-6">
      <div className="text-center">
        <p className="font-body text-xs tracking-[0.3em] text-gold-400/40 uppercase mb-4">
          Error 404
        </p>
        <h1 className="font-serif text-4xl tracking-wider text-gold-400 mb-4">Page Not Found</h1>
        <div className="w-12 h-px bg-gold-400 mx-auto mb-6" />
        <p className="font-body text-sm text-cream-200/50 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link className="flex gap-x-1 items-center group" href="/">
        <Text className="text-gold-400 font-body tracking-wider text-sm">Return Home</Text>
        <ArrowUpRightMini
          className="group-hover:rotate-45 ease-in-out duration-150"
          color="var(--fg-interactive)"
        />
      </Link>
    </div>
  )
}
