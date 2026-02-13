import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import API from '../api/axios';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProps = async () => {
        try {
            const { data } = await API.get('/properties');
            setProperties(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    fetchProps();
  }, []);

  if (loading) return null;

  return (
    <section id="overview" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
           <div>
            <h2 className="text-emerald-600 font-bold mb-2">PROPERTIES</h2>
            <h3 className="text-4xl font-black text-gray-900">Explore More Buildings in the Township</h3>
           </div>
           <div className="flex gap-2">
              <button className="w-12 h-12 rounded-full border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-12 h-12 rounded-full border-2 border-emerald-600 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.map((prop, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-lg">
                <img src={prop.images?.[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600'} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                    <p className="text-xs font-bold bg-emerald-600 px-3 py-1 rounded inline-block mb-3 uppercase tracking-widest">{prop.status}</p>
                    <h4 className="text-2xl font-bold">{prop.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
