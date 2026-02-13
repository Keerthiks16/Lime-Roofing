import mongoose from "mongoose";
import dotenv from "dotenv";
import Section from "./models/section.model.js";
import Property from "./models/property.model.js";
import User from "./models/user.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB for seeding...");

    // 1. Create Admin User
    const adminExists = await User.findOne({ email: "admin@gmail.com" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("1234", 12);
      await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("Admin user created.");
    }

    // 2. Seed Sections
    const sections = [
      {
        name: "hero",
        title: "Looking to buy a home in Mumbai?",
        subtitle: "VIGHNAHARTA INFINITY",
        description: "20+ PODIUM LUXURIOUS AMENITIES | SPACIOUS BALCONY HOMES",
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000"],
        extraData: {
          price1Bhk: "69.99 Lacs*",
          price2Bhk: "96.99 Lacs*",
          strikedPrice1Bhk: "74.99 Lacs",
          strikedPrice2Bhk: "1.05 CR",
          address: "Bldg. No. 223/224, Circle - Kannamwar Nagar 1, Vikhroli (East)",
          locationLabel: "Location"
        }
      },
      {
        name: "about",
        title: "About Project",
        description: "At Vighnaharta Infinity, every detail reflects the grandest gesture of life in the most authentic and desirable home. Guided by a humanist approach, the architecture places people at the heart of the space. Built on the foundations of comfort, it evokes a true sense of freedom, protection, and belonging. The moment I entered the house, it felt welcomed - this feeling defines the privilege Vighnaharta Enclave offers.",
        images: [
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", // Center
          "https://images.unsplash.com/photo-1600607687940-47a000df3cc4?auto=format&fit=crop&q=80&w=600", // Top
          "https://images.unsplash.com/photo-1628592102171-ade797814c56?auto=format&fit=crop&q=80&w=600"  // Bottom Right
        ]
      },
      {
        name: "amenities",
        title: "Amenities",
        subtitle: "Thoughtfully crafted surroundings that reflect tradition, comfort, and a human-centered design approach.",
        images: ["https://images.unsplash.com/photo-1448630305452-9b2fd7098e91?auto=format&fit=crop&q=80&w=1000"],
        items: [
          { title: "Gymnasium", icon: "Dumbbell" },
          { title: "Kids Play Area", icon: "Layout" },
          { title: "Jogging Track", icon: "Activity" },
          { title: "Yoga Deck", icon: "Flower2" },
          { title: "Swimming Pool", icon: "Waves" },
          { title: "Clubhouse", icon: "Clubhouse" },
          { title: "Security 24/7", icon: "ShieldCheck" },
          { title: "CCTV", icon: "Camera" },
        ],
      },
      {
        name: "developer",
        title: "About Developer",
        description: "Vighnaharta Developers is more than just a real estate company - we are dream weavers, committed to building not just homes but better lives. With a legacy of expert craftsmanship and a forward-thinking approach, we're transforming skylines and setting new standards in urban living. Our foundation rests on integrity, excellence, and innovation, ensuring every project is a perfect blend of creativity, functionality, and sustainability.",
        items: [
          { label: 'Projects', value: '6', icon: 'Building2' },
          { label: 'sq. ft. area developed', value: '1.32 LAC', icon: 'Ruler' },
          { label: 'Happy Families', value: '449+', icon: 'Users' },
          { label: 'sq. ft. area ongoing', value: '3.77 LAC', icon: 'HardHat' },
          { label: 'sq. ft. Area Upcoming', value: '2.7 LAC', icon: 'Rocket' },
        ]
      },
      {
        name: "township",
        title: "Explore More Buildings in the Township",
        items: [
          { name: 'Vighnaharta Enclave', status: 'Newly Launched', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800' },
          { name: 'Vighnaharta Aarodhya', status: 'Under Construction', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' },
          { name: 'Vighnaharta Elite', status: 'Planning', img: 'https://images.unsplash.com/photo-1600607687940-47a000df3cc4?auto=format&fit=crop&q=80&w=800' },
        ]
      },
      {
        name: "construction",
        title: "Construction Updates",
        items: [
          { tower: 'Tower A', status: 'Under Construction', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' },
          { tower: 'Tower B', status: 'Completed', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800' },
          { tower: 'Tower C', status: 'Completed', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800' },
        ]
      },
      {
        name: "floorplans",
        title: "Floor Plans",
        extraData: {
          wings: ['East Wing', 'West Wing', 'North Wing', 'South Wing'],
          bhks: ['1 BHK', '2 BHK', '5.6 BHK'],
          details: {
            '1 BHK': { type: '1bhk', area: '380-411 RCA Sq.ft', price: 'Click for price' },
            '2 BHK': { type: '2bhk', area: '580-611 RCA Sq.ft', price: 'Click for price' },
            '5.6 BHK': { type: '5.6bhk', area: '1280-1350 RCA Sq.ft', price: 'Click for price' },
          }
        }
      },
      {
        name: "faq",
        title: "Frequently Asked Questions",
        items: [
          { question: "What makes Zenith Group a trusted name?", answer: "Zenith Group has a legacy of excellence and transparency in the real estate industry for over a decade. Our reputation is built on delivering high-quality projects that meet the evolving needs of our customers." },
          { question: "What types of projects do you offer?", answer: "We offer high-quality residential apartments, commercial spaces, and mixed-use townships that are designed to provide a perfect blend of comfort and luxury." },
          { question: "What are the maintenance charges?", answer: "Maintenance charges vary by unit size and are calculated to ensure top-notch upkeep of all common areas and amenities, providing you with a hassle-free living experience." },
          { question: "Is the project RERA registered?", answer: "Yes, all our projects are fully RERA registered, ensuring transparency and accountability for all homebuyers. We strictly adhere to all legal and regulatory requirements." },
          { question: "What are the nearby connectivity options?", answer: "The project is strategically located near major highways, railway stations, and upcoming metro lines, ensuring seamless travel and excellent access to the rest of the city." }
        ]
      }
    ];

    for (const section of sections) {
      await Section.findOneAndUpdate({ name: section.name }, section, { upsert: true, new: true });
    }
    console.log("Sections seeded.");

    // 3. Seed Properties
    const properties = [
      {
        title: "SMART 1 BHK",
        description: "Modern 1 BHK with smart layout and ample natural light. Perfect for young professionals.",
        price: 6999000,
        priceLabel: "₹ 69.99 Lacs*",
        location: "Kanjurmarg East",
        propertyType: "1BHK",
        status: "Newly Launched",
        amenities: ["Gym", "Security", "Parking"],
        features: [{ label: "Area", value: "380-411 sq.ft" }]
      },
      {
        title: "PREMIUM 2 BHK",
        description: "Spacious 2 BHK for comfortable living with a beautiful balcony view.",
        price: 9699000,
        priceLabel: "₹ 96.99 Lacs*",
        location: "Kanjurmarg East",
        propertyType: "2BHK",
        status: "Newly Launched",
        amenities: ["Gym", "Security", "Parking", "Pool"],
        features: [{ label: "Area", value: "580-611 sq.ft" }]
      }
    ];

    for (const prop of properties) {
      await Property.findOneAndUpdate({ title: prop.title }, prop, { upsert: true, new: true });
    }
    console.log("Properties seeded.");

    console.log("Seeding complete!");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
