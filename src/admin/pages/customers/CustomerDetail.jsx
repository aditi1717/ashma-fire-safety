import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { User, Briefcase, Eye, ChevronLeft, Phone, Mail, MapPin } from 'lucide-react';

const CustomerDetail = () => {
    const { customerId } = useParams();
    const [customer, setCustomer] = useState(null);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const customers = storage.getCustomers();
        const found = customers.find(c => c.id === customerId);
        setCustomer(found);

        const allProjects = storage.getProjects();
        const customerProjects = allProjects.filter(p => p.customerId === customerId);
        setProjects(customerProjects);
    }, [customerId]);

    if (!customer) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-6 px-2 pb-10">
            {/* Breadcrumb / Back Link */}
            <div className="flex items-center gap-2">
                <Link to="/customers" className="group flex items-center gap-1 text-slate-500 hover:text-primary font-bold text-sm transition-colors">
                    <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                    Back to Customers
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Customer Info Card */}
                <div className="lg:col-span-4 lg:sticky lg:top-6 h-fit">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-primary p-8 flex flex-col items-center">
                            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-4 border border-white/20">
                                <User size={40} />
                            </div>
                            <h2 className="text-xl font-bold text-white text-center">{customer.name}</h2>
                            <span className="mt-2 px-3 py-1 bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/10">
                                Prime Customer
                            </span>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-slate-50 rounded-lg text-primary border border-slate-100 italic">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Contact Number</p>
                                    <p className="text-slate-700 font-bold">{customer.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-slate-50 rounded-lg text-primary border border-slate-100">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Email Address</p>
                                    <p className="text-slate-700 font-bold break-all">{customer.email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2.5 bg-slate-50 rounded-lg text-primary border border-slate-100">
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Business Address</p>
                                    <p className="text-slate-700 font-medium text-sm leading-relaxed">{customer.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Projects List */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Briefcase size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800 tracking-tight">Assigned Projects</h2>
                            </div>
                            <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                {projects.length} Total
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100 font-bold text-[11px] text-slate-400 uppercase tracking-wider">
                                        <th className="px-6 py-4">Project Information</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Balance</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {projects.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-slate-700">{p.name}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">₹{p.totalAmount.toLocaleString()} Total Budget</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`text-[10px] font-bold uppercase tracking-[0.05em] px-2 py-1 rounded-md border ${p.remainingAmount <= 0
                                                        ? 'bg-green-50 text-green-600 border-green-100'
                                                        : 'bg-amber-50 text-amber-600 border-amber-100'
                                                    }`}>
                                                    {p.remainingAmount <= 0 ? 'Completed' : 'Active'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <div className={`font-bold tabular-nums ${p.remainingAmount > 0 ? 'text-red-500' : 'text-green-600'}`}>
                                                    ₹{p.remainingAmount.toLocaleString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <Link
                                                    to={`/projects/${p.id}`}
                                                    className="inline-flex items-center gap-1.5 text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg border border-slate-200 font-bold text-xs transition-all"
                                                >
                                                    <Eye size={12} /> View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                    {projects.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium italic">
                                                No projects assigned for this customer yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerDetail;
