import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const Amenities = ({ data }) => {
  if (!data) return null;
  const amenities = data.items || [];

  return (
    <section id="amenities" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
           <h2 className="text-4xl font-serif font-black text-[#1a3a3a] mb-4 tracking-tight">
              {data.title || "Amenities"}
           </h2>
           <p className="text-gray-600 font-medium text-sm leading-relaxed max-w-2xl">
              {data.subtitle || "Thoughtfully crafted surroundings that reflect tradition, comfort, and a human-centered design approach."}
           </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-16">
          
          {/* Left: Large Building Render */}
          <div className="flex-[0.8] w-full relative">
             <div className="rounded-[40px] overflow-hidden shadow-2xl group border-[12px] border-white drop-shadow-xl">
                <img 
                  src={data.images?.[0] || "https://images.unsplash.com/photo-1448630305452-9b2fd7098e91?auto=format&fit=crop&q=80&w=1000"} 
                  className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt="Building Overview" 
                />
             </div>
          </div>

          {/* Right: Amenities Grid */}
          <div className="flex-1 w-full">
             <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {amenities.slice(0, 6).map((item, index) => {
                  const IconComponent = LucideIcons[item.icon] || LucideIcons.Flower2;
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center gap-4 group"
                    >
                       <div className="w-24 h-24 lg:w-32 lg:h-32 bg-white rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-50 flex items-center justify-center text-[#2dd4bf] transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                          <IconComponent size={48} strokeWidth={1.5} />
                       </div>
                       <span className="font-bold text-sm text-gray-700 tracking-tight">{item.title}</span>
                    </motion.div>
                  );
                })}
             </div>

             <div className="mt-16 flex justify-start">
                <button className="bg-gradient-to-r from-[#8be6c4] to-[#c7f474] text-[#1a3a3a] px-8 py-3 rounded-lg font-black text-xs uppercase tracking-widest shadow-[0_10px_20px_rgba(139,230,196,0.3)] hover:shadow-lg transition-all active:scale-95">
                   View more
                </button>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Amenities;
