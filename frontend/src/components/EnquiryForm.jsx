import React, { useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Send, User, Mail, Phone, MessageSquare } from 'lucide-react';

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/leads', formData);
      toast.success('Inquiry sent! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-[40px] shadow-2xl border border-emerald-50 relative z-10 h-auto max-h-[50vh] flex flex-col justify-center">
      <h3 className="text-2xl font-black text-[#1a3a3a] uppercase tracking-tight mb-6 text-center italic italic-bold">
        Enquire Now
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:text-emerald-600 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Your Name"
            className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-white transition-all text-gray-800 text-sm font-medium"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:text-emerald-600 transition-colors" size={16} />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-white transition-all text-gray-800 text-sm font-medium"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>
        
        <div className="relative group">
          <MessageSquare className="absolute left-4 top-3 text-emerald-500 group-focus-within:text-emerald-600 transition-colors" size={16} />
          <textarea
            placeholder="Your Message"
            rows="2"
            className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-white transition-all text-gray-800 text-sm font-medium resize-none"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>
        
        <button
          disabled={loading}
          className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200/50 flex items-center justify-center gap-2 uppercase tracking-[0.1em] text-[10px] disabled:opacity-50 active:scale-95"
        >
          {loading ? 'Sending...' : (
            <>
              <Send size={16} />
              SUBMIT INQUIRY
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
