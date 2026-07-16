import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import ShopByCategory from "@modules/home/components/shop-by-category"
import WhyAsnora from "@modules/home/components/why-asnora"
import Testimonials from "@modules/home/components/testimonials"
import InstagramGallery from "@modules/home/components/instagram-gallery"
import Newsletter from "@modules/home/components/newsletter"
import BridalCollection from "@modules/home/components/bridal-collection"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "ASNORA BY AMNA NASIR | Luxury Jewellery",
  description:
    "Discover premium jewellery designed to celebrate beauty, confidence, and unforgettable moments. Shop rings, necklaces, earrings, bracelets, and bridal sets from ASNORA.",
  openGraph: {
    title: "ASNORA BY AMNA NASIR | Luxury Jewellery",
    description:
      "Discover premium jewellery designed to celebrate beauty, confidence, and unforgettable moments.",
    type: "website",
  },
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />

      {/* Featured Products / Collections from Medusa */}
      <div className="bg-luxury-black py-4">
        <ul className="flex flex-col">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>

      {/* Bridal Collection Showcase */}
      <BridalCollection />

      {/* Shop by Category */}
      <ShopByCategory />

      {/* Why ASNORA */}
      <WhyAsnora />

      {/* Testimonials */}
      <Testimonials />

      {/* Instagram Gallery */}
      <InstagramGallery />

      {/* Newsletter */}
      <Newsletter />
    </>
  )
}
