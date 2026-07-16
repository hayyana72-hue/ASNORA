import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import "styles/globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: {
    default: "ASNORA BY AMNA NASIR | Luxury Jewellery",
    template: "%s | ASNORA BY AMNA NASIR",
  },
  description:
    "Discover premium jewellery designed to celebrate beauty, confidence, and unforgettable moments. Shop rings, necklaces, earrings, bracelets, and bridal sets.",
  keywords: [
    "luxury jewellery",
    "ASNORA",
    "Amna Nasir",
    "bridal jewellery",
    "rings",
    "necklaces",
    "earrings",
    "bracelets",
    "Pakistan jewellery",
    "premium jewellery",
  ],
  authors: [{ name: "ASNORA BY AMNA NASIR" }],
  creator: "ASNORA BY AMNA NASIR",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asnoraofficial.com",
    siteName: "ASNORA BY AMNA NASIR",
    title: "ASNORA BY AMNA NASIR | Luxury Jewellery",
    description:
      "Discover premium jewellery designed to celebrate beauty, confidence, and unforgettable moments.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "ASNORA BY AMNA NASIR - Luxury Jewellery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASNORA BY AMNA NASIR | Luxury Jewellery",
    description:
      "Discover premium jewellery designed to celebrate beauty, confidence, and unforgettable moments.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <main className="relative">{props.children}</main>
      </body>
    </html>
  )
}
