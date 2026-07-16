import { Text } from "@modules/common/components/ui"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  // Calculate stock status at product level
  const inStock = product.variants?.some(
    (v) => !v.manage_inventory || v.allow_backorder || ((v as any).inventory_quantity ?? 0) > 0
  ) ?? true

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block h-full">
      <div
        data-testid="product-wrapper"
        className="relative flex flex-col bg-[#121212] border border-[#D4AF37]/10 hover:border-[#D4AF37] overflow-hidden transition-all duration-500 ease-out shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] h-full"
      >
        {/* Dynamic Premium Stock Badge */}
        <div className="absolute top-3 left-3 z-20">
          {inStock ? (
            <span className="bg-[#121212]/80 backdrop-blur-md text-[#D4AF37] text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-[#D4AF37]/20 flex items-center gap-x-1.5 font-medium shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
              In Stock
            </span>
          ) : (
            <span className="bg-[#121212]/90 backdrop-blur-md text-[#FAFAFA]/40 text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-[#FAFAFA]/10 flex items-center gap-x-1.5 font-medium shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FAFAFA]/20" />
              Sold Out
            </span>
          )}
        </div>

        {/* Image Container with Zoom */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#121212]">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Quick Add Overlay on Hover */}
          <div className="absolute inset-0 bg-[#121212]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 z-10">
            <span className="bg-[#D4AF37] text-[#121212] px-6 py-2.5 text-xs font-semibold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300 font-body shadow-md">
              {inStock ? "Shop Piece" : "View Details"}
            </span>
          </div>
        </div>

        {/* Info Block */}
        <div className="p-5 flex flex-col flex-grow justify-between gap-y-3 bg-[#121212]">
          <div>
            {product.categories?.[0] && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/60 font-semibold mb-1 block">
                {product.categories[0].name}
              </span>
            )}
            <Text
              className="font-serif text-base tracking-wide text-[#F8F5EE] group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-1"
              data-testid="product-title"
            >
              {product.title}
            </Text>
          </div>

          <div className="flex items-center justify-between mt-1 pt-3 border-t border-[#D4AF37]/5">
            <span className="text-[10px] tracking-widest text-[#F8F5EE]/40 uppercase">
              PKR Region
            </span>
            <div className="flex items-center gap-x-2">
              {cheapestPrice && (
                <span className="text-base font-bold text-[#D4AF37] tracking-wider font-serif">
                  {cheapestPrice.calculated_price}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
