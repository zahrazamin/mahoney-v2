export type ProductData = {
  id: number
  sku: string
  name: string
  price: string
  specs: string
  stockStatus: string
  stockColor: string
  image: string
  hoverImage: string
  logo: string
  category: string
}

export const PRODUCTS: ProductData[] = [
  {
    id: 1,
    sku: '11BG0910A110',
    name: 'Illuminated Push Buttons',
    price: '$23.00',
    specs: '22mm | 10A | Green LED | Momentary',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-1.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner-logo/logo-1.png',
    category: 'Automation & Control',
  },
  {
    id: 2,
    sku: '11BG0910A111',
    name: 'Circuit Breaker',
    price: '$45.00',
    specs: '15A | 1-Pole | DIN Rail Mount',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-2.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner-logo/logo-2.png',
    category: 'Circuit Protection',
  },
  {
    id: 3,
    sku: '11BG0910A112',
    name: 'Cooling Fan',
    price: '$32.00',
    specs: '120V AC | Axial | 119mm',
    stockStatus: 'Lead Time 10 Days',
    stockColor: '#E33C3F',
    image: '/images/products/default/product-12.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner-logo/logo-3.png',
    category: 'Panel Accessories',
  },
  {
    id: 4,
    sku: '11BG0910A113',
    name: 'Warning Light',
    price: '$58.00',
    specs: '24V DC | Red LED | Flashing',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-4.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner-logo/logo-1.png',
    category: 'Automation & Control',
  },
  {
    id: 5,
    sku: '11BG0910A114',
    name: 'Industrial Relay',
    price: '$18.00',
    specs: '12V DC | DPDT | Plug-in',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-5.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner-logo/logo-1.png',
    category: 'Panel Accessories',
  },
  {
    id: 6,
    sku: '11BG0910A115',
    name: 'Power Supply',
    price: '$85.00',
    specs: '24V DC | 5A | 120W | DIN Rail',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-6.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner-logo/logo-2.png',
    category: 'Panel Accessories',
  },
  {
    id: 7,
    sku: '11BG0910A116',
    name: 'Terminal Block',
    price: '$2.50',
    specs: 'Push-in | 2-Conductor | Gray',
    stockStatus: 'Lead Time 10 Days',
    stockColor: '#E33C3F',
    image: '/images/products/default/product-7.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner-logo/logo-3.png',
    category: 'Panel Accessories',
  },
  {
    id: 8,
    sku: '11BG0910A117',
    name: 'Emergency Stop',
    price: '$42.00',
    specs: '40mm Mushroom | Turn to Release',
    stockStatus: '40 in Stock - Ready to ship',
    stockColor: '#538D22',
    image: '/images/products/default/product-8.png',
    hoverImage: '/images/products/hover/hover-image.jpg',
    logo: '/images/logo/partner-logo/logo-1.png',
    category: 'Automation & Control',
  },
]
