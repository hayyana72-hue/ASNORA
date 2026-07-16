"use client"

import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const categories = [
  {
    name: "Earrings",
    href: "/categories/earrings",
    image: "/images/cat-earrings.png",
    description: "From studs to chandeliers",
  },
  {
    name: "Necklaces",
    href: "/categories/necklaces",
    image: "/images/cat-necklaces.png",
    description: "Elegant chains and pendants",
  },
  {
    name: "Bracelets",
    href: "/categories/bracelets",
    image: "/images/cat-bracelets.png",
    description: "Delicate to bold wrist pieces",
  },
  {
    name: "Luxury Sets",
    href: "/categories/luxury-collections",
    image: "/images/cat-luxury.png",
    description: "Complete jewellery collections",
  },
  {
    name: "Bridal Sets",
    href: "/collections/bridal-collection",
    image: "/images/cat-bridal.png",
    description: "For your special day",
  },
  {
    name: "New Arrivals",
    href: "/collections/new-arrivals",
    image: "/images/cat-new-arrivals.png",
    description: "Latest additions",
  },
]

const ShopByCategory = () => {
  return (
    <section className="py-20 small:py-32 bg-luxury-black">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Shop by Category</h2>
          <p className="section-subheading">Find the perfect piece for every occasion</p>
          <div className="w-16 h-px bg-gold-400 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 small:grid-cols-3 gap-4 small:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <LocalizedClientLink
                href={category.href}
                className="group block relative overflow-hidden border border-gold-400/10 hover:border-gold-400/40 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent" />
                  {/* Gold shimmer on hover */}
                  <div className="absolute inset-0 bg-gold-400/0 group-hover:bg-gold-400/5 transition-colors duration-500" />
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                  <h3 className="font-serif text-lg small:text-xl tracking-wider text-cream-200 group-hover:text-gold-400 transition-colors duration-300 mb-1">
                    {category.name}
                  </h3>
                  <p className="font-body text-xs text-cream-200/40 group-hover:text-cream-200/60 transition-colors duration-300">
                    {category.description}
                  </p>
                  <div className="w-0 group-hover:w-12 h-px bg-gold-400 mx-auto mt-3 transition-all duration-500" />
                </div>
              </LocalizedClientLink>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopByCategory
