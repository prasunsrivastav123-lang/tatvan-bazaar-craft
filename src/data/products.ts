import honeyImg from "@/assets/product-honey.jpg";
import gheeImg from "@/assets/product-ghee.jpg";
import attaImg from "@/assets/product-atta.jpg";

export type Category = {
  slug: string;
  name: string;
  tagline: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string; // category slug
  price: number;    // in INR
  compareAt?: number;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  benefits: string[];
  weightOptions: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
};

export const categories: Category[] = [
  { slug: "honey", name: "Honey", tagline: "Raw, unheated & unfiltered" },
  { slug: "ghee", name: "Ghee", tagline: "A2 desi cow, bilona churned" },
  { slug: "atta", name: "Atta", tagline: "Stone-ground whole wheat" },
];

export const products: Product[] = [
  {
    id: "p-honey-01",
    slug: "raw-forest-honey",
    name: "Raw Forest Honey",
    category: "honey",
    price: 499,
    compareAt: 599,
    image: honeyImg,
    gallery: [honeyImg],
    shortDescription: "Pure, unpasteurised wild honey from Himalayan forests.",
    description:
      "Harvested by traditional beekeepers from wild hives in the Himalayan foothills, our raw honey is unheated, unfiltered and free from any additives. Every jar carries the aroma of wildflowers, sal and jamun blooms.",
    benefits: [
      "100% raw & unprocessed",
      "Rich in natural enzymes & antioxidants",
      "Ethically harvested from wild hives",
      "No added sugar or preservatives",
    ],
    weightOptions: ["250g", "500g", "1kg"],
    rating: 4.9,
    reviewCount: 214,
    badge: "Bestseller",
  },
  {
    id: "p-ghee-01",
    slug: "a2-bilona-ghee",
    name: "A2 Bilona Ghee",
    category: "ghee",
    price: 899,
    compareAt: 1099,
    image: gheeImg,
    gallery: [gheeImg],
    shortDescription: "Hand-churned A2 desi cow ghee, golden and aromatic.",
    description:
      "Made the ancient bilona way — curd is churned to butter, then slow-cooked over wood fire until it turns into golden, granular ghee. Sourced only from grass-fed A2 Gir cows.",
    benefits: [
      "A2 milk from grass-fed Gir cows",
      "Traditional bilona churning",
      "Slow wood-fire cooked",
      "Rich in Vitamin A, D, E & K",
    ],
    weightOptions: ["250ml", "500ml", "1L"],
    rating: 4.8,
    reviewCount: 168,
    badge: "New",
  },
  {
    id: "p-atta-01",
    slug: "stone-ground-atta",
    name: "Stone-Ground Whole Wheat Atta",
    category: "atta",
    price: 349,
    image: attaImg,
    gallery: [attaImg],
    shortDescription: "Chakki-fresh atta from single-origin heritage wheat.",
    description:
      "Milled slowly on traditional stone chakkis to preserve the wheat germ and bran. Made from single-origin Sharbati wheat grown without chemical fertilisers.",
    benefits: [
      "Slow stone-milled for freshness",
      "Chemical-free heritage Sharbati wheat",
      "High fibre & natural nutrients",
      "Soft, fluffy rotis every time",
    ],
    weightOptions: ["1kg", "5kg", "10kg"],
    rating: 4.7,
    reviewCount: 92,
  },
];

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
