export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  emoji: string;
  isFresh?: boolean;
  tips?: string;
}

export const CATEGORIES = [
  'Ethiopian Coffee',
  'Traditional Foods',
  'Fresh Breads & Injera',
  'Church & Art',
  'Traditional Clothing',
  'Cooking Equipment',
  'Hair Products',
  'Jewelry',
  'Fresh Meat',
  'Prepared Foods',
  'Spices & Ingredients',
];

export const products: Product[] = [
  // Ethiopian Coffee
  {
    id: 'c1',
    name: 'Yirgacheffe Whole Bean Coffee',
    category: 'Ethiopian Coffee',
    price: 18.99,
    description: 'Single-origin Yirgacheffe beans with bright floral notes and citrus finish. Light roast, 12oz bag.',
    emoji: '☕',
  },
  {
    id: 'c2',
    name: 'Sidama Dark Roast',
    category: 'Ethiopian Coffee',
    price: 16.99,
    description: 'Bold Sidama dark roast with chocolate and berry undertones. 12oz.',
    emoji: '☕',
  },
  {
    id: 'c3',
    name: 'Harrar Ground Coffee',
    category: 'Ethiopian Coffee',
    price: 14.99,
    description: 'Classic Harrar ground coffee, wine-like complexity. Perfect for macchiato. 8oz.',
    emoji: '☕',
  },
  {
    id: 'c4',
    name: 'Ethiopian Coffee Ceremony Kit',
    category: 'Ethiopian Coffee',
    price: 34.99,
    description: 'Traditional jebena pot, 3 finjal cups, and incense. Complete ceremony set.',
    emoji: '🫖',
  },

  // Traditional Foods
  {
    id: 'tf1',
    name: 'Berbere Spice Blend',
    category: 'Traditional Foods',
    price: 7.99,
    description: 'Authentic Ethiopian berbere — chili, korarima, rue, ajwain and more. 6oz.',
    emoji: '🌶️',
  },
  {
    id: 'tf2',
    name: 'Niter Kibbeh (Spiced Butter)',
    category: 'Traditional Foods',
    price: 9.99,
    description: 'Clarified butter infused with onion, garlic, ginger, and spices. 8oz jar.',
    emoji: '🧈',
  },
  {
    id: 'tf3',
    name: 'Shiro Powder',
    category: 'Traditional Foods',
    price: 6.49,
    description: 'Ground chickpea flour blend for making shiro stew. 1 lb.',
    emoji: '🟡',
  },
  {
    id: 'tf4',
    name: 'Tej Honey Wine',
    category: 'Traditional Foods',
    price: 19.99,
    description: 'Traditional Ethiopian honey mead (tej). 500ml bottle.',
    emoji: '🍯',
  },

  // Fresh Breads & Injera
  {
    id: 'ij1',
    name: 'Fresh Injera (5-pack)',
    category: 'Fresh Breads & Injera',
    price: 8.99,
    description: 'Freshly made teff injera, soft and tangy. Made daily in-house.',
    emoji: '🫓',
    isFresh: true,
  },
  {
    id: 'ij2',
    name: 'White Injera (3-pack)',
    category: 'Fresh Breads & Injera',
    price: 5.99,
    description: 'Lighter injera made with barley flour. Great for kids.',
    emoji: '🫓',
    isFresh: true,
  },
  {
    id: 'ij3',
    name: 'Dabo (Ethiopian Bread)',
    category: 'Fresh Breads & Injera',
    price: 4.99,
    description: 'Soft sweet Ethiopian bread, baked fresh daily. Whole loaf.',
    emoji: '🍞',
    isFresh: true,
  },

  // Church & Art
  {
    id: 'ca1',
    name: 'Ethiopian Orthodox Cross',
    category: 'Church & Art',
    price: 29.99,
    description: 'Hand-carved wooden Ethiopian cross with intricate latticework. 8 inches.',
    emoji: '✝️',
  },
  {
    id: 'ca2',
    name: 'Lalibela Art Print',
    category: 'Church & Art',
    price: 24.99,
    description: 'Detailed illustration of the rock-hewn churches of Lalibela. 11x14 print.',
    emoji: '🖼️',
  },
  {
    id: 'ca3',
    name: 'Ethiopian Incense & Burner',
    category: 'Church & Art',
    price: 12.99,
    description: 'Traditional etan incense sticks with clay incense burner set.',
    emoji: '🪔',
  },

  // Traditional Clothing
  {
    id: 'tc1',
    name: 'Habesha Kemis (White)',
    category: 'Traditional Clothing',
    price: 59.99,
    description: 'Traditional Ethiopian white dress with embroidered border (tibeb). One size.',
    emoji: '👗',
  },
  {
    id: 'tc2',
    name: 'Netela Scarf',
    category: 'Traditional Clothing',
    price: 22.99,
    description: 'Lightweight cotton shawl with decorative border, worn for church and ceremonies.',
    emoji: '🧣',
  },
  {
    id: 'tc3',
    name: 'Gabi (Thick Cotton Wrap)',
    category: 'Traditional Clothing',
    price: 44.99,
    description: 'Double-layered handwoven cotton wrap for warmth. Traditional highland attire.',
    emoji: '🧥',
  },

  // Cooking Equipment
  {
    id: 'ce1',
    name: 'Mitad (Injera Griddle)',
    category: 'Cooking Equipment',
    price: 79.99,
    description: 'Electric injera-making griddle with non-stick surface. 20-inch diameter.',
    emoji: '🍳',
  },
  {
    id: 'ce2',
    name: 'Clay Cooking Pot (Disti)',
    category: 'Cooking Equipment',
    price: 34.99,
    description: 'Traditional Ethiopian clay pot for slow-cooking stews. 4 quart.',
    emoji: '🏺',
  },
  {
    id: 'ce3',
    name: 'Wooden Mesob (Basket Table)',
    category: 'Cooking Equipment',
    price: 49.99,
    description: 'Handwoven grass basket table for serving injera and wot. Traditional dining.',
    emoji: '🧺',
  },

  // Hair Products
  {
    id: 'hp1',
    name: 'Argan Oil Hair Serum',
    category: 'Hair Products',
    price: 14.99,
    description: 'Pure Moroccan argan oil for natural hair. Reduces frizz and adds shine. 4oz.',
    emoji: '💆',
  },
  {
    id: 'hp2',
    name: 'Shea Butter Curl Cream',
    category: 'Hair Products',
    price: 11.99,
    description: 'Raw shea butter cream for curly and coily hair types. 8oz.',
    emoji: '💆',
  },
  {
    id: 'hp3',
    name: 'Black Castor Oil',
    category: 'Hair Products',
    price: 9.99,
    description: 'Jamaican black castor oil for hair growth and scalp health. 4oz.',
    emoji: '💆',
  },

  // Jewelry
  {
    id: 'jw1',
    name: 'Ethiopian Cross Necklace (Gold)',
    category: 'Jewelry',
    price: 39.99,
    description: 'Gold-plated Ethiopian Lalibela cross pendant with 18-inch chain.',
    emoji: '📿',
  },
  {
    id: 'jw2',
    name: 'Habesha Bracelet Set',
    category: 'Jewelry',
    price: 24.99,
    description: 'Set of 3 gold-tone filigree bangles in traditional Ethiopian style.',
    emoji: '📿',
  },

  // Fresh Meat
  {
    id: 'fm1',
    name: 'Halal Lamb (1 lb)',
    category: 'Fresh Meat',
    price: 12.99,
    description: 'Fresh halal-certified lamb, cut to order. Perfect for tibs and stew.',
    emoji: '🥩',
    isFresh: true,
  },
  {
    id: 'fm2',
    name: 'Halal Beef Cubes (1 lb)',
    category: 'Fresh Meat',
    price: 10.99,
    description: 'Fresh halal beef, cubed for tibs or ground for kitfo.',
    emoji: '🥩',
    isFresh: true,
  },

  // Prepared Foods
  {
    id: 'pf1',
    name: 'Scrambled Eggs (Enqulal Tibs)',
    category: 'Prepared Foods',
    price: 6.99,
    description: 'Ethiopian-style scrambled eggs with onions, jalapeños, and berbere spice.',
    emoji: '🍳',
    isFresh: true,
    tips: 'Best enjoyed with fresh injera. Add a side of avocado for extra richness.',
  },
  {
    id: 'pf2',
    name: 'Fried Chicken',
    category: 'Prepared Foods',
    price: 9.99,
    description: 'Crispy fried chicken seasoned with Ethiopian spice blend. 2 pieces.',
    emoji: '🍗',
    isFresh: true,
    tips: 'Pair with our house hot sauce and yellow rice for a complete meal.',
  },
  {
    id: 'pf3',
    name: 'Yellow Rice',
    category: 'Prepared Foods',
    price: 4.99,
    description: 'Fragrant turmeric rice cooked with vegetables and Ethiopian spices.',
    emoji: '🍚',
    isFresh: true,
    tips: 'Great side dish. Pairs well with any protein or stew.',
  },
  {
    id: 'pf4',
    name: 'Busavan (Spicy Stew)',
    category: 'Prepared Foods',
    price: 8.99,
    description: 'Rich and spicy meat stew slow-cooked with berbere and vegetables.',
    emoji: '🍲',
    isFresh: true,
    tips: 'Serve over injera and let it soak for 2 minutes before eating.',
  },
  {
    id: 'pf5',
    name: 'Sambosa (6-pack)',
    category: 'Prepared Foods',
    price: 7.99,
    description: 'Crispy pastry triangles filled with spiced lentils or meat. 6 pieces.',
    emoji: '🥟',
    isFresh: true,
    tips: 'Dip in our house awaze sauce. Best eaten hot within 30 minutes.',
  },

  // Spices & Ingredients
  {
    id: 'si1',
    name: 'Mitmita Spice',
    category: 'Spices & Ingredients',
    price: 5.99,
    description: 'Intensely hot Ethiopian spice blend of bird\'s eye chili and cardamom. 2oz.',
    emoji: '🌶️',
  },
  {
    id: 'si2',
    name: 'Korarima (Ethiopian Cardamom)',
    category: 'Spices & Ingredients',
    price: 8.99,
    description: 'Whole Ethiopian cardamom pods. Sweeter and more complex than green cardamom. 2oz.',
    emoji: '🌿',
  },
  {
    id: 'si3',
    name: 'Teff Flour (2 lb)',
    category: 'Spices & Ingredients',
    price: 9.49,
    description: 'Whole grain teff flour for making injera or gluten-friendly baking. 2 lbs.',
    emoji: '🌾',
  },
];

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
