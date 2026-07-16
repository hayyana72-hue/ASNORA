/**
 * ASNORA BY AMNA NASIR — Complete Seed Script
 * 
 * This script configures the Medusa backend with:
 * - ASNORA Store Sales Channel
 * - Pakistan Region (PKR currency)
 * - Product Categories (Earrings, Necklaces, Bracelets, Luxury Collections)
 * - Collections (Signature, Bridal, Royal, New Arrivals)
 * - 11 Products with variants and inventory
 * - Links sales channel to publishable API key
 * 
 * Usage: node seed-asnora.mjs
 * Requires: Backend running on localhost:9000
 */

const BASE_URL = "http://localhost:9000"
let AUTH_TOKEN = ""

// ─── Helpers ────────────────────────────────────────────────────
async function api(method, path, body = null) {
  const headers = {
    "Content-Type": "application/json",
  }
  if (AUTH_TOKEN) {
    headers["Authorization"] = `Bearer ${AUTH_TOKEN}`
  }

  const opts = { method, headers }
  if (body) opts.body = JSON.stringify(body)

  const res = await fetch(`${BASE_URL}${path}`, opts)
  const text = await res.text()

  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = { raw: text }
  }

  if (!res.ok && res.status !== 409) {
    console.error(`  ✗ ${method} ${path} → ${res.status}`)
    if (data.message) console.error(`    ${data.message}`)
    return null
  }

  return data
}

async function adminGet(path) { return api("GET", `/admin${path}`) }
async function adminPost(path, body) { return api("POST", `/admin${path}`, body) }
async function adminDelete(path) { return api("DELETE", `/admin${path}`) }

// ─── Auth ───────────────────────────────────────────────────────
async function authenticate() {
  console.log("\n🔐 Authenticating...")

  const res = await api("POST", "/auth/user/emailpass", {
    email: "admin@medusa-test.com",
    password: "supersecret"
  })

  if (!res || !res.token) {
    console.error("  ✗ Authentication failed. Trying to create admin user...")

    // Try creating user first
    const createRes = await api("POST", "/auth/user/emailpass/register", {
      email: "admin@medusa-test.com",
      password: "supersecret"
    })

    if (createRes && createRes.token) {
      AUTH_TOKEN = createRes.token
      // Create the actual user
      await adminPost("/users", {
        email: "admin@medusa-test.com",
      })
      console.log("  ✓ Created and authenticated as admin")
      return true
    }

    console.error("  ✗ Could not authenticate. Make sure the backend is running and admin user exists.")
    console.error("  Try: medusa user -e admin@medusa-test.com -p supersecret")
    return false
  }

  AUTH_TOKEN = res.token
  console.log("  ✓ Authenticated as admin@medusa-test.com")
  return true
}

// ─── Sales Channel ──────────────────────────────────────────────
async function createSalesChannel() {
  console.log("\n🏪 Setting up Sales Channel...")

  // Check existing
  const existing = await adminGet("/sales-channels?name=ASNORA+Store")
  if (existing?.sales_channels?.length > 0) {
    console.log("  ✓ ASNORA Store sales channel already exists")
    return existing.sales_channels[0].id
  }

  const res = await adminPost("/sales-channels", {
    name: "ASNORA Store",
    description: "ASNORA BY AMNA NASIR - Premium Jewellery E-Commerce",
    is_disabled: false,
  })

  if (res?.sales_channel) {
    console.log(`  ✓ Created sales channel: ${res.sales_channel.id}`)
    return res.sales_channel.id
  }

  // If failed, get any existing
  const all = await adminGet("/sales-channels")
  if (all?.sales_channels?.length > 0) {
    console.log(`  ℹ Using existing sales channel: ${all.sales_channels[0].id}`)
    return all.sales_channels[0].id
  }

  return null
}

// ─── Link Sales Channel to API Key ──────────────────────────────
async function linkSalesChannelToApiKey(salesChannelId) {
  console.log("\n🔗 Linking Sales Channel to Publishable API Key...")

  const keys = await adminGet("/api-keys")
  if (!keys?.api_keys?.length) {
    console.log("  ✗ No API keys found")
    return
  }

  const publishableKey = keys.api_keys.find(k => k.type === "publishable")
  if (!publishableKey) {
    console.log("  ✗ No publishable API key found")
    return
  }

  console.log(`  Found publishable key: ${publishableKey.id}`)

  // Add sales channel to the key
  const res = await adminPost(`/api-keys/${publishableKey.id}/sales-channels`, {
    add: [salesChannelId]
  })

  if (res) {
    console.log("  ✓ Sales channel linked to publishable API key")
  }
}

