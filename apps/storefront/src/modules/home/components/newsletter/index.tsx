"use client"

import { motion } from "framer-motion"
import { useState } from "react"

const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-20 small:py-32 bg-luxury-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
      </div>

      <div className="content-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="section-heading mb-4">Join the ASNORA Community</h2>
          <p className="font-body text-base text-cream-200/50 leading-relaxed mb-10">
            Be the first to know about exclusive launches, new collections, and special offers.
            Join our community of jewellery lovers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col small:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-6 py-4 bg-luxury-black-100 border border-gold-400/20 text-cream-200 font-body text-sm tracking-wider placeholder:text-cream-200/30 focus:outline-none focus:border-gold-400/50 transition-colors duration-300"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="btn-gold whitespace-nowrap"
            >
              {submitted ? "Thank You ✓" : "Subscribe"}
            </button>
          </form>

          <p className="font-body text-xs text-cream-200/20 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Newsletter
