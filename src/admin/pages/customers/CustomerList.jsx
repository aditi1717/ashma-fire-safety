import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { storage } from '../../utils/storage';
import { UserPlus, Eye, Search } from 'lucide-react'; // Removed X

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const data = storage.getCustomers();
        setCustomers([...data].sort((a, b) => b.id.localeCompare(a.id)));
    }, []);

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm)
    );

    return (
        <div className="space-y-6 px-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Customers</h1>
                    <p className="text-sm text-slate-500 font-medium">Manage your client base and their details.</p>
                </div>
                <Link
                    to="/customers/new"
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-md active:scale-95"
                >
                    <UserPlus size={18} /> Add Customer
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                    <Search size={18} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name or phone..."
                        className="bg-transparent border-none outline-none text-slate-700 w-full font-medium placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredCustomers.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-slate-700">{c.name}</div>
                                        <div className="text-[10px] text-slate-400 font-medium">ID: #{c.id.slice(-6)}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{c.phone}</td>
                                    <td className="px-6 py-4 text-slate-500 text-sm">{c.email}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Link
                                            to={`/customers/${c.id}`}
                                            className="inline-flex items-center gap-2 text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg border border-slate-200 font-bold text-sm transition-all"
                                        >
                                            <Eye size={14} /> View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {filteredCustomers.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium italic">
                                        No customers found.
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

export default CustomerList;
