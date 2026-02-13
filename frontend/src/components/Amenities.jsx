import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Layout, Activity, Flower2, Waves, Home as Clubhouse, ShieldCheck, Camera } from 'lucide-react';

const icons = {
  Dumbbell, Layout, Activity, Flower2, Waves, Clubhouse, ShieldCheck, Camera
};

const Amenities = ({ data }) => {
  if (!data) return null;

  return (
    <section id="amenities" className="py-24 bg-[#f1fcf7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="mb-16">
           <h2 className="text-4xl lg:text-5xl font-serif font-black text-gray-900 mb-4">{data.title || 'Amenities'}</h2>
           <p className="max-w-2xl text-gray-600 font-medium">{data.subtitle}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Large Building Render */}
          <div className="flex-1 w-full relative">
             <div className="rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white group">
                <img 
                  src={data.images?.[0] || "https://images.unsplash.com/photo-1448630305452-9b2fd7098e91?auto=format&fit=crop&q=80&w=1000"} 
                  className="w-full aspect-[4/5] object-cover group-hover:scale-110 transition-transform duration-1000" 
                  alt="Building Overview" 
                />
             </div>
             {/* Decorative blob */}
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-200/50 rounded-full blur-3xl z-[-1]"></div>
          </div>

          {/* Right: Grid of circle-themed icons */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-12 gap-x-8">
               {data.items?.map((item, i) => {
                 const IconComponent = icons[item.icon] || Layout;
                 return (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ delay: i * 0.1 }}
                     viewport={{ once: true }}
                     className="flex flex-col items-center group cursor-pointer"
                   >
                     <div className="w-24 h-24 rounded-full bg-white shadow-[0_15px_30px_rgba(0,0,0,0.05)] flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-2">
                        <IconComponent size={36} />
                     </div>
                     <span className="text-sm font-black text-gray-700 uppercase tracking-widest text-center group-hover:text-emerald-700">{item.title}</span>
                   </motion.div>
                 );
               })}
            </div>

            <div className="mt-16 text-center lg:text-left">
               <button className="bg-[#b4ec51] text-gray-900 px-10 py-3.5 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-[#a2d84a] transition-all shadow-lg active:scale-95">
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
