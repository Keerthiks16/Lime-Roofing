import React, { useState, useEffect } from 'react';
import API from '../../api/axios';
import toast from 'react-hot-toast';
import { Mail, Phone, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Loader from '../../components/Loader';

const LeadViewer = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data } = await API.get('/leads');
      setLeads(data);
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/leads/${id}`, { status });
      toast.success(`Status updated to ${status}`);
      fetchLeads();
    } catch (error) {
      toast.error('Update failed');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
       <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-50">
          <h1 className="text-2xl font-black text-gray-800 uppercase tracking-tight">User Inquiries</h1>
          <p className="text-gray-500 text-sm font-medium">Manage and track potential client leads</p>
       </div>

       <div className="grid gap-6">
          {leads.length === 0 ? (
            <div className="bg-white py-20 rounded-3xl text-center text-gray-400 font-bold uppercase tracking-widest border border-dashed">
               No inquiries yet
            </div>
          ) : (
            leads.map(lead => (
              <div key={lead._id} className="bg-white p-8 rounded-3xl shadow-lg border border-emerald-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                 <div className="space-y-3">
                    <div className="flex items-center gap-4">
                       <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">{lead.name}</h3>
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${lead.status === 'New' ? 'bg-blue-100 text-blue-600' : lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                         {lead.status}
                       </span>
                    </div>
                    <div className="flex flex-wrap gap-6 text-sm text-gray-500 font-medium">
                       <div className="flex items-center gap-2"><Mail size={16} className="text-emerald-600" /> {lead.email}</div>
                       <div className="flex items-center gap-2"><Phone size={16} className="text-emerald-600" /> {lead.phone}</div>
                       <div className="flex items-center gap-2"><Clock size={16} className="text-emerald-600" /> {new Date(lead.createdAt).toLocaleDateString()}</div>
                    </div>
                    {lead.message && (
                      <p className="bg-gray-50 p-4 rounded-xl text-gray-600 italic border-l-4 border-emerald-500">"{lead.message}"</p>
                    )}
                 </div>
                 <div className="flex gap-2">
                    {lead.status === 'New' && (
                      <button onClick={() => updateStatus(lead._id, 'Contacted')} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-2">
                         <AlertCircle size={14} /> Mark Contacted
                      </button>
                    )}
                    {lead.status !== 'Closed' && (
                      <button onClick={() => updateStatus(lead._id, 'Closed')} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2">
                         <CheckCircle size={14} /> Close Lead
                      </button>
                    )}
                 </div>
              </div>
            ))
          )}
       </div>
    </div>
  );
};

export default LeadViewer;
