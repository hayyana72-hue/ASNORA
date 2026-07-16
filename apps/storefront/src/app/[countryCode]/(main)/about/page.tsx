import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ASNORA BY AMNA NASIR — a luxury jewellery brand crafted in Pakistan, celebrating beauty, confidence, and unforgettable moments.",
}

export default function AboutPage() {
  return (
    <div className="bg-luxury-black min-h-screen">
      {/* Hero Banner */}
      <div className="relative py-24 small:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gold-400/5 to-transparent" />
        <div className="absolute top-8 left-8 w-20 h-20 border-t border-l border-gold-400/15" />
        <div className="absolute top-8 right-8 w-20 h-20 border-t border-r border-gold-400/15" />

        <div className="content-container relative z-10 text-center">
          <p className="font-body text-xs tracking-[0.3em] text-gold-400/60 uppercase mb-4">
            Our Story
          </p>
          <h1 className="font-serif text-4xl small:text-6xl tracking-[0.2em] text-gold-400 uppercase mb-6">
            About ASNORA
          </h1>
          <div className="w-16 h-px bg-gold-400 mx-auto" />
        </div>
      </div>

      {/* Brand Story */}
      <section className="py-16 small:py-24">
        <div className="content-container max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-2xl small:text-3xl tracking-wider text-cream-200 mb-8">
              A Legacy of Elegance
            </h2>
            <p className="font-body text-base text-cream-200/60 leading-relaxed mb-6">
              ASNORA BY AMNA NASIR was born from a deep passion for jewellery and a vision to bring 
              world-class luxury to every woman in Pakistan. Founded by Amna Nasir, ASNORA represents 
              the perfect fusion of traditional craftsmanship and contemporary design.
            </p>
            <p className="font-body text-base text-cream-200/60 leading-relaxed mb-6">
              Each piece in our collection is thoughtfully designed to celebrate the unique beauty, 
              confidence, and grace of the modern Pakistani woman. From everyday elegance to bridal 
              grandeur, ASNORA offers jewellery that tells your story.
            </p>
            <p className="font-body text-base text-cream-200/60 leading-relaxed">
              We believe that luxury should be accessible, which is why we offer premium quality 
              jewellery with the convenience of cash on delivery across Pakistan. Every piece arrives 
              in our signature black and gold packaging, making every purchase feel like a gift.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 small:py-24 bg-luxury-black-100">
        <div className="content-container">
          <h2 className="section-heading mb-16">Our Values</h2>
          <div className="grid grid-cols-1 small:grid-cols-3 gap-8">
            <div className="luxury-card p-10 text-center">
              <div className="text-gold-400 mb-6 flex justify-center">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl tracking-wider text-cream-200 mb-4">
                Quality First
              </h3>
              <p className="font-body text-sm text-cream-200/40 leading-relaxed">
                We use only the finest materials and work with skilled artisans to ensure 
                every piece meets our exacting standards of quality and beauty.
              </p>
            </div>

            <div className="luxury-card p-10 text-center">
              <div className="text-gold-400 mb-6 flex justify-center">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl tracking-wider text-cream-200 mb-4">
                Customer Love
              </h3>
              <p className="font-body text-sm text-cream-200/40 leading-relaxed">
                Our customers are at the heart of everything we do. We strive to create 
                an exceptional experience from browsing to unboxing.
              </p>
            </div>

            <div className="luxury-card p-10 text-center">
              <div className="text-gold-400 mb-6 flex justify-center">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl tracking-wider text-cream-200 mb-4">
                Empowerment
              </h3>
              <p className="font-body text-sm text-cream-200/40 leading-relaxed">
                We design jewellery that empowers women to feel confident, beautiful, and 
                celebrated in every moment of their lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 small:py-24">
        <div className="content-container max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl small:text-3xl tracking-wider text-gold-400 uppercase mb-8">
            Our Mission
          </h2>
          <div className="w-16 h-px bg-gold-400 mx-auto mb-8" />
          <p className="font-body text-lg text-cream-200/60 leading-relaxed italic">
            &ldquo;To create jewellery that becomes a part of your most precious memories — 
            pieces that you wear with pride today and pass down as treasures tomorrow. 
            ASNORA is not just a brand; it is a celebration of you.&rdquo;
          </p>
          <p className="font-serif text-sm tracking-[0.2em] text-gold-400/60 mt-8 uppercase">
            — Amna Nasir, Founder
          </p>
        </div>
      </section>
    </div>
  )
}
