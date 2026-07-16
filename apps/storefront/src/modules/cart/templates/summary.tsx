"use client"

import { Button, Heading } from "@modules/common/components/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-4">
      <Heading level="h2" className="font-serif text-2xl tracking-wider text-gold-400">
        Summary
      </Heading>
      <DiscountCode cart={cart} />
      <Divider />
      <CartTotals totals={cart} />
      
      {/* Luxury Delivery Options Information Box */}
      <div className="bg-[#F8F5EE]/5 border border-[#D4AF37]/20 p-4 rounded text-cream-200 text-xs my-2">
        <p className="font-serif font-semibold text-gold-400 uppercase tracking-wider mb-2 flex items-center gap-x-1.5">
          <span>🚚</span>
          <span>Delivery Options</span>
        </p>
        <div className="flex flex-col gap-y-1.5 text-cream-200/70">
          <div className="flex justify-between">
            <span>Standard (3–5 Working Days)</span>
            <span className="font-semibold text-gold-400">PKR 200</span>
          </div>
          <div className="flex justify-between">
            <span>Express (Within 24 Hours)</span>
            <span className="font-semibold text-gold-400">PKR 350</span>
          </div>
        </div>
      </div>

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
      >
        <Button className="w-full h-10 bg-gold-400 text-luxury-black hover:bg-gold-500 font-serif tracking-wider">
          Proceed to Checkout
        </Button>
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
