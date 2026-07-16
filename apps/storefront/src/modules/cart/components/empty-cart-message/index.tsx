import { Heading, Text } from "@modules/common/components/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-center text-center" data-testid="empty-cart-message">
      <div className="w-16 h-16 rounded-full bg-gold-400/10 flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-gold-400/40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      </div>
      <Heading
        level="h1"
        className="font-serif text-3xl tracking-wider text-gold-400 mb-4"
      >
        Your Cart is Empty
      </Heading>
      <Text className="font-body text-sm text-cream-200/50 mt-2 mb-8 max-w-[32rem]">
        Discover our exquisite collection of premium jewellery and find the perfect piece for you.
      </Text>
      <div>
        <InteractiveLink href="/store">Explore Collection</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
