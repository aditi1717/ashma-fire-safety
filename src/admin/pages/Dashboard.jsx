import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import {
    Users,
    Briefcase,
    IndianRupee,
    Wallet
} from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        customers: 0,
        projects: 0,
        totalRevenue: 0,
        totalPending: 0
    });

    useEffect(() => {
        const customers = storage.getCustomers();
        const projects = storage.getProjects();

        const revenue = projects.reduce((acc, p) => acc + (p.totalPaid || 0), 0);
        const pending = projects.reduce((acc, p) => acc + (p.remainingAmount || 0), 0);

        setStats({
            customers: customers.length,
            projects: projects.length,
            totalRevenue: revenue,
            totalPending: pending
        });
    }, []);

    const statCards = [
        { title: 'Total Customers', value: stats.customers, icon: <Users size={24} /> },
        { title: 'Total Projects', value: stats.projects, icon: <Briefcase size={24} /> },
        { title: 'Received Amount', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <IndianRupee size={24} /> },
        { title: 'Pending Amount', value: `₹${stats.totalPending.toLocaleString()}`, icon: <Wallet size={24} /> },
    ];

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="pb-5 border-b border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
                <p className="text-sm text-slate-500">Welcome to Ashma Fire Safety management portal.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                {statCards.map((card, i) => (
                    <div key={i} className="bg-white p-3 md:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden">
                        <div className="z-10 relative">
                            <p className="text-[10px] md:text-sm font-semibold text-slate-400 uppercase tracking-wider mb-0.5 md:mb-1 truncate">{card.title}</p>
                            <h3 className="text-lg md:text-2xl font-bold text-slate-800 tracking-tight">{card.value}</h3>
                        </div>
                        <div className="p-2 md:p-3 rounded-lg text-primary bg-primary/10">
                            {card.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-8 rounded-xl border border-slate-200 min-h-[250px] flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                        <Users size={32} />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-700">Quick Actions</h4>
                    <p className="text-sm text-slate-400 mt-1 max-w-xs">Start by adding a new customer or checking project progress in the sidebar.</p>
                </div>

                <div className="bg-white p-8 rounded-xl border border-slate-200 min-h-[250px] flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                        <Briefcase size={32} />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-700">Project Stats</h4>
                    <p className="text-sm text-slate-400 mt-1 max-w-xs">Review your installment plans and pending payments from the project details.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
