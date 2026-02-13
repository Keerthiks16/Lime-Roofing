import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';

const PropertyManager = () => {
  const [properties, setProperties] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProp, setCurrentProp] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', priceLabel: '', location: '', propertyType: '', status: '', amenities: [], images: [], floorPlan: ''
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data } = await API.get('/properties');
      setProperties(data);
    } catch (error) {
      toast.error('Failed to fetch properties');
    }
  };

  const handleEdit = (prop) => {
    setCurrentProp(prop);
    setFormData(prop);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this property?')) {
      try {
        await API.delete(`/properties/${id}`);
        toast.success('Deleted');
        fetchProperties();
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const dataObj = new FormData();
    dataObj.append('image', file);
    setUploading(true);

    try {
      const { data } = await API.post('/properties/upload', dataObj, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData(prev => ({ ...prev, images: [data.url] }));
      toast.success('Image uploaded');
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return toast.error('Please wait for image upload');
    try {
      if (currentProp) {
        await API.put(`/properties/${currentProp._id}`, formData);
        toast.success('Updated');
      } else {
        await API.post('/properties', formData);
        toast.success('Created');
      }
      setIsEditing(false);
      setCurrentProp(null);
      fetchProperties();
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Property Management</h1>
        <button
          onClick={() => { setIsEditing(true); setCurrentProp(null); setFormData({ title: '', description: '', price: '', priceLabel: '', location: '', propertyType: '', status: '', amenities: [], images: [], floorPlan: '' }); }}
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Property
        </button>
      </div>

      {!isEditing ? (
        <div className="grid md:grid-cols-2 gap-8">
          {properties.map(p => (
            <div key={p._id} className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 flex gap-6">
               <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100">
                  <img src={p.images?.[0] || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-gray-800 tracking-tight uppercase">{p.title}</h3>
                    <p className="text-emerald-600 font-black">{p.priceLabel}</p>
                    <p className="text-gray-400 text-sm font-bold mt-1 uppercase tracking-widest">{p.propertyType} • {p.status}</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                     <button onClick={() => handleEdit(p)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit3 size={18} /></button>
                     <button onClick={() => handleDelete(p._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl space-y-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">{currentProp ? 'Edit Property' : 'New Property'}</h2>
            <button type="button" onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
             <div className="md:col-span-2">
                <label className="text-xs font-black text-emerald-700 uppercase tracking-widest block mb-2">Property Image</label>
                <div className="flex items-center gap-4">
                   <div className="w-24 h-24 rounded-xl border-2 border-dashed border-emerald-200 flex items-center justify-center overflow-hidden bg-gray-50">
                      {formData.images?.[0] ? (
                        <img src={formData.images[0]} className="w-full h-full object-cover" />
                      ) : (
                        <Plus className="text-emerald-300" />
                      )}
                   </div>
                   <input 
                     type="file" 
                     onChange={handleImageUpload} 
                     className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" 
                   />
                   {uploading && <span className="text-xs font-bold text-emerald-600 animate-pulse uppercase">Uploading...</span>}
                </div>
             </div>
             <input placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none" required />
             <input placeholder="Price Label (e.g. 69.99 Lacs*)" value={formData.priceLabel} onChange={e => setFormData({...formData, priceLabel: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none" />
             <input placeholder="Price (Numeric)" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none" required />
             <input placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none" required />
             <select value={formData.propertyType} onChange={e => setFormData({...formData, propertyType: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none font-bold text-gray-600">
                <option value="">Select Type</option>
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
             </select>
             <input placeholder="Status" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none" />
          </div>
          <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none" rows="4"></textarea>
          <div className="flex justify-end pt-6">
             <button type="submit" disabled={uploading} className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center gap-3 disabled:opacity-50">
               <Save size={20} />
               {currentProp ? 'Save Changes' : 'Create Property'}
             </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PropertyManager;
