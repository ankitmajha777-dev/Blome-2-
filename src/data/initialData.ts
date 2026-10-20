import { Product, EventPackage, Review, FAQItem, Reservation, Order } from '../types/cafe';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'sig-1',
    name: 'Blossom Vanilla Latte',
    category: 'signature',
    tagline: 'Infused with organic Madagascar bourbon vanilla & delicate orange blossom essence',
    description: 'Double ristretto extracted over house-steeped Madagascar vanilla bean, finished with microfoamed oat milk and an aromatic mist of distilled orange blossom water.',
    price: 6.75,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    origin: 'Huila, Colombia & Sidama, Ethiopia',
    tastingNotes: ['Bourbon Vanilla', 'Orange Blossom', 'Caramelized Honey'],
    dietary: ['vegan', 'organic'],
    available: true,
    isPopular: true,
    isSeasonal: false,
    calories: 190,
    sizes: [
      { name: 'Small', volume: '8 oz', extraPrice: 0 },
      { name: 'Regular', volume: '12 oz', extraPrice: 0.65 },
      { name: 'Grand', volume: '16 oz', extraPrice: 1.25 }
    ],
    milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk', 'House Pistachio Milk (+$0.80)'],
    sweetLevels: ['Standard (100%)', 'Subtle (50%)', 'Delicate (25%)', 'Unsweetened (0%)'],
    extras: [
      { name: 'Extra Espresso Shot', price: 1.25 },
      { name: 'Vanilla Bean Cold Foam', price: 1.00 },
      { name: 'Organic Lavender Drizzle', price: 0.75 }
    ]
  },
  {
    id: 'sig-2',
    name: 'Honey Oat Cappuccino',
    category: 'signature',
    tagline: 'Raw wildflower honey velvet foam with a dust of Ceylon cinnamon',
    description: 'Creamy espresso pulled through raw California wildflower honey, crowned with dense velvety oat microfoam and dusted with sun-dried Ceylon cinnamon.',
    price: 6.25,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80',
    origin: 'Antioquia, Colombia',
    tastingNotes: ['Wildflower Honey', 'Warm Cinnamon', 'Golden Toffee'],
    dietary: ['organic'],
    available: true,
    isPopular: true,
    isSeasonal: false,
    calories: 175,
    sizes: [
      { name: 'Small', volume: '8 oz', extraPrice: 0 },
      { name: 'Regular', volume: '12 oz', extraPrice: 0.65 }
    ],
    milkOptions: ['Oat Milk (Recommended)', 'Whole Milk', 'Almond Milk'],
    sweetLevels: ['Standard Honey', 'Light Honey', 'Extra Honey'],
    extras: [
      { name: 'Extra Ristretto Shot', price: 1.25 },
      { name: 'Bee Pollen Crunch', price: 0.90 }
    ]
  },
  {
    id: 'sig-3',
    name: 'Ceremonial Rose Matcha',
    category: 'signature',
    tagline: 'First-harvest Kyoto Uji matcha kissed with Damascus rose water',
    description: 'Stone-ground ceremonial grade Uji matcha whisked by hand with delicate Damask rose reduction and steamed almond or oat milk for a luminous floral uplift.',
    price: 7.25,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    origin: 'Uji, Kyoto Prefecture, Japan',
    tastingNotes: ['Sweet Umami', 'Fresh Cut Rose', 'Spring Grass'],
    dietary: ['vegan', 'organic', 'gluten-free'],
    available: true,
    isPopular: true,
    isSeasonal: false,
    calories: 140,
    sizes: [
      { name: 'Regular', volume: '12 oz', extraPrice: 0 },
      { name: 'Grand', volume: '16 oz', extraPrice: 0.85 }
    ],
    milkOptions: ['House Pistachio Milk', 'Oat Milk', 'Almond Milk', 'Whole Milk'],
    sweetLevels: ['Rose Cane Sweetness', 'Light (50%)', 'Pure (Unsweetened)'],
    extras: [
      { name: 'Matcha Double Scoop', price: 1.50 },
      { name: 'Collagen Peptide Boost', price: 1.50 },
      { name: 'Rose Petal Dusting', price: 0.50 }
    ]
  },
  {
    id: 'sig-4',
    name: 'Brown Sugar Botanical Cold Brew',
    category: 'signature',
    tagline: '18-hour slow steep steeped with star anise and smoked brown sugar',
    description: 'Slow-extracted single-origin Ethiopian cold brew lightly infused with bruised cardamom and star anise, finished with caramelized brown sugar reduction and salted cream float.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    origin: 'Yirgacheffe, Ethiopia (Natural Process)',
    tastingNotes: ['Black Cherry', 'Smoked Brown Sugar', 'Star Anise'],
    dietary: ['organic', 'gluten-free'],
    available: true,
    isPopular: true,
    isSeasonal: false,
    calories: 160,
    sizes: [
      { name: 'Regular', volume: '12 oz', extraPrice: 0 },
      { name: 'Grand', volume: '16 oz', extraPrice: 0.75 }
    ],
    milkOptions: ['Salted Sweet Cream (Default)', 'Oat Milk Float', 'No Milk / Black'],
    sweetLevels: ['Standard Brown Sugar', 'Half Sweet', 'Subtle Hint'],
    extras: [
      { name: 'Nitro Tap Infusion', price: 1.00 },
      { name: 'Vanilla Cold Foam', price: 1.00 }
    ]
  },
  {
    id: 'sig-5',
    name: 'Seasonal Floral Lavender Latte',
    category: 'seasonal',
    tagline: 'Provencal lavender buds steeped in cane sugar with velvety espresso',
    description: 'Our spring special: hand-harvested culinary lavender from Provence simmered into an aromatic syrup, combined with espresso and silky textured milk.',
    price: 6.95,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80',
    origin: 'Guji Highland, Ethiopia',
    tastingNotes: ['Lavender Floret', 'Meyer Lemon', 'Sweet Cream'],
    dietary: ['vegan', 'organic'],
    available: true,
    isPopular: false,
    isSeasonal: true,
    calories: 185,
    sizes: [
      { name: 'Small', volume: '8 oz', extraPrice: 0 },
      { name: 'Regular', volume: '12 oz', extraPrice: 0.65 },
      { name: 'Grand', volume: '16 oz', extraPrice: 1.25 }
    ],
    milkOptions: ['Oat Milk', 'Whole Milk', 'Almond Milk'],
    sweetLevels: ['Standard', 'Light Sweet', 'Extra Lavender'],
    extras: [
      { name: 'Extra Shot', price: 1.25 },
      { name: 'Dried Lavender Buds Top', price: 0.50 }
    ]
  },
  {
    id: 'esp-1',
    name: 'Boutique Cortado',
    category: 'espresso',
    tagline: 'Equal parts precision espresso and silky steamed whole or oat milk',
    description: 'A 1:1 balance of double espresso and steamed milk served in a faceted Gibraltar glass. Sharp, sweet, and comforting.',
    price: 4.75,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    origin: 'Tarrazú, Costa Rica',
    tastingNotes: ['Dark Chocolate', 'Roasted Hazelnut', 'Plum'],
    dietary: ['gluten-free'],
    available: true,
    sizes: [{ name: 'Standard (4.5 oz)', volume: '4.5 oz', extraPrice: 0 }],
    milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk'],
    sweetLevels: ['Unsweetened (Standard)', 'Drop of Agave', 'Raw Sugar']
  },
  {
    id: 'esp-2',
    name: 'Artisan Flat White',
    category: 'espresso',
    tagline: 'Micro-textured velvet foam over a concentrated double ristretto',
    description: 'Originating in Melbourne, crafted with our signature House Roast. A dense, glossy microfoam that seamlessly folds into dark cacao undertones.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe9d2b?auto=format&fit=crop&w=800&q=80',
    origin: 'Bourbon & Typica Blend, Guatemala',
    tastingNotes: ['Bakers Cacao', 'Pecan', 'Brown Butter'],
    dietary: ['gluten-free'],
    available: true,
    sizes: [
      { name: 'Standard', volume: '8 oz', extraPrice: 0 },
      { name: 'Large', volume: '12 oz', extraPrice: 0.65 }
    ],
    milkOptions: ['Whole Milk', 'Oat Milk', 'Almond Milk', 'Pistachio Milk']
  },
  {
    id: 'esp-3',
    name: 'Single-Origin Pour Over',
    category: 'espresso',
    tagline: 'Hario V60 hand-brewed cup with rotating microlot beans',
    description: 'Poured with gentle concentric swirls to unlock the pristine terroir of our current microlot harvest. Clean, bright, and deeply complex.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    origin: 'Yirgacheffe, Gedeb District, Ethiopia',
    tastingNotes: ['Jasmine Florals', 'Peach Nectar', 'Bergamot'],
    dietary: ['vegan', 'organic', 'gluten-free'],
    available: true,
    sizes: [{ name: 'Cup (10 oz)', volume: '10 oz', extraPrice: 0 }]
  },
  {
    id: 'tea-1',
    name: 'Sparkling Yuzu Sencha',
    category: 'tea',
    tagline: 'Chilled Japanese green tea with cold-pressed Kochi yuzu fruit',
    description: 'Cold-steeped Shizuoka sencha blended with tart, fragrant Kochi yuzu juice and artisanal sparkling mineral water over hand-carved ice.',
    price: 6.25,
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    origin: 'Shizuoka Prefecture, Japan',
    tastingNotes: ['Kochi Yuzu', 'Sweet Grass', 'Crisp Citrus'],
    dietary: ['vegan', 'organic', 'gluten-free'],
    available: true,
    sizes: [
      { name: 'Regular', volume: '12 oz', extraPrice: 0 },
      { name: 'Grand', volume: '16 oz', extraPrice: 0.75 }
    ]
  },
  {
    id: 'tea-2',
    name: 'Botanical Chamomile & Peach Tisane',
    category: 'tea',
    tagline: 'Whole Egyptian chamomile flowers infused with dried white peach slices',
    description: 'Naturally caffeine-free calming herbal blend. Golden liquor with soothing apple-honey notes and sun-ripened orchard peach.',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    origin: 'Fayoum Oasis, Egypt',
    tastingNotes: ['Apple Honey', 'White Peach', 'Linden Flower'],
    dietary: ['vegan', 'organic', 'decaf', 'gluten-free'],
    available: true,
    sizes: [{ name: 'Pot (14 oz)', volume: '14 oz', extraPrice: 0 }]
  },
  {
    id: 'cld-1',
    name: 'Nitro Blossom Tonic',
    category: 'cold',
    tagline: 'Velvety nitrogen-infused espresso over artisanal fever-tree tonic & citrus zest',
    description: 'Cascading nitro head meeting bittersweet botanicals. Effervescent, invigorating, and layered with fresh grapefruit oil.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    origin: 'Nariño, Colombia',
    tastingNotes: ['Pink Grapefruit', 'Quinine Bark', 'Brown Sugar'],
    dietary: ['vegan', 'gluten-free'],
    available: true,
    sizes: [{ name: 'Chilled (12 oz)', volume: '12 oz', extraPrice: 0 }]
  },
  {
    id: 'pst-1',
    name: 'Cardamom & Rose Water Morning Bun',
    category: 'pastry',
    tagline: 'Hand-laminated croissant dough swirled with freshly cracked cardamom',
    description: 'Baked fresh daily at 5:30 AM. Flaky, caramelized exterior dusted with Persian rose sugar and aromatic green cardamom.',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    origin: 'In-House Artisan Bakery',
    tastingNotes: ['Cardamom Spice', 'Caramelized Butter', 'Rose Cane Sugar'],
    dietary: ['organic'],
    available: true,
    isPopular: true
  },
  {
    id: 'pst-2',
    name: 'Almond Blossom Frangipane Tart',
    category: 'pastry',
    tagline: 'Sweet almond cream baked in a buttery pâte sablée with seasonal apricots',
    description: 'Rich almond frangipane infused with amaretto essence, studded with poached seasonal fruit and toasted sliced almonds.',
    price: 6.25,
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    origin: 'In-House Artisan Bakery',
    tastingNotes: ['Toasted Almond', 'Apricot Glaze', 'Pure Vanilla'],
    dietary: ['organic'],
    available: true
  },
  {
    id: 'pst-3',
    name: 'Gluten-Free Olive Oil & Citrus Loaf',
    category: 'pastry',
    tagline: 'Organic cold-pressed olive oil, Meyer lemon zest, and almond flour crumb',
    description: 'Moist and tender crumb glazed with tart blood orange syrup. Wholesome, fragrant, and naturally gluten-free.',
    price: 5.25,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
    origin: 'In-House Artisan Bakery',
    tastingNotes: ['Meyer Lemon', 'Extra Virgin Olive Oil', 'Almond'],
    dietary: ['gluten-free', 'dairy-free', 'organic'],
    available: true
  }
];

