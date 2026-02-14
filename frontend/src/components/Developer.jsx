import React from 'react';
import { motion } from 'framer-motion';

const Developer = ({ data }) => {
  if (!data) return null;
  const stats = data.items || [];
  
  return (
    <section id="developer" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header */}
        <div className="text-center mb-4 max-w-4xl mx-auto">
           <h2 className="text-4xl lg:text-5xl font-serif font-black text-[#1a3a3a] mb-6 tracking-tight">
              {data.title || "About Developer"}
           </h2>
           <p className="text-gray-600 font-medium leading-relaxed text-sm">
              {data.description}
           </p>
        </div>

        {/* Horizontal Stats Strip */}
        <div className="bg-[#def8ed] rounded-full px-6 py-3 mb-8 shadow-sm border border-emerald-50">
           <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-8">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center px-4 border-r border-emerald-200/50 last:border-0 flex-1">
                   <h3 className="text-lg md:text-xl font-black text-[#1a3a3a] mb-0.5">{s.value}</h3>
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">{s.label}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Large Panoramic Image */}
        <motion.div 
           initial={{ opacity: 0, y: 50, rotateX: 5 }}
           whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
           transition={{ duration: 1, ease: "easeOut" }}
           viewport={{ once: true }}
           className="relative group rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-white drop-shadow-2xl aspect-[21/9]"
        >
           <img 
              src={data.images?.[0] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1500"} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
              alt="Developer Vision" 
           />
           <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#def8ed]/20 to-transparent pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Developer;
