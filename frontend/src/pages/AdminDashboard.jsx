import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { LayoutDashboard, Home, FileText, Users, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SectionEditor from './Admin/SectionEditor';
import PropertyManager from './Admin/PropertyManager';
import LeadViewer from './Admin/LeadViewer';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sections');

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navItems = [
    { id: 'sections', name: 'Sections', icon: FileText, path: 'sections' },
    { id: 'properties', name: 'Properties', icon: Home, path: 'properties' },
    { id: 'leads', name: 'Leads', icon: Users, path: 'leads' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col fixed h-full h-full">
        <div className="p-8 border-b">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-black text-gray-800 tracking-tight">ADMIN PANEL</span>
           </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={`/admin/${item.path}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm uppercase tracking-wide ${activeTab === item.id ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'}`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
           <button
             onClick={handleLogout}
             className="flex items-center gap-3 w-full px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 transition-all font-bold text-sm uppercase tracking-wide"
           >
             <LogOut size={20} />
             Logout
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="sections" />} />
          <Route path="sections" element={<SectionEditor />} />
          <Route path="properties" element={<PropertyManager />} />
          <Route path="leads" element={<LeadViewer />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
