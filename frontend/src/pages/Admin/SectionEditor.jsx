import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { Save, Image as ImageIcon, Plus, Trash2, MapPin, DollarSign, BarChart3, Building, RefreshCcw } from 'lucide-react';

const SectionEditor = () => {
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data } = await API.get('/content');
      setSections(data);
      if (data.length > 0) handleSelectSection(data[0]);
    } catch (error) {
      toast.error('Failed to load sections');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSection = (section) => {
    setSelectedSection(section);
    setFormData({
      ...section,
      images: section.images || [],
      items: section.items || [],
      extraData: section.extraData || {}
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExtraDataChange = (field, value) => {
    setFormData({
      ...formData,
      extraData: { ...formData.extraData, [field]: value }
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setFormData({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    const newItem = selectedSection.name === 'faq' 
      ? { question: '', answer: '' } 
      : selectedSection.name === 'developer'
      ? { label: '', value: '', icon: 'Building2' }
      : selectedSection.name === 'township'
      ? { name: '', status: '', img: '' }
      : selectedSection.name === 'construction'
      ? { tower: '', status: '', img: '' }
      : { title: '', description: '', icon: '' };

    setFormData({
      ...formData,
      items: [...(formData.items || []), newItem]
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const handleImageUpload = async (e, type, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    setUploading(true);
    try {
      const { data } = await API.post('/properties/upload', uploadData);
      
      if (type === 'section') {
        const updatedImages = [...formData.images];
        if (index !== null) updatedImages[index] = data.url;
        else updatedImages.push(data.url);
        setFormData({ ...formData, images: updatedImages });
      } else if (type === 'item') {
        const updatedItems = [...formData.items];
        updatedItems[index] = { ...updatedItems[index], img: data.url };
        setFormData({ ...formData, items: updatedItems });
      }
      toast.success('Image uploaded');
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/content/${selectedSection.name}`, formData);
      toast.success('Section updated successfully');
      fetchSections();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-emerald-600 animate-pulse">Loading Content...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header & Tabs */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
             <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">Pixel-Perfect CMS</h1>
             <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Edit every pixel and context</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
             {sections.map(s => (
               <button
                 key={s._id}
                 onClick={() => handleSelectSection(s)}
                 className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${selectedSection?.name === s.name ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400 hover:bg-emerald-100 hover:text-emerald-700'}`}
               >
                 {s.name}
               </button>
             ))}
          </div>
        </div>
      </div>

      {selectedSection && (
        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
          
          {/* Basic Text Content */}
          <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-emerald-50 space-y-8">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <BarChart3 size={20} />
               </div>
               <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Contextual Text</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <div>
                     <label className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] block mb-2">Primary Title</label>
                     <input
                       type="text"
                       name="title"
                       value={formData.title || ''}
                       onChange={handleChange}
                       className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-800 transition-all shadow-sm"
                     />
                  </div>
                  {(selectedSection.name === 'hero' || selectedSection.name === 'amenities') && (
                    <div>
                       <label className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] block mb-2">Subtitle / Tagline</label>
                       <input
                         type="text"
                         name="subtitle"
                         value={formData.subtitle || ''}
                         onChange={handleChange}
                         className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-gray-800 transition-all shadow-sm"
                       />
                    </div>
                  )}
               </div>
               <div>
                  <label className="text-[10px] font-black text-emerald-700 uppercase tracking-[0.2em] block mb-2">Description Content</label>
                  <textarea
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium text-gray-700 transition-all shadow-sm leading-relaxed"
                  ></textarea>
               </div>
            </div>
          </div>

          {/* Section-Specific Extra Data (Pricing, Address for Hero) */}
          {selectedSection.name === 'hero' && (
            <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-emerald-50 space-y-8">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                     <DollarSign size={20} />
                  </div>
                  <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Hero Specific Data</h2>
               </div>

               <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">1 BHK Price</label>
                     <input value={formData.extraData?.price1Bhk || ''} onChange={(e) => handleExtraDataChange('price1Bhk', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm" />
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">1 BHK Striked</label>
                     <input value={formData.extraData?.strikedPrice1Bhk || ''} onChange={(e) => handleExtraDataChange('strikedPrice1Bhk', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm" />
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">2 BHK Price</label>
                     <input value={formData.extraData?.price2Bhk || ''} onChange={(e) => handleExtraDataChange('price2Bhk', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm" />
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">2 BHK Striked</label>
                     <input value={formData.extraData?.strikedPrice2Bhk || ''} onChange={(e) => handleExtraDataChange('strikedPrice2Bhk', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm" />
                  </div>
               </div>

               <div className="grid lg:grid-cols-2 gap-6 pt-4">
                  <div>
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Location Label</label>
                     <input value={formData.extraData?.locationLabel || ''} onChange={(e) => handleExtraDataChange('locationLabel', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm" />
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Full Address</label>
                     <textarea value={formData.extraData?.address || ''} onChange={(e) => handleExtraDataChange('address', e.target.value)} rows="2" className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm" />
                  </div>
               </div>
            </div>
          )}

          {/* FloorPlans Specific Data */}
          {selectedSection.name === 'floorplans' && (
            <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-emerald-50 space-y-8">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                     <Building size={20} />
                  </div>
                  <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">FloorPlans Configuration</h2>
               </div>
               <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Available Wings (Comma separated)</label>
                     <input 
                       value={formData.extraData?.wings?.join(', ') || ''} 
                       onChange={(e) => handleExtraDataChange('wings', e.target.value.split(',').map(s => s.trim()))} 
                       className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm" 
                     />
                  </div>
                  <div>
                     <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">BHK Options (Comma separated)</label>
                     <input 
                       value={formData.extraData?.bhks?.join(', ') || ''} 
                       onChange={(e) => handleExtraDataChange('bhks', e.target.value.split(',').map(s => s.trim()))} 
                       className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm" 
                     />
                  </div>
               </div>
               <p className="text-[10px] text-gray-400 font-bold uppercase italic">* Note: Detailed BHK pricing/area is currently managed via seed, advanced UI coming soon.</p>
            </div>
          )}

          {/* Video Tour Specific Data */}
          {selectedSection.name === 'video' && (
            <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-emerald-50 space-y-8">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                     <Play size={20} />
                  </div>
                  <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Video Configuration</h2>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">YouTube Embed URL</label>
                  <input 
                    value={formData.extraData?.videoUrl || ''} 
                    onChange={(e) => handleExtraDataChange('videoUrl', e.target.value)} 
                    placeholder="https://www.youtube.com/embed/..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl outline-none font-bold text-sm" 
                  />
                  <p className="mt-2 text-[10px] text-gray-400 font-bold uppercase italic">* Important: Use the 'Embed' URL from YouTube, not the browser URL.</p>
               </div>
            </div>
          )}

          {/* Section Images */}
          <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-emerald-50 space-y-8">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <ImageIcon size={20} />
               </div>
               <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Visual Media</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {formData.images?.map((img, idx) => (
                 <div key={idx} className="relative group rounded-[32px] overflow-hidden bg-gray-100 border-4 border-white shadow-xl aspect-video">
                    <img src={img} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <label className="bg-white p-3 rounded-full text-emerald-600 cursor-pointer shadow-lg hover:scale-110 transition-transform">
                          <ImageIcon size={20} />
                          <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'section', idx)} />
                       </label>
                       <button type="button" onClick={() => removeImage(idx)} className="bg-white p-3 rounded-full text-red-600 shadow-lg hover:scale-110 transition-transform">
                          <Trash2 size={20} />
                       </button>
                    </div>
                 </div>
               ))}
               <label className="flex flex-col items-center justify-center gap-2 border-4 border-dashed border-emerald-100 rounded-[32px] aspect-video cursor-pointer hover:bg-emerald-50 transition-colors">
                  <Plus className="text-emerald-400" size={32} />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Add New Image</span>
                  <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'section')} />
               </label>
            </div>
          </div>

          {/* List Items (Amenities, FAQ, stats, buildings, etc.) */}
          <div className="bg-white p-8 lg:p-12 rounded-[40px] shadow-xl border border-emerald-50 space-y-8">
            <div className="flex justify-between items-center mb-6">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                     <Plus size={20} />
                  </div>
                  <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">Structured Items</h2>
               </div>
               <button type="button" onClick={addItem} className="bg-emerald-600 text-white px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg active:scale-95">+ Add New Entry</button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               {formData.items?.map((item, index) => (
                 <div key={index} className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-100 relative group/item">
                    <button type="button" onClick={() => removeItem(index)} className="absolute -top-3 -right-3 w-8 h-8 bg-white text-red-400 rounded-full shadow-md flex items-center justify-center hover:text-red-600 opacity-0 group-hover/item:opacity-100 transition-opacity z-10">
                      <Trash2 size={16} />
                    </button>

                    <div className="space-y-4">
                       {selectedSection.name === 'faq' ? (
                         <>
                            <input placeholder="Question" value={item.question || ''} onChange={(e) => handleItemChange(index, 'question', e.target.value)} className="w-full bg-white px-5 py-3 rounded-xl border border-gray-100 outline-none font-bold text-sm" />
                            <textarea placeholder="Answer" value={item.answer || ''} onChange={(e) => handleItemChange(index, 'answer', e.target.value)} className="w-full bg-white px-5 py-3 rounded-xl border border-gray-100 outline-none font-medium text-xs leading-relaxed" />
                         </>
                       ) : selectedSection.name === 'developer' ? (
                         <div className="grid grid-cols-2 gap-4">
                            <input placeholder="Value (e.g. 6+)" value={item.value || ''} onChange={(e) => handleItemChange(index, 'value', e.target.value)} className="bg-white px-4 py-2 rounded-xl border border-gray-100 outline-none font-bold text-sm" />
                            <input placeholder="Label" value={item.label || ''} onChange={(e) => handleItemChange(index, 'label', e.target.value)} className="bg-white px-4 py-2 rounded-xl border border-gray-100 outline-none font-bold text-sm" />
                            <input placeholder="Icon (Lucide)" value={item.icon || ''} onChange={(e) => handleItemChange(index, 'icon', e.target.value)} className="col-span-2 bg-white px-4 py-2 rounded-xl border border-gray-100 outline-none font-bold text-sm text-emerald-600" />
                         </div>
                       ) : (selectedSection.name === 'township' || selectedSection.name === 'construction') ? (
                         <div className="flex gap-4">
                            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white border border-gray-100 flex-shrink-0 relative group/img">
                               <img src={item.img} className="w-full h-full object-cover" />
                               <label className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                                  <Plus size={20} />
                                  <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, 'item', index)} />
                               </label>
                            </div>
                            <div className="flex-1 space-y-2">
                               <input placeholder="Name / Tower" value={item.name || item.tower || ''} onChange={(e) => handleItemChange(index, selectedSection.name === 'township' ? 'name' : 'tower', e.target.value)} className="w-full bg-white px-4 py-2 rounded-xl border border-gray-100 outline-none font-bold text-sm" />
                               <input placeholder="Status" value={item.status || ''} onChange={(e) => handleItemChange(index, 'status', e.target.value)} className="w-full bg-white px-4 py-2 rounded-xl border border-gray-100 outline-none font-bold text-xs text-gray-500 uppercase tracking-widest" />
                            </div>
                         </div>
                       ) : (
                         <div className="grid grid-cols-2 gap-4">
                            <input placeholder="Item Title" value={item.title || ''} onChange={(e) => handleItemChange(index, 'title', e.target.value)} className="bg-white px-4 py-2 rounded-xl border border-gray-100 outline-none font-bold text-sm" />
                            <input placeholder="Icon Name" value={item.icon || ''} onChange={(e) => handleItemChange(index, 'icon', e.target.value)} className="bg-white px-4 py-2 rounded-xl border border-gray-100 outline-none font-bold text-sm text-emerald-600" />
                         </div>
                       )}
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Floating Save Button */}
          <div className="fixed bottom-10 right-10 z-[100]">
             <button
               type="submit"
               disabled={uploading}
               className="bg-emerald-600 text-white px-12 py-5 rounded-[32px] font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(5,150,105,0.3)] hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center gap-4 active:scale-95 disabled:bg-gray-400 disabled:shadow-none"
             >
               {uploading ? <RefreshCcw className="animate-spin" size={20} /> : <Save size={20} />}
               {uploading ? 'Processing Media...' : 'Commit Context Changes'}
             </button>
          </div>

        </form>
      )}
    </div>
  );
};

export default SectionEditor;
