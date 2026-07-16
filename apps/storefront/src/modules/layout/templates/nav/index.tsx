import { Suspense } from "react"

import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 small:h-20 mx-auto duration-200 bg-luxury-black/85 backdrop-blur-md border-b border-gold-400/10 shadow-sm">
        <nav className="content-container flex items-center justify-between w-full h-full">
          {/* Left: Menu (mobile) + Nav Links (desktop) */}
          <div className="flex-1 basis-0 h-full flex items-center gap-x-6">
            <div className="h-full small:hidden">
              <SideMenu regions={regions} locales={locales} currentLocale={currentLocale} />
            </div>
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                href="/"
                className="font-body text-xs tracking-widest text-[#F8F5EE]/70 hover:text-[#D4AF37] transition-all duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#D4AF37] after:transition-all after:duration-300"
              >
                Home
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/store"
                className="font-body text-xs tracking-widest text-[#F8F5EE]/70 hover:text-[#D4AF37] transition-all duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#D4AF37] after:transition-all after:duration-300"
              >
                Shop
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/collections"
                className="font-body text-xs tracking-widest text-[#F8F5EE]/70 hover:text-[#D4AF37] transition-all duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#D4AF37] after:transition-all after:duration-300"
              >
                Collections
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/categories/bridal"
                className="font-body text-xs tracking-widest text-[#F8F5EE]/70 hover:text-[#D4AF37] transition-all duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#D4AF37] after:transition-all after:duration-300"
              >
                Bridal
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/about"
                className="font-body text-xs tracking-widest text-[#F8F5EE]/70 hover:text-[#D4AF37] transition-all duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#D4AF37] after:transition-all after:duration-300"
              >
                About
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/contact"
                className="font-body text-xs tracking-widest text-[#F8F5EE]/70 hover:text-[#D4AF37] transition-all duration-300 uppercase relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 hover:after:w-full after:bg-[#D4AF37] after:transition-all after:duration-300"
              >
                Contact
              </LocalizedClientLink>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="font-serif text-xl small:text-2xl tracking-[0.2em] text-gold-400 hover:text-gold-300 transition-colors duration-300 uppercase whitespace-nowrap"
              data-testid="nav-store-link"
            >
              ASNORA
            </LocalizedClientLink>
          </div>

          {/* Right: Search, Account, Cart */}
          <div className="flex items-center gap-x-4 small:gap-x-6 h-full flex-1 basis-0 justify-end">
            <LocalizedClientLink
              className="font-body text-sm tracking-wider text-cream-200/70 hover:text-gold-400 transition-colors duration-300 hidden small:block"
              href="/store"
              aria-label="Search products"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </LocalizedClientLink>
            <LocalizedClientLink
              className="font-body text-sm tracking-wider text-cream-200/70 hover:text-gold-400 transition-colors duration-300 hidden small:block"
              href="/account"
              data-testid="nav-account-link"
              aria-label="Account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="font-body text-sm tracking-wider text-cream-200/70 hover:text-gold-400 transition-colors duration-300 flex items-center gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span className="text-xs">(0)</span>
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
