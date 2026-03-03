export interface Variant {
  id: string;
  color: string;
  size: string;
  price: number;
  sale_price: number;
  image: string;
  additional_images: string[];
  availability: string;
}

export interface Product {
  id: string; // item_group_id
  title: string;
  category: string;
  description: string;
  features: string[];
  brand: string;
  variants: Variant[];
  // Derived fields for display in list
  displayPrice: number;
  displaySalePrice?: number;
  displayImage: string;
}

const API_URL = 'https://opensheet.elk.sh/1WCTU9u6tEiSjuULdvaKB1iqF6qpvuJ8uvQ_GEyDiHSc/Sheet1';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();

    const grouped: Record<string, Product> = {};

    data.forEach((item: any) => {
      const groupId = item.item_group_id || item.id;
      
      if (!grouped[groupId]) {
        grouped[groupId] = {
          id: groupId,
          title: item.title,
          category: item.category,
          description: item.description,
          features: item.features ? item.features.split(';').map((f: string) => f.trim()) : [],
          brand: item.brand,
          variants: [],
          displayPrice: parseFloat(item.price),
          displaySalePrice: item.sale_price ? parseFloat(item.sale_price) : undefined,
          displayImage: item.image_link
        };
      }

      grouped[groupId].variants.push({
        id: item.id,
        color: item.color,
        size: item.size,
        price: parseFloat(item.price),
        sale_price: item.sale_price ? parseFloat(item.sale_price) : 0,
        image: item.image_link,
        additional_images: item.additional_image_link ? item.additional_image_link.split(',').map((img: string) => img.trim()) : [],
        availability: item.availability
      });
    });

    return Object.values(grouped);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchProductByGroupId(id: string): Promise<Product | null> {
  const products = await fetchProducts();
  return products.find(p => p.id === id) || null;
}

export const categories = ['All', 'iPhone', 'iWatch', 'MacBook', 'iPad'];
