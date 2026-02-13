import React from 'react';
import { motion } from 'framer-motion';

const ConstructionUpdates = ({ data }) => {
  if (!data) return null;
  const updates = data.items || [];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 text-center mb-16 tracking-tight">
          {data.title.split(' ').map((word, i, arr) => (
             i === arr.length - 1 ? <span key={i} className="text-emerald-700">{word}</span> : word + ' '
          ))}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {updates.map((u, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="group relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-96"
             >
                <img src={u.img || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={u.tower} />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                   <div className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 mb-4">
                      <p className="text-xs font-black uppercase tracking-widest">{u.status}</p>
                   </div>
                   <h3 className="text-xl font-black uppercase tracking-wider mb-2">{u.tower}</h3>
                   <a href="#" className="text-xs font-bold underline underline-offset-4 hover:text-[#b4ec51] transition-colors">Know More</a>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default ConstructionUpdates;
