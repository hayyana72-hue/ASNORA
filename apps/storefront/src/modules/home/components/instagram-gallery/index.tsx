"use client"

import { motion } from "framer-motion"

const InstagramGallery = () => {
  const placeholderImages = [
    { color: "from-gold-400/20 to-gold-600/10", label: "Ring Collection" },
    { color: "from-gold-400/15 to-amber-900/20", label: "Necklace Set" },
    { color: "from-gold-400/10 to-gold-800/15", label: "Bridal Pieces" },
    { color: "from-amber-400/20 to-gold-400/10", label: "Earring Pair" },
    { color: "from-gold-400/20 to-yellow-900/10", label: "Bracelet" },
    { color: "from-gold-600/15 to-gold-400/10", label: "Gift Set" },
  ]

  return (
    <section className="py-20 small:py-32 bg-luxury-black-100">
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Follow Our Journey</h2>
          <p className="section-subheading">@asnora_amna.nasir</p>
          <div className="w-16 h-px bg-gold-400 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 small:grid-cols-3 gap-3 small:gap-4">
          {placeholderImages.map((img, index) => (
            <motion.a
              key={index}
              href="https://www.instagram.com/asnora_amna.nasir"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group relative aspect-square overflow-hidden bg-luxury-black"
            >
              {/* Gradient placeholder */}
              <div className={`absolute inset-0 bg-gradient-to-br ${img.color}`} />

              {/* Decorative jewellery icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-12 h-12 text-gold-400/20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-luxury-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <svg className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="font-body text-xs text-gold-400 tracking-wider">{img.label}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/asnora_amna.nasir"
            target="_blank"
            rel="noreferrer"
            className="btn-gold-outline inline-block"
          >
            Follow @asnora_amna.nasir
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default InstagramGallery
