"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Ayesha Khan",
    location: "Karachi",
    text: "The craftsmanship of my ASNORA necklace is absolutely breathtaking. Every detail is perfect — it truly feels like wearing a piece of art.",
    rating: 5,
  },
  {
    name: "Fatima Ahmed",
    location: "Lahore",
    text: "I ordered a bridal set for my wedding and it exceeded all expectations. The packaging was luxurious and the pieces were stunning.",
    rating: 5,
  },
  {
    name: "Sara Malik",
    location: "Islamabad",
    text: "ASNORA has become my go-to for gifting. The quality is unmatched and the cash on delivery option makes it so convenient.",
    rating: 5,
  },
  {
    name: "Hira Bukhari",
    location: "Rawalpindi",
    text: "I've been wearing my ASNORA earrings daily for months and they still look brand new. Premium quality that lasts.",
    rating: 5,
  },
]

const Testimonials = () => {
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
          <h2 className="section-heading">What Our Clients Say</h2>
          <p className="section-subheading">Real stories from the ASNORA community</p>
          <div className="w-16 h-px bg-gold-400 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 small:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="luxury-card p-8 small:p-10 relative"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-8 font-serif text-6xl text-gold-400/10 leading-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="font-body text-base text-cream-200/70 leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center">
                  <span className="font-serif text-sm text-gold-400">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-serif text-sm text-cream-200 tracking-wider">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-xs text-cream-200/40">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
