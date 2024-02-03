type ProductCategory = {
  parent_id: string | null
  name: string
  description: string
  slug: string
  display_order: number
  has_children: boolean
  type: string
  image: string
  // image: string;
} & BaseModel

interface TransformedCategory {
  category: string
  icon: string // Replace with the appropriate type for icons if needed
  productsGroup: ProductGroup[]
}

interface ProductGroup {
  title: string
  icon: string // Replace with the appropriate type for icons if needed
  subtitles: string[] // Assuming subtitles are an array of strings
}

// If you have a specific type for icons (e.g., from a library like react-icons), replace `string` with that type.
// For example, if you're using icons as components: icon: React.ElementType;
