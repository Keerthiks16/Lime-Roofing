import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Ruler, Users, HardHat, Rocket } from 'lucide-react';

const icons = { Building2, Ruler, Users, HardHat, Rocket };

const Developer = ({ data }) => {
  if (!data) return null;
  const stats = data.items || [];
  
  return (
    <section id="developer" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-4xl lg:text-5xl font-serif font-black text-gray-900 mb-6 tracking-tight">
              {data.title.split(' ')[0]} <span className="text-emerald-700">{data.title.split(' ').slice(1).join(' ')}</span>
           </h2>
           <p className="max-w-3xl mx-auto text-gray-600 font-medium leading-relaxed">
              {data.description}
           </p>
        </div>

        <div className="bg-[#def8ed] rounded-[40px] p-8 lg:p-12">
           <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {stats.map((s, i) => {
                const IconComponent = icons[s.icon] || Building2;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col items-center text-center group"
                  >
                     <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1">
                        <IconComponent size={32} />
                     </div>
                     <h3 className="text-2xl font-black text-gray-900 mb-1">{s.value}</h3>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">{s.label}</p>
                  </motion.div>
                );
              })}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Developer;
