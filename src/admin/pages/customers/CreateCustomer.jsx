import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage';
import { User, Mail, Phone, MapPin, ArrowLeft, UserPlus } from 'lucide-react';

const CreateCustomer = () => {
    const navigate = useNavigate();
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        storage.saveCustomer(newCustomer);
        navigate('/customers');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/customers')}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create New Customer</h1>
                    <p className="text-sm text-slate-500 font-medium">Add a new client to your database.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 mt-8">
                <div className="space-y-2">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
                        <UserPlus size={20} className="text-primary" /> Customer Information
                    </h2>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <User size={18} className="text-slate-400" />
                        </div>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Aditi Parihar"
                            className="w-full h-12 bg-white border border-slate-300 rounded-xl pl-11 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 font-medium"
                            value={newCustomer.name}
                            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Phone size={18} className="text-slate-400" />
                            </div>
                            <input
                                type="text"
                                required
                                placeholder="e.g. +91 98765 43210"
                                className="w-full h-12 bg-white border border-slate-300 rounded-xl pl-11 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 font-medium"
                                value={newCustomer.phone}
                                onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail size={18} className="text-slate-400" />
                            </div>
                            <input
                                type="email"
                                required
                                placeholder="e.g. aditi@example.com"
                                className="w-full h-12 bg-white border border-slate-300 rounded-xl pl-11 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 font-medium"
                                value={newCustomer.email}
                                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Address</label>
                    <div className="relative">
                        <div className="absolute top-3 left-4 pointer-events-none">
                            <MapPin size={18} className="text-slate-400" />
                        </div>
                        <textarea
                            required
                            placeholder="Enter full address details..."
                            className="w-full bg-white border border-slate-300 rounded-xl pl-11 pr-4 py-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 font-medium min-h-[120px]"
                            value={newCustomer.address}
                            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={() => navigate('/customers')}
                        className="h-14 px-8 rounded-xl font-bold text-slate-500 hover:bg-slate-50 border border-slate-200 transition-all text-sm uppercase tracking-widest"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-grow h-14 rounded-xl font-bold bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/30 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest"
                    >
                        Create Customer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCustomer;