export const INITIAL_EVENT_PACKAGES: EventPackage[] = [
  {
    id: 'pkg-1',
    name: 'The Botanical Coffee Cart Experience',
    tagline: 'Custom brass & white oak mobile espresso bar brought directly to your venue',
    guestCapacity: '30 - 150 guests',
    basePrice: 650,
    priceUnit: 'for 2 hours (all-inclusive)',
    description: 'Our mobile custom coffee bar equipped with a two-group La Marzocco, two master baristas, complete drink menu including custom branded latte art, house syrups, and botanical teas.',
    features: [
      'Dedicated Baristas & Complete Bar Setup',
      'Unlimited Specialty Espresso & Signature Drinks',
      'Organic Dairy & House Pistachio / Oat Milks',
      'Custom Stamped Cups with Your Monogram or Logo',
      'Setup & Breakdown Included'
    ],
    image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Weddings, Corporate Brand Launches & Private Showrooms'
  },
  {
    id: 'pkg-2',
    name: 'Private Café Evening Buyout',
    tagline: 'Exclusive after-hours access to our SoHo Flagship and Botanical Garden Patio',
    guestCapacity: 'Up to 55 guests',
    basePrice: 1200,
    priceUnit: 'base hire (4 hours)',
    description: 'Transform our light-filled atrium and lush conservatory patio into your private dining or cocktail lounge. Includes barista service, craft coffee mocktails, curated ambient vinyl playlist, and event lighting.',
    features: [
      'Full Exclusive Access to Atrium & Heated Garden Patio',
      'Dedicated Event Lead, Barista Team & Service Staff',
      'Coffee Mocktail Bar & Full Espresso Service',
      'Artisan Pastry & Savory Canapé Displays',
      'Sonos Hi-Fi Sound System with Vinyl Station'
    ],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Intimate Celebrations, Rehearsal Dinners & Book Launches'
  },
  {
    id: 'pkg-3',
    name: 'Artisan Pastry & Coffee Morning Tower',
    tagline: 'Drop-off breakfast catering with insulated airpots and bakery platters',
    guestCapacity: '15 - 50 guests',
    basePrice: 240,
    priceUnit: 'per package',
    description: 'Freshly baked morning buns, almond frangipane tarts, and fruit loaves accompanied by insulated 96oz travel boxes of our single-origin pour overs, house syrups, and eco-friendly cups.',
    features: [
      'Assorted Warm Morning Pastry Platters (18-36 pcs)',
      'Dual 96oz Coffee Cambros (House Roast & Single Origin)',
      'Side of Madagascar Vanilla Syrup & Cinnamon',
      'Bio-Compostable Serving Ware & Napkins',
      'Prompt Morning Delivery with Setup'
    ],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    recommendedFor: 'Executive Board Meetings & Architecture Studio Breakfasts'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Elena Vance',
    role: 'Architect & Urban Designer',
    rating: 5,
    comment: 'The Blossom Vanilla Latte is sublime. As someone who appreciates quiet design and unhurried craftsmanship, Beane & Blossom has become my sanctuary every Tuesday morning.',
    favoriteItem: 'Blossom Vanilla Latte',
    date: 'October 12, 2026',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'Marcus Chen',
    role: 'Editorial Director, Kinfolk Style',
    rating: 5,
    comment: 'Easily the most thoughtful café in the city. The single-origin pour over tastes like pure jasmine nectar, and the light streaming into the back atrium is breathtaking.',
    favoriteItem: 'Ethiopian Single-Origin Pour Over',
    date: 'September 28, 2026',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Sophie Laurier',
    role: 'Floral Stylist & Event Producer',
    rating: 5,
    comment: 'We booked their mobile espresso cart for our spring studio launch. The guests were raving about the rose matcha and the attention to botanical detail. Flawless hospitality!',
    favoriteItem: 'Ceremonial Rose Matcha',
    date: 'September 15, 2026',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'David Holloway',
    role: 'Specialty Coffee Guild Member',
    rating: 5,
    comment: 'Pristine extraction parameters and genuine relationship with their farmers in Huila. You can taste the intention in every single pull.',
    favoriteItem: 'Boutique Cortado',
    date: 'August 30, 2026',
    verified: true
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'RSV-8419',
    date: '2026-10-21',
    time: '10:30 AM',
    guests: 2,
    seatingPreference: 'Garden Patio',
    name: 'Clara Dubois',
    email: 'clara.dubois@example.com',
    phone: '(555) 349-2810',
    specialRequests: 'Quiet table for morning design review',
    status: 'confirmed',
    createdAt: '2026-10-18T14:20:00Z'
  },
  {
    id: 'RSV-9124',
    date: '2026-10-22',
    time: '02:00 PM',
    guests: 4,
    seatingPreference: 'Sunlit Atrium',
    name: 'Jonathan Meyers',
    email: 'jmeyers@studio.design',
    phone: '(555) 892-1133',
    specialRequests: 'Birthday coffee & pastry tasting',
    status: 'confirmed',
    createdAt: '2026-10-19T09:15:00Z'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'BB-7821',
    customer: {
      name: 'Amara Solis',
      email: 'amara@example.com',
      phone: '(555) 234-8901',
      pickupTime: '15 minutes',
      orderType: 'pickup_now'
    },
    items: [
      {
        cartId: 'item-1',
        product: INITIAL_PRODUCTS[0],
        size: 'Regular (12 oz)',
        sizePrice: 0.65,
        milk: 'Oat Milk',
        milkPrice: 0,
        sweetLevel: 'Subtle (50%)',
        selectedExtras: [{ name: 'Vanilla Bean Cold Foam', price: 1.00 }],
        quantity: 1,
        itemPrice: 8.40
      },
      {
        cartId: 'item-2',
        product: INITIAL_PRODUCTS[5],
        size: 'Standard (8 oz)',
        sizePrice: 0,
        milk: 'Whole Milk',
        milkPrice: 0,
        sweetLevel: 'Unsweetened',
        selectedExtras: [],
        quantity: 1,
        itemPrice: 5.50
      }
    ],
    subtotal: 13.90,
    discount: 0,
    tax: 1.15,
    tip: 2.00,
    total: 17.05,
    paymentMethod: 'Apple Pay (Demo)',
    status: 'ready',
    createdAt: '2026-10-19T19:45:00Z'
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    category: 'coffee',
    question: 'Where do your coffee beans come from?',
    answer: 'We roast exclusively with direct-trade microlots from generational farm partners in Huila (Colombia), Yirgacheffe & Guji (Ethiopia), and Tarrazú (Costa Rica). We pay an average of 42% above fair-trade floor prices to ensure ecological soil stewardship and living wages for pickers.'
  },
  {
    category: 'coffee',
    question: 'What botanical ingredients do you use in your signature drinks?',
    answer: 'Every botanical syrup and essence is hand-crafted in our roastery kitchen. We use organic Madagascar Bourbon vanilla beans, cold-distilled orange blossom water from Seville, culinary French lavender from Provence, and Damask rose water. No artificial flavorings or synthetic food colorings are ever used.'
  },
  {
    category: 'orders',
    question: 'How does online ordering and pickup work?',
    answer: 'Select your drinks and pastries, customize milk, size, and sweetness, and choose pickup ASAP (~15 minutes) or a scheduled time slot. We begin crafting your order so it is fresh, hot, and waiting at our designated express pickup counter.'
  },
  {
    category: 'reservations',
    question: 'Do you require table reservations for casual visits?',
    answer: 'Walk-ins are always warmly welcomed! We reserve approximately 40% of our seating (including the Botanical Patio and Sunlit Atrium) for advance bookings, while the espresso bar and communal oak table remain available for walk-in guests.'
  },
  {
    category: 'events',
    question: 'Can I book the café for private parties or weddings?',
    answer: 'Yes! We host evening café buyouts for intimate celebrations, rehearsal dinners, brand launches, and creative workshops. We also offer our custom mobile coffee cart service throughout the greater metropolitan area.'
  }
];

