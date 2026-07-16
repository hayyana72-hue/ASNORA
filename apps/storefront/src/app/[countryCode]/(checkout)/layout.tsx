import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-luxury-black relative small:min-h-screen">
      <div className="h-16 bg-luxury-black border-b border-gold-400/10">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi text-cream-200/60 flex items-center gap-x-2 uppercase flex-1 basis-0 hover:text-gold-400 transition-colors"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus font-body tracking-wider">
              Back to shopping cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus font-body">
              Back
            </span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            className="font-serif text-xl tracking-[0.15em] text-gold-400 hover:text-gold-300 transition-colors uppercase"
            data-testid="store-link"
          >
            ASNORA
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>

      {/* COD Banner */}
      <div className="bg-gold-400/5 border-b border-gold-400/10 py-2">
        <div className="content-container flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-gold-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <span className="font-body text-xs tracking-wider text-gold-400">
            Cash on Delivery Available Across Pakistan
          </span>
        </div>
      </div>

      <div className="relative" data-testid="checkout-container">{children}</div>
      <div className="py-6 w-full flex items-center justify-center border-t border-gold-400/10">
        <span className="font-body text-xs text-cream-200/20 tracking-wider">
          © {new Date().getFullYear()} ASNORA BY AMNA NASIR
        </span>
      </div>
    </div>
  )
}
