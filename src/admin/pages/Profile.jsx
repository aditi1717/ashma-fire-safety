import { useState, useEffect } from 'react';
import { User, Mail, Phone, Shield, Pencil, Save, X, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Profile = ({ onClose }) => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || user.email?.split('@')[0] || 'Admin User',
                phone: user.phone || '+91 98765 43210',
                email: user.email || '',
                role: user.role || 'Administrator'
            });
        }
    }, [user]);

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: user.name || user.email?.split('@')[0] || 'Admin User',
            phone: user.phone || '+91 98765 43210',
            email: user.email || '',
            role: user.role || 'Administrator'
        });
        setIsEditing(false);
    };

    return (
        <div className="h-full flex flex-col bg-slate-900 text-slate-200">
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
                <h2 className="text-lg font-bold text-white tracking-wide">Profile</h2>
                {onClose && (
                    <button onClick={onClose} className="p-2 -mr-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className="flex-grow overflow-y-auto relative custom-scrollbar">
                {/* Minimal Header Background */}
                <div className="h-32 bg-white/5 border-b border-white/5"></div>

                {/* Avatar (Centered & Overlapping) */}
                <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-28 h-28 rounded-full bg-primary text-white border-[6px] border-slate-900 shadow-xl flex items-center justify-center text-4xl font-bold select-none pointer-events-none">
                        {formData.name?.[0]?.toUpperCase() || 'A'}
                    </div>
                    {isEditing && (
                        <button className="absolute bottom-1 right-1 bg-slate-800 text-white p-2 rounded-full shadow-lg border border-slate-700 hover:bg-slate-700 transition-colors z-10">
                            <Camera size={16} />
                        </button>
                    )}
                </div>

                {/* Main Content */}
                <div className="pt-16 pb-10 px-8">
                    {/* Name & Role Section */}
                    <div className="text-center space-y-1 mb-8">
                        {isEditing ? (
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="text-xl font-bold text-white text-center border-b border-white/20 outline-none pb-1 w-full bg-transparent focus:border-primary transition-colors placeholder:text-slate-600"
                                placeholder="Name"
                            />
                        ) : (
                            <h1 className="text-xl font-bold text-white tracking-wide">{formData.name}</h1>
                        )}
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{formData.role}</p>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center mb-10">
                        {isEditing ? (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="px-5 py-2 rounded-xl text-slate-400 font-semibold text-xs hover:bg-white/5 hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-6 py-2 rounded-xl bg-primary text-white font-semibold text-xs shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95 flex items-center gap-2"
                                >
                                    <Save size={14} /> Save Changes
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2.5 rounded-full border border-white/10 text-slate-300 font-semibold text-xs hover:bg-white/5 hover:text-white hover:border-white/20 transition-all active:scale-95 flex items-center gap-2"
                            >
                                <Pencil size={14} /> Edit Profile
                            </button>
                        )}
                    </div>

                    {/* Details List */}
                    <div className="space-y-6">
                        {/* Email */}
                        <div className="flex items-start gap-5 group">
                            <div className="w-10 h-10 rounded-2xl bg-white/5 flex-shrink-0 flex items-center justify-center text-slate-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
                                <Mail size={18} />
                            </div>
                            <div className="flex-grow pt-1.5">
                                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</p>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full font-medium text-white border-b border-white/20 outline-none focus:border-primary py-0.5 bg-transparent placeholder:text-slate-600"
                                    />
                                ) : (
                                    <p className="font-medium text-slate-200 text-sm">{formData.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-5 group">
                            <div className="w-10 h-10 rounded-2xl bg-white/5 flex-shrink-0 flex items-center justify-center text-slate-400 group-hover:bg-white/10 group-hover:text-white transition-colors">
                                <Phone size={18} />
                            </div>
                            <div className="flex-grow pt-1.5">
                                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone Number</p>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full font-medium text-white border-b border-white/20 outline-none focus:border-primary py-0.5 bg-transparent placeholder:text-slate-600"
                                    />
                                ) : (
                                    <p className="font-medium text-slate-200 text-sm">{formData.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Role */}
                        <div className="flex items-start gap-5 opacity-60">
                            <div className="w-10 h-10 rounded-2xl bg-white/5 flex-shrink-0 flex items-center justify-center text-slate-500">
                                <Shield size={18} />
                            </div>
                            <div className="flex-grow pt-1.5">
                                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Role / Permissions</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                                    <p className="font-medium text-slate-400 text-sm">{formData.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