// ─── Region ─────────────────────────────────────────────────────
async function createRegion(salesChannelId) {
  console.log("\n🌍 Setting up Pakistan Region...")

  // Check existing regions
  const existing = await adminGet("/regions")
  const pkRegion = existing?.regions?.find(r =>
    r.countries?.some(c => c.iso_2 === "pk")
  )

  if (pkRegion) {
    console.log(`  ✓ Pakistan region already exists: ${pkRegion.id}`)
    return pkRegion.id
  }

  const res = await adminPost("/regions", {
    name: "Pakistan",
    currency_code: "pkr",
    countries: ["pk"],
    tax_rate: 0,
    payment_providers: ["pp_system_default"],
  })

  if (res?.region) {
    console.log(`  ✓ Created Pakistan region: ${res.region.id}`)
    return res.region.id
  }

  console.log("  ✗ Failed to create Pakistan region")
  return null
}

// ─── Stock Location & Inventory ─────────────────────────────────
async function getOrCreateStockLocation(salesChannelId) {
  console.log("\n📦 Setting up Stock Location...")

  const existing = await adminGet("/stock-locations")
  if (existing?.stock_locations?.length > 0) {
    console.log(`  ✓ Stock location exists: ${existing.stock_locations[0].id}`)
    return existing.stock_locations[0].id
  }

  const res = await adminPost("/stock-locations", {
    name: "ASNORA Warehouse",
    address: {
      address_1: "Karachi",
      country_code: "pk",
    }
  })

  if (res?.stock_location) {
    // Link to sales channel
    await adminPost(`/stock-locations/${res.stock_location.id}/sales-channels`, {
      add: [salesChannelId]
    })
    console.log(`  ✓ Created stock location: ${res.stock_location.id}`)
    return res.stock_location.id
  }

  return null
}

// ─── Categories ─────────────────────────────────────────────────
async function createCategories() {
  console.log("\n📂 Setting up Categories...")

  const categoryNames = ["Earrings", "Necklaces", "Bracelets", "Luxury Collections"]
  const categories = {}

  // Get existing
  const existing = await adminGet("/product-categories?limit=100")

  for (const name of categoryNames) {
    const found = existing?.product_categories?.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    )

    if (found) {
      console.log(`  ✓ Category "${name}" exists: ${found.id}`)
      categories[name] = found.id
      continue
    }

    const res = await adminPost("/product-categories", {
      name,
      is_active: true,
      is_internal: false,
    })

    if (res?.product_category) {
      console.log(`  ✓ Created category "${name}": ${res.product_category.id}`)
      categories[name] = res.product_category.id
    }
  }

  return categories
}

// ─── Collections ────────────────────────────────────────────────
async function createCollections() {
  console.log("\n🗂️  Setting up Collections...")

  const collectionDefs = [
    { title: "Signature Collection", handle: "signature-collection" },
    { title: "Bridal Collection", handle: "bridal-collection" },
    { title: "Royal Collection", handle: "royal-collection" },
    { title: "New Arrivals", handle: "new-arrivals" },
  ]
  const collections = {}

  const existing = await adminGet("/collections?limit=100")

  for (const def of collectionDefs) {
    const found = existing?.collections?.find(
      c => c.handle === def.handle || c.title === def.title
    )

    if (found) {
      console.log(`  ✓ Collection "${def.title}" exists: ${found.id}`)
      collections[def.title] = found.id
      continue
    }

    const res = await adminPost("/collections", {
      title: def.title,
      handle: def.handle,
    })

    if (res?.collection) {
      console.log(`  ✓ Created collection "${def.title}": ${res.collection.id}`)
      collections[def.title] = res.collection.id
    }
  }

  return collections
}

