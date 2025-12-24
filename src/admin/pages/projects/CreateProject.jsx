import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../utils/storage'; // Adjust based on actual path
import { Briefcase, Wallet, IndianRupee, ArrowLeft } from 'lucide-react';

const CreateProject = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [hasAdvance, setHasAdvance] = useState(false);
    const [newProject, setNewProject] = useState({
        name: '',
        customerId: '',
        totalAmount: '',
        advanceAmount: '',
        paymentMode: 'Cash',
        account: '',
        accountNumber: '',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        setCustomers(storage.getCustomers());
    }, []);

    const ACCOUNTS = {
        'Ashma Account 1': '50100456892341 (HDFC)',
        'SBI Main Branch': '32009871234',
        'HDFC Current': '50200003451234',
        'Company UPI ID': 'ashma@okaxis'
    };

    const handleAccountChange = (e) => {
        const selectedAccount = e.target.value;
        setNewProject({
            ...newProject,
            account: selectedAccount,
            accountNumber: ACCOUNTS[selectedAccount] || ''
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare project data
        const projectData = {
            name: newProject.name,
            customerId: newProject.customerId,
            totalAmount: newProject.totalAmount,
            payments: []
        };

        // If advance payment is provided, add it to history
        if (hasAdvance && parseFloat(newProject.advanceAmount) > 0) {
            let finalAccount = '--';
            if (newProject.paymentMode === 'Online') {
                finalAccount = newProject.account;
                if (newProject.accountNumber) {
                    finalAccount += ` (${newProject.accountNumber})`;
                }
            }

            projectData.payments.push({
                id: Date.now().toString(),
                amount: parseFloat(newProject.advanceAmount),
                mode: newProject.paymentMode,
                account: finalAccount,
                date: newProject.date,
                isAdvance: true
            });
        }

        storage.saveProject(projectData);
        navigate('/projects');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/projects')}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create New Project</h1>
                    <p className="text-sm text-slate-500 font-medium">Add a new project and assign it to a customer.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 mt-8">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 border-b border-slate-200 pb-2">
                    <Briefcase size={20} className="text-primary" /> Project Details
                </h2>
                {/* Base Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Project Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Fire Alarm System"
                            className="w-full h-12 bg-white border border-slate-300 rounded-xl px-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 font-medium"
                            value={newProject.name}
                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Assign Customer</label>
                        <select
                            required
                            className="w-full h-12 bg-white border border-slate-300 rounded-xl px-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-700 font-medium"
                            value={newProject.customerId}
                            onChange={(e) => setNewProject({ ...newProject, customerId: e.target.value })}
                        >
                            <option value="">-- Choose Client --</option>
                            {customers.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Total Project Budget</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-slate-400 font-bold">₹</span>
                        </div>
                        <input
                            type="number"
                            required
                            placeholder="0.00"
                            className="w-full h-14 bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 outline-none focus:border-primary focus:bg-white transition-all text-slate-800 font-black text-xl tabular-nums"
                            value={newProject.totalAmount}
                            onChange={(e) => setNewProject({ ...newProject, totalAmount: e.target.value })}
                        />
                    </div>
                </div>

                {/* Advance Payment Toggle */}
                <div className="pt-2">
                    <label className="flex items-center gap-4 cursor-pointer group p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-primary/30 transition-all shadow-sm">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${hasAdvance ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}>
                            {hasAdvance && <ArrowLeft className="rotate-[-135deg] text-white" size={14} strokeWidth={4} />}
                        </div>
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={hasAdvance}
                            onChange={(e) => setHasAdvance(e.target.checked)}
                        />
                        <div className="flex-grow">
                            <p className="font-bold text-slate-700">Add Advance Payment</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">Record initial deposit received from the client</p>
                        </div>
                        <Wallet size={24} className={hasAdvance ? 'text-primary' : 'text-slate-300'} />
                    </label>
                </div>

                {/* Advance Payment Details */}
                {hasAdvance && (
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-in slide-in-from-top-4 duration-300 space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-1.5 h-6 bg-primary rounded-full"></div>
                            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">Payment Record</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Advance Amount (₹)</label>
                                <input
                                    type="number"
                                    required={hasAdvance}
                                    max={newProject.totalAmount}
                                    placeholder="0.00"
                                    className="w-full h-12 bg-white border border-slate-300 rounded-xl px-4 outline-none focus:border-primary transition-all font-bold text-primary tabular-nums text-lg"
                                    value={newProject.advanceAmount}
                                    onChange={(e) => setNewProject({ ...newProject, advanceAmount: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Receipt Date</label>
                                <input
                                    type="date"
                                    required={hasAdvance}
                                    className="w-full h-12 bg-white border border-slate-300 rounded-xl px-4 outline-none focus:border-primary transition-all font-bold text-slate-700"
                                    value={newProject.date}
                                    onChange={(e) => setNewProject({ ...newProject, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Payment Channel</label>
                                <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200">
                                    {['Cash', 'Online'].map(mode => (
                                        <button
                                            key={mode}
                                            type="button"
                                            onClick={() => setNewProject({ ...newProject, paymentMode: mode })}
                                            className={`flex-1 h-10 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${newProject.paymentMode === mode
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                        >
                                            {mode}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {newProject.paymentMode === 'Online' && (
                                <div className="space-y-2 animate-in fade-in duration-300">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Deposit Account</label>
                                    <div className="grid grid-cols-1 gap-3">
                                        <select
                                            className="w-full h-12 bg-white border border-slate-300 rounded-xl px-4 outline-none focus:border-primary transition-all font-bold text-slate-700"
                                            value={newProject.account}
                                            onChange={handleAccountChange}
                                        >
                                            <option value="">-- Select Bank --</option>
                                            {Object.keys(ACCOUNTS).map(acc => (
                                                <option key={acc} value={acc}>{acc}</option>
                                            ))}
                                            <option value="Other">Other</option>
                                        </select>

                                        <input
                                            type="text"
                                            placeholder="Enter Account Number"
                                            className="w-full h-12 bg-white border border-slate-300 rounded-xl px-4 outline-none focus:border-primary transition-all font-mono text-sm text-slate-700"
                                            value={newProject.accountNumber}
                                            onChange={(e) => setNewProject({ ...newProject, accountNumber: e.target.value })}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <button
                        type="button"
                        onClick={() => navigate('/projects')}
                        className="h-14 px-8 rounded-xl font-bold text-slate-500 hover:bg-slate-50 border border-slate-200 transition-all text-sm uppercase tracking-widest"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex-grow h-14 rounded-xl font-bold bg-primary text-white shadow-xl shadow-primary/20 hover:bg-primary-dark hover:shadow-primary/30 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-widest"
                    >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProject;
