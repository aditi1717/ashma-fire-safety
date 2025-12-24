import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { Eye, PlusCircle } from 'lucide-react';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        setProjects(storage.getProjects());
        setCustomers(storage.getCustomers());
    }, []);

    const getCustomerName = (id) => {
        const c = customers.find(cust => cust.id === id);
        return c ? c.name : 'Unknown';
    };

    return (
        <div className="space-y-6 px-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Project Management</h1>
                    <p className="text-sm text-slate-500 font-medium">Handle installations, budgets, and advanced payments.</p>
                </div>
                <Link
                    to="/projects/new"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95"
                >
                    <PlusCircle size={18} /> New Project
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Project Identity</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Client</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Financial Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {projects.map((p) => {
                                const isPaid = p.remainingAmount <= 0;
                                return (
                                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-slate-700">{p.name}</td>
                                        <td className="px-6 py-4 text-slate-600 font-medium text-sm italic">{getCustomerName(p.customerId)}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-slate-800">₹{parseFloat(p.totalAmount).toLocaleString()}</div>
                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                <div className={`w-1.5 h-1.5 rounded-full ${isPaid ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
                                                <span className={`text-[10px] font-bold uppercase ${isPaid ? 'text-green-600' : 'text-amber-600'}`}>
                                                    {isPaid ? 'Settled' : `₹${p.remainingAmount.toLocaleString()} Pending`}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                to={`/projects/${p.id}`}
                                                className="inline-flex items-center gap-1.5 text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg border border-slate-200 font-bold text-sm transition-all"
                                            >
                                                <Eye size={14} /> View Details
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium italic">
                                        No project history found. Start by creating a project.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
