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
    <div className="bg-white p-8 rounded-3xl shadow-2xl border border-emerald-50">
      <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight mb-8 text-center italic">Enquire Now</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
          <input
            type="text"
            placeholder="Your Name"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={18} />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-4 text-emerald-600" size={18} />
          <textarea
            placeholder="Your Message"
            rows="3"
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>
        <button
          disabled={loading}
          className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 uppercase tracking-widest disabled:opacity-50"
        >
          {loading ? 'Sending...' : (
            <>
              <Send size={18} />
              Submit Inquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
