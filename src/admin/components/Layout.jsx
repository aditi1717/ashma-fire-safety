import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, Briefcase, LogOut, Flame, Search, Bell, Settings, ChevronDown, Menu } from 'lucide-react';
import Profile from '../pages/Profile';

const Layout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/customers', label: 'Customers', icon: Users },
        { path: '/projects', label: 'Projects', icon: Briefcase },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Mobile Sidebar Overlay */}
            {isMobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-primary-dark text-white fixed h-full flex flex-col shadow-2xl z-40 transition-transform duration-300 transform md:translate-x-0 ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-5 flex flex-col items-center gap-2 bg-white/5 border-b border-white/10">
                    <Flame className="text-red-500 fill-red-500 animate-pulse" size={32} />
                    <div className="text-center">
                        <h2 className="text-xl font-black tracking-widest uppercase italic leading-none">
                            Ashma
                        </h2>
                        <p className="text-[10px] font-black tracking-[0.3em] text-red-500 uppercase mt-1">
                            Fire Safety
                        </p>
                    </div>
                </div>

                <nav className="flex-grow py-8 px-4 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsMobileSidebarOpen(false)}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm tracking-wide ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 translate-x-1'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                                    }`}
                            >
                                <Icon size={18} className={isActive ? 'animate-bounce-subtle' : ''} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={() => { handleLogout(); setIsMobileSidebarOpen(false); }}
                        className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 font-bold text-sm"
                    >
                        <LogOut size={18} />
                        Logout System
                    </button>
                </div>
            </aside>

            {/* Content Wrapper */}
            <div className="md:ml-64 flex-grow flex flex-col min-h-screen transition-all duration-300">
                {/* Top Header */}
                <header className="bg-primary-dark h-16 border-b border-white/10 px-4 md:px-10 flex items-center justify-between sticky top-0 z-10 shadow-xl">
                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileSidebarOpen(true)}
                            className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Dashboard Title */}
                        <div>
                            <h2 className="text-lg font-black text-white tracking-tight">Admin Dashboard</h2>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Overview & Management</p>
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/settings')}
                            className="p-2 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 active:scale-95 hidden sm:block"
                        >
                            <Settings size={18} />
                        </button>

                        <button className="relative p-2 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition-all duration-200 active:scale-95">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-primary-dark"></span>
                        </button>

                        <div className="h-6 w-px bg-white/10 mx-1 hidden sm:block"></div>

                        <button
                            onClick={() => setIsProfileOpen(true)}
                            className="flex items-center gap-3 pl-1 pr-1.5 py-1 rounded-full group cursor-pointer hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/5"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-black/20 ring-2 ring-white/10 group-hover:ring-white/20 transition-all">
                                {user?.email?.[0].toUpperCase() || 'A'}
                            </div>
                            <div className="text-left hidden md:block">
                                <p className="text-xs font-bold text-slate-200 group-hover:text-white transition-colors leading-none mb-0.5">{user?.email?.split('@')[0] || 'Admin'}</p>
                                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none">Administrator</p>
                            </div>
                            <ChevronDown size={14} className="text-slate-500 group-hover:text-white transition-colors ml-1 hidden md:block" />
                        </button>
                    </div>
                </header>

                <main className="p-4 md:p-10 flex-grow">
                    {children}
                </main>
            </div>

            {/* Profile Drawer */}
            {isProfileOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsProfileOpen(false)}></div>
                    <div className="relative w-full max-w-sm bg-slate-900 shadow-2xl h-full animate-in slide-in-from-right duration-300">
                        <Profile onClose={() => setIsProfileOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;