// ─── Products ───────────────────────────────────────────────────
async function createProducts(salesChannelId, categories, collections) {
  console.log("\n💎 Setting up Products...")

  const products = [
    {
      title: "Zarqonic Floral Studs",
      handle: "zarqonic-floral-studs",
      description: "Delicate floral stud earrings featuring intricate petal designs with sparkling crystal centres. Perfect for everyday elegance and special occasions. Each piece is meticulously handcrafted to capture the beauty of nature in miniature form.",
      sku: "ZFS-001",
      category: "Earrings",
      collection: "New Arrivals",
      price: 599,
      options: [{ title: "Color", values: ["White", "Pink", "Green"] }],
    },
    {
      title: "Zarqonic Glow Pendant Set",
      handle: "zarqonic-glow-pendant-set",
      description: "An enchanting pendant necklace set that radiates sophistication. Features a luminous central stone surrounded by delicate metalwork, paired with matching chain. A perfect gift for the woman who appreciates timeless beauty.",
      sku: "ZGP-002",
      category: "Necklaces",
      collection: "New Arrivals",
      price: 2000,
      options: [{ title: "Color", values: ["White", "Pink"] }],
    },
    {
      title: "Zarqonic Luxe Swan Earrings",
      handle: "zarqonic-luxe-swan-earrings",
      description: "Graceful swan-inspired drop earrings with premium crystal embellishments. The elegant swan silhouette symbolises grace and beauty, making these earrings a statement piece for any occasion.",
      sku: "ZLS-003",
      category: "Earrings",
      collection: "New Arrivals",
      price: 1599,
      options: [{ title: "Color", values: ["Black", "Blue", "Green"] }],
    },
    {
      title: "Turkish Earrings",
      handle: "turkish-earrings",
      description: "Exquisite Turkish-inspired earrings featuring ornate geometric patterns and vibrant enamel work. These statement pieces blend Ottoman craftsmanship with contemporary design for a truly unique accessory.",
      sku: "TE-004",
      category: "Earrings",
      collection: "New Arrivals",
      price: 1799,
      options: [{ title: "Color", values: ["Multi"] }],
    },
    {
      title: "Rajisthani Jhumka",
      handle: "rajisthani-jhumka",
      description: "Traditional Rajisthani jhumka earrings with intricate dome-shaped bells and delicate beadwork. These heritage-inspired pieces bring the royal elegance of Rajasthan to your jewellery collection.",
      sku: "RJ-005",
      category: "Earrings",
      collection: "Bridal Collection",
      price: 1099,
      options: [{ title: "Color", values: ["Gold"] }],
    },
    {
      title: "Royal Jhumka Set",
      handle: "royal-jhumka-set",
      description: "A magnificent set of royal jhumka earrings adorned with precious stones and intricate filigree work. Designed for brides who desire nothing less than regal splendour on their special day.",
      sku: "RJS-006",
      category: "Earrings",
      collection: "Bridal Collection",
      price: 1499,
      options: [{ title: "Color", values: ["Red", "Multi"] }],
    },
    {
      title: "Royal Jardau Kangan",
      handle: "royal-jardau-kangan",
      description: "A stunning Jardau-style bangle featuring traditional Kundan and Polki craftsmanship. This heritage piece showcases the artistry of master jewellers, perfect for weddings and festive celebrations.",
      sku: "RJK-007",
      category: "Bracelets",
      collection: "Royal Collection",
      price: 2499,
      options: [{ title: "Color", values: ["Multi"] }],
    },
    {
      title: "Emerald Royal Set",
      handle: "emerald-royal-set",
      description: "A breathtaking complete jewellery set featuring premium emerald-green stones set in ornate gold-toned metalwork. Includes necklace, earrings, and tikka — the ultimate luxury statement for the discerning woman.",
      sku: "ERS-008",
      category: "Luxury Collections",
      collection: "Signature Collection",
      price: 3499,
      options: [{ title: "Color", values: ["Green"] }],
    },
    {
      title: "Royal Heritage Set",
      handle: "royal-heritage-set",
      description: "An opulent heritage jewellery set inspired by Mughal royal courts. Features rich ruby-red stones with elaborate gold-toned settings. Includes full necklace, jhumka earrings, and maang tikka.",
      sku: "RHS-009",
      category: "Luxury Collections",
      collection: "Royal Collection",
      price: 2499,
      options: [{ title: "Color", values: ["Red"] }],
    },
    {
      title: "Pearl Cascade Jhumka",
      handle: "pearl-cascade-jhumka",
      description: "Elegant cascading pearl jhumka earrings with golden bell accents. The waterfall of lustrous pearls creates a mesmerising movement, adding grace and sophistication to any traditional outfit.",
      sku: "PCJ-010",
      category: "Earrings",
      collection: "Bridal Collection",
      price: 1499,
      options: [{ title: "Color", values: ["Golden"] }],
    },
    {
      title: "Vintage Stone Necklace",
      handle: "vintage-stone-necklace",
      description: "A timeless vintage-inspired necklace featuring carefully selected natural stones in a classic setting. The understated elegance of this piece makes it perfect for both casual and formal occasions.",
      sku: "VSN-011",
      category: "Necklaces",
      collection: "Signature Collection",
      price: 999,
      options: [{ title: "Color", values: ["Red", "Turquoise Blue"] }],
    },
  ]

  // Check existing products
  const existingProducts = await adminGet("/products?limit=100")
  const existingHandles = new Set(
    existingProducts?.products?.map(p => p.handle) || []
  )

  for (const product of products) {
    if (existingHandles.has(product.handle)) {
      console.log(`  ✓ Product "${product.title}" already exists`)
      continue
    }

    // Build product payload
    const payload = {
      title: product.title,
      handle: product.handle,
      description: product.description,
      status: "published",
      sales_channels: [{ id: salesChannelId }],
      options: product.options.map(o => ({
        title: o.title,
        values: o.values,
      })),
      variants: product.options[0].values.map((color, idx) => ({
        title: `${product.title} - ${color}`,
        sku: `${product.sku}-${color.toUpperCase().replace(/\s/g, '')}`,
        manage_inventory: true,
        options: { [product.options[0].title]: color },
        prices: [
          {
            amount: product.price,
            currency_code: "pkr",
          }
        ],
      })),
    }

    // Add category
    if (product.category && categories[product.category]) {
      payload.categories = [{ id: categories[product.category] }]
    }

    // Add collection
    if (product.collection && collections[product.collection]) {
      payload.collection_id = collections[product.collection]
    }

    const res = await adminPost("/products", payload)

    if (res?.product) {
      console.log(`  ✓ Created "${product.title}" (${res.product.id}) with ${res.product.variants?.length || 0} variants`)
    } else {
      console.log(`  ✗ Failed to create "${product.title}"`)
    }
  }
}

