"use client"

import { motion } from "framer-motion"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const BridalCollection = () => {
  return (
    <section className="py-20 small:py-32 bg-luxury-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, #D4AF37 1px, transparent 1px),
                          radial-gradient(circle at 75% 75%, #D4AF37 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="content-container relative z-10">
        <div className="grid grid-cols-1 small:grid-cols-2 gap-12 items-center">
          {/* Left: Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] small:aspect-[4/5] overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/bridal-collection.png')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-luxury-black/20" />
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-gold-400/30" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-gold-400/30" />
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-start"
          >
            <span className="font-body text-xs tracking-[0.3em] text-gold-400/60 uppercase mb-4">
              For Your Special Day
            </span>
            <h2 className="font-serif text-3xl small:text-5xl tracking-wider text-gold-400 uppercase mb-6">
              Bridal Collection
            </h2>
            <div className="w-16 h-px bg-gold-400 mb-8" />
            <p className="font-body text-base text-cream-200/60 leading-relaxed mb-6">
              Make your wedding day truly unforgettable with our exquisite bridal jewellery collection. 
              Each piece is designed to complement your beauty and add a touch of timeless elegance to 
              your most precious moments.
            </p>
            <p className="font-body text-base text-cream-200/40 leading-relaxed mb-10">
              From traditional sets to contemporary designs, our bridal collection offers the perfect 
              balance of sophistication and sparkle. Handcrafted with premium materials and adorned 
              with brilliant stones.
            </p>
            <LocalizedClientLink
              href="/categories/bridal"
              className="btn-gold"
            >
              Explore Bridal Collection
            </LocalizedClientLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BridalCollection
