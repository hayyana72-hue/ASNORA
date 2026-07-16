"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    if (!selectedVariant) return false

    return (
      !selectedVariant.manage_inventory ||
      selectedVariant.allow_backorder ||
      (selectedVariant.inventory_quantity ?? 0) > 0
    )
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,
    })

    setIsAdding(false)
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        {/* Stock Status Indicator */}
        <div className="my-3 flex items-center gap-x-2 text-sm">
          {selectedVariant ? (
            inStock ? (
              <span className="flex items-center gap-x-1.5 text-emerald-400 font-medium">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                In Stock ({selectedVariant.inventory_quantity ?? 100} units available)
              </span>
            ) : (
              <span className="flex items-center gap-x-1.5 text-rose-500 font-medium">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Out of Stock
              </span>
            )
          ) : (
            <span className="text-cream-200/50 italic">
              Please select a variant to check availability
            </span>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="w-full h-12 tracking-widest font-semibold uppercase text-xs btn-gold transition-all duration-300"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? "Select variant"
            : !inStock || !isValidVariant
            ? "Out of stock"
            : "Add to cart"}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />

        {/* Luxury Shipping Information Card */}
        <div className="mt-6 p-4 rounded bg-[#F8F5EE] border border-[#D4AF37]/30 shadow-sm text-[#121212]">
          <div className="flex items-center gap-x-2 mb-3 text-sm font-serif font-semibold tracking-wider uppercase text-[#121212] border-b border-[#D4AF37]/20 pb-2">
            <span className="text-[#D4AF37] text-lg">🚚</span>
            <span>Shipping Information</span>
          </div>
          
          <div className="flex flex-col gap-y-3 text-xs">
            <div className="flex justify-between items-start border-b border-[#D4AF37]/10 pb-2">
              <div>
                <p className="font-semibold text-sm">Standard Delivery</p>
                <p className="text-gray-500 mt-0.5">3–5 Working Days</p>
              </div>
              <span className="font-bold text-sm text-[#D4AF37]">PKR 200</span>
            </div>
            
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-sm">Express Delivery</p>
                <p className="text-gray-500 mt-0.5">Within 24 Hours</p>
              </div>
              <span className="font-bold text-sm text-[#D4AF37]">PKR 350</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
