import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data) return null;

  return (
    <section id="faq" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-black text-gray-900 text-center mb-16 tracking-tight">Frequently Asked <span className="text-emerald-700">Questions</span></h2>
        
        <div className="space-y-4">
          {data.items?.map((item, index) => (
            <div key={index} className="overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all duration-300 text-left ${activeIndex === index ? 'bg-[#def8ed] shadow-md' : 'bg-[#f1fcf7] hover:bg-[#def8ed]'}`}
              >
                <span className="font-bold text-gray-800 tracking-tight">{item.question}</span>
                <div className={`transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                   {activeIndex === index ? <Minus size={20} className="text-emerald-600" /> : <Plus size={20} className="text-emerald-600" />}
                </div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-8 text-gray-600 leading-relaxed font-medium bg-white/50 rounded-b-2xl border-x border-b border-[#def8ed]">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
