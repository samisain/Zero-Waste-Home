import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Biodegradable All-Purpose Cleaner',
    description: 'Plant-based cleaning power that cuts through grease and grime without harsh chemicals. Comes in a compostable refill pouch.',
    price: 12.99,
    image: 'https://picsum.photos/seed/cleaner/400/300',
    sustainabilityScore: 95,
    plasticSaved: 150,
    isSubscriptionEligible: true,
  },
  {
    id: '2',
    name: 'Bamboo Toothbrush Set (4-Pack)',
    description: '100% biodegradable bamboo handles with BPA-free nylon bristles. A perfect replacement for plastic toothbrushes.',
    price: 14.50,
    image: 'https://picsum.photos/seed/toothbrush/400/300',
    sustainabilityScore: 90,
    plasticSaved: 80,
    isSubscriptionEligible: true,
  },
  {
    id: '3',
    name: 'Reusable Silicone Food Bags',
    description: 'Durable, leakproof, and microwave-safe silicone bags. Say goodbye to single-use plastic ziplocks forever.',
    price: 24.99,
    image: 'https://picsum.photos/seed/siliconebag/400/300',
    sustainabilityScore: 85,
    plasticSaved: 300,
    isSubscriptionEligible: false,
  },
  {
    id: '4',
    name: 'Eco-Friendly Laundry Detergent Sheets',
    description: 'Zero-waste, plastic-free laundry detergent sheets. Dissolves completely in hot or cold water.',
    price: 18.00,
    image: 'https://picsum.photos/seed/laundry/400/300',
    sustainabilityScore: 98,
    plasticSaved: 200,
    isSubscriptionEligible: true,
  },
  {
    id: '5',
    name: 'Beeswax Food Wraps',
    description: 'Natural alternative to plastic wrap. Made with organic cotton, beeswax, organic jojoba oil, and tree resin.',
    price: 16.50,
    image: 'https://picsum.photos/seed/beeswax/400/300',
    sustainabilityScore: 92,
    plasticSaved: 120,
    isSubscriptionEligible: false,
  },
  {
    id: '6',
    name: 'Compostable Trash Bags',
    description: 'Made from plant starches, these bags break down completely in municipal and industrial composting facilities.',
    price: 11.99,
    image: 'https://picsum.photos/seed/trashbags/400/300',
    sustainabilityScore: 88,
    plasticSaved: 250,
    isSubscriptionEligible: true,
  }
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 tracking-tight">
          Sustainable Living, <span className="text-green-600">Delivered.</span>
        </h1>
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">
          Discover our curated selection of zero-waste, plastic-free household essentials. 
          Every purchase helps reduce your carbon footprint.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