export const TIMELINE_MILESTONES = [
  {
    year: '2019',
    title: 'The Seed',
    description: 'Founders Julian and Maeve begin micro-batch roasting in a small Brooklyn garage, experimenting with botanical tea and coffee infusions.'
  },
  {
    year: '2021',
    title: 'Direct-Trade Partnerships',
    description: 'Established ethical trade contracts with smallholder farm cooperatives in Huila, Colombia and Yirgacheffe, Ethiopia.'
  },
  {
    year: '2023',
    title: 'The Flagship Café Opens',
    description: 'Opened our flagship location on Blossom Lane, featuring a living indoor conservatory, custom brass bar, and artisan bakery.'
  },
  {
    year: '2025',
    title: 'The Blossom Society',
    description: 'Launched our zero-waste initiative, botanical subscription club, and community barista masterclasses.'
  }
];

export const CAFÉ_DETAILS = {
  name: 'Beane & Blossom',
  tagline: 'Where Every Cup Finds Its Bloom.',
  address: '418 Blossom Lane, SoHo District, New York, NY 10012',
  phone: '+1 (555) 232-6325',
  email: 'hello@beaneandblossom.com',
  hours: {
    weekdays: '6:30 AM – 7:00 PM',
    weekends: '7:30 AM – 8:00 PM'
  },
  social: {
    instagram: '@beaneandblossom',
    facebook: 'facebook.com/beaneandblossom',
    pinterest: 'pinterest.com/beaneandblossom'
  }
};