// ─── Set Inventory Levels ───────────────────────────────────────
async function setInventoryLevels(stockLocationId) {
  console.log("\n📊 Setting Inventory Levels...")

  // Get all inventory items
  const items = await adminGet("/inventory-items?limit=200")
  if (!items?.inventory_items?.length) {
    console.log("  ℹ No inventory items found")
    return
  }

  let updated = 0
  for (const item of items.inventory_items) {
    // Check if level already exists for this location
    const levels = await adminGet(`/inventory-items/${item.id}/location-levels?stock_location_id=${stockLocationId}`)

    if (levels?.inventory_levels?.length > 0) {
      // Update existing level
      const level = levels.inventory_levels[0]
      if (level.stocked_quantity < 100) {
        await adminPost(`/inventory-items/${item.id}/location-levels/${level.id}`, {
          stocked_quantity: 100,
        })
        updated++
      }
    } else {
      // Create new level
      await adminPost(`/inventory-items/${item.id}/location-levels`, {
        location_id: stockLocationId,
        stocked_quantity: 100,
      })
      updated++
    }
  }

  console.log(`  ✓ Set inventory for ${updated} items to 100 units each`)
}

// ─── Main ───────────────────────────────────────────────────────
async function main() {
  console.log("═══════════════════════════════════════════════════════")
  console.log("  ASNORA BY AMNA NASIR — Seed Script")
  console.log("  Premium Jewellery E-Commerce Setup")
  console.log("═══════════════════════════════════════════════════════")

  // Step 1: Authenticate
  const authed = await authenticate()
  if (!authed) {
    process.exit(1)
  }

  // Step 2: Sales Channel
  const salesChannelId = await createSalesChannel()
  if (!salesChannelId) {
    console.error("✗ Cannot proceed without sales channel")
    process.exit(1)
  }

  // Step 3: Link to API Key
  await linkSalesChannelToApiKey(salesChannelId)

  // Step 4: Region
  const regionId = await createRegion(salesChannelId)

  // Step 5: Stock Location
  const stockLocationId = await getOrCreateStockLocation(salesChannelId)

  // Step 6: Categories
  const categories = await createCategories()

  // Step 7: Collections
  const collections = await createCollections()

  // Step 8: Products
  await createProducts(salesChannelId, categories, collections)

  // Step 9: Inventory
  if (stockLocationId) {
    await setInventoryLevels(stockLocationId)
  }

  console.log("\n═══════════════════════════════════════════════════════")
  console.log("  ✅ ASNORA Setup Complete!")
  console.log("═══════════════════════════════════════════════════════")
  console.log("\n  Sales Channel:", salesChannelId)
  console.log("  Region:", regionId)
  console.log("  Stock Location:", stockLocationId)
  console.log("  Categories:", Object.keys(categories).length)
  console.log("  Collections:", Object.keys(collections).length)
  console.log("\n  Next steps:")
  console.log("  1. Restart storefront: npm run dev")
  console.log("  2. Visit http://localhost:8000")
  console.log("  3. Products should now display in PKR")
  console.log("")
}

main().catch(console.error)
