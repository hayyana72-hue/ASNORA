import { listCategories } from "@lib/data/categories";
import { listCollections } from "@lib/data/collections";
import { Text } from "@modules/common/components/ui";

import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  });
  const productCategories = await listCategories();

  return (
    <footer className="bg-luxury-black border-t border-[#D4AF37]/20 w-full text-[#F8F5EE] py-16">
      <div className="content-container flex flex-col w-full">
        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 small:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col gap-y-4">
            <LocalizedClientLink
              href="/"
              className="font-serif text-2xl tracking-[0.2em] text-[#D4AF37] uppercase block font-bold"
            >
              ASNORA
            </LocalizedClientLink>
            <p className="font-body text-xs text-[#F8F5EE]/60 leading-relaxed max-w-xs">
              Premium handcrafted jewellery designed to celebrate beauty, confidence, and life's unforgettable moments.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-x-4 mt-2">
              <a
                href="https://www.instagram.com/asnora_amna.nasir"
                target="_blank"
                rel="noreferrer"
                className="text-[#F8F5EE]/40 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="Follow on Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/923712546372"
                target="_blank"
                rel="noreferrer"
                className="text-[#F8F5EE]/40 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="Contact on WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="mailto:asnorabyamnanasir@gmail.com"
                className="text-[#F8F5EE]/40 hover:text-[#D4AF37] transition-colors duration-300"
                aria-label="Send email"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links & Policies */}
          <div className="flex flex-col gap-y-4">
            <span className="font-serif text-sm tracking-[0.15em] text-[#D4AF37] uppercase font-semibold">
              Explore
            </span>
            <ul className="flex flex-col gap-y-2 text-xs text-[#F8F5EE]/60">
              <li>
                <LocalizedClientLink href="/store" className="hover:text-[#D4AF37] transition-colors duration-300">
                  Shop All
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/collections" className="hover:text-[#D4AF37] transition-colors duration-300">
                  Our Collections
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/about" className="hover:text-[#D4AF37] transition-colors duration-300">
                  About Asnora
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/contact" className="hover:text-[#D4AF37] transition-colors duration-300">
                  Contact Us
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/account" className="hover:text-[#D4AF37] transition-colors duration-300">
                  Customer Portal
                </LocalizedClientLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="flex flex-col gap-y-4">
            <span className="font-serif text-sm tracking-[0.15em] text-[#D4AF37] uppercase font-semibold">
              Showroom
            </span>
            <div className="flex flex-col gap-y-2.5 text-xs text-[#F8F5EE]/60">
              <p className="leading-relaxed">
                R-727, 15-A1, Buffer Zone,<br />
                North Nazimabad, Karachi, Pakistan
              </p>
              <p>
                <strong>WhatsApp:</strong>{" "}
                <a href="https://wa.me/923712546372" className="hover:text-[#D4AF37] transition-colors">
                  03712546372
                </a>
              </p>
              <p>
                <strong>Support:</strong>{" "}
                <a href="mailto:asnorabyamnanasir@gmail.com" className="hover:text-[#D4AF37] transition-colors">
                  asnorabyamnanasir@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Column 4: Newsletter Signup */}
          <div className="flex flex-col gap-y-4">
            <span className="font-serif text-sm tracking-[0.15em] text-[#D4AF37] uppercase font-semibold">
              Newsletter
            </span>
            <p className="text-xs text-[#F8F5EE]/60 leading-relaxed">
              Subscribe to receive updates on new collection launches and exclusive offers.
            </p>
            <form className="flex flex-col gap-y-2 mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#121212] border border-[#D4AF37]/20 rounded-none px-4 py-2.5 text-xs text-[#F8F5EE] placeholder-[#F8F5EE]/30 focus:border-[#D4AF37] focus:outline-none transition-all duration-300"
              />
              <button
                type="button"
                className="w-full bg-[#D4AF37] text-[#121212] text-xs font-semibold uppercase tracking-wider py-2.5 hover:bg-gold-500 transition-colors duration-300 font-body"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col small:flex-row w-full justify-between items-center gap-4 text-center small:text-left">
          <p className="text-[10px] text-[#F8F5EE]/40 uppercase tracking-widest font-body">
            © {new Date().getFullYear()} ASNORA BY AMNA NASIR. All rights reserved.
          </p>
          <p className="text-[10px] text-[#F8F5EE]/30 uppercase tracking-widest font-body">
            Crafted with Elegance in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
