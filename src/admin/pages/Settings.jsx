import { Bell, Lock, Globe, Moon, Shield } from 'lucide-react';

const Settings = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">System Settings</h1>
                <p className="text-slate-400 font-bold text-xs mt-1">Configure application preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* General Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:col-span-2 space-y-6">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Globe size={20} className="text-primary" />
                        General Preferences
                    </h3>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div>
                                <p className="font-bold text-slate-700 text-sm">Dark Mode</p>
                                <p className="text-xs text-slate-400 font-medium">Switch between light and dark themes</p>
                            </div>
                            <button className="w-12 h-6 bg-slate-200 rounded-full relative">
                                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div>
                                <p className="font-bold text-slate-700 text-sm">Email Notifications</p>
                                <p className="text-xs text-slate-400 font-medium">Receive daily summaries</p>
                            </div>
                            <button className="w-12 h-6 bg-primary rounded-full relative">
                                <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Account Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <Shield size={20} className="text-primary" />
                        Toogle Security
                    </h3>
                    <div className="space-y-2">
                        <button className="w-full p-3 text-left rounded-xl hover:bg-slate-50 font-bold text-sm text-slate-600 flex items-center gap-3 transition-colors">
                            <Lock size={16} /> Change Password
                        </button>
                        <button className="w-full p-3 text-left rounded-xl hover:bg-slate-50 font-bold text-sm text-slate-600 flex items-center gap-3 transition-colors">
                            <Bell size={16} /> Notification Rules
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
