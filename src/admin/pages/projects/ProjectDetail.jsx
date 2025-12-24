import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { storage } from '../../utils/storage';
import {
    Briefcase,
    User,
    IndianRupee,
    Plus,
    ChevronLeft,
    Phone,
    Mail,
    MapPin,
    Calendar,
    CreditCard,
    CheckCircle2,
    X,
    History
} from 'lucide-react';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [payment, setPayment] = useState({
        amount: '',
        mode: 'Cash',
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        const projects = storage.getProjects();
        const found = projects.find(p => p.id === projectId);
        setProject(found);

        if (found) {
            const customers = storage.getCustomers();
            const cust = customers.find(c => c.id === found.customerId);
            setCustomer(cust);
        }
    }, [projectId]);

    const ACCOUNTS = {
        'Ashma Account 1': '50100456892341 (HDFC)',
        'SBI Main Branch': '32009871234',
        'HDFC Current': '50200003451234',
        'Company UPI ID': 'ashma@okaxis'
    };

    const handleAccountChange = (e) => {
        const selectedAccount = e.target.value;
        setPayment({
            ...payment,
            account: selectedAccount,
            accountNumber: ACCOUNTS[selectedAccount] || ''
        });
    };

    const handleAddPayment = (e) => {
        e.preventDefault();
        const amount = parseFloat(payment.amount);

        let finalAccount = '--';
        if (payment.mode === 'Online') {
            finalAccount = payment.account;
            if (payment.accountNumber) {
                finalAccount += ` (${payment.accountNumber})`;
            }
        }

        const updatedProject = { ...project };
        updatedProject.payments.push({
            id: Date.now().toString(),
            amount: amount,
            mode: payment.mode,
            account: finalAccount,
            date: payment.date,
            isAdvance: false // Explicitly false for new payments
        });

        updatedProject.totalPaid = updatedProject.payments.reduce((acc, p) => acc + p.amount, 0);
        updatedProject.remainingAmount = parseFloat(updatedProject.totalAmount) - updatedProject.totalPaid;

        storage.updateProject(updatedProject);
        setProject(updatedProject);
        setShowPaymentModal(false);
        setPayment({
            amount: '',
            mode: 'Cash',
            account: '',
            accountNumber: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    if (!project) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const progress = Math.round((project.totalPaid / project.totalAmount) * 100);

    return (
        <div className="space-y-6 px-2 pb-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2">
                <Link to="/projects" className="group flex items-center gap-1 text-slate-500 hover:text-primary font-bold text-sm transition-colors">
                    <ChevronLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                    Back to Projects
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* Main Content: Project Info */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-6 pb-6 border-b border-slate-50 bg-white relative">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative">
                                <div className="space-y-2">
                                    <div className="inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-wider">
                                        <Briefcase size={14} />
                                        Project Details
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">{project.name}</h1>
                                        <p className="text-slate-400 font-medium text-xs mt-0.5">ID: #{project.id.slice(-6)}</p>
                                    </div>
                                </div>

                                <div className="bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl text-right min-w-[180px]">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                        Total Budget
                                    </p>
                                    <div className="text-2xl font-bold text-slate-800 tracking-tight">
                                        <span className="text-base text-slate-400 font-medium mr-1">₹</span>
                                        {parseFloat(project.totalAmount).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            {/* Progress Section */}
                            <div className="mt-6 space-y-3">
                                <div className="flex justify-between items-end px-0.5">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${project.remainingAmount <= 0 ? 'bg-emerald-500' : 'bg-primary animate-pulse'}`}></div>
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Progress</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">
                                        {progress}% <span className="text-slate-400 font-medium ml-1">Paid</span>
                                    </span>
                                </div>
                                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ease-out relative ${progress >= 100 ? 'bg-emerald-500' : 'bg-primary'
                                            }`}
                                        style={{ width: `${progress}%` }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50/10">
                            <div className="p-5 text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Collected</p>
                                <p className="text-xl font-bold text-emerald-600">
                                    <span className="text-sm text-emerald-600/60 font-medium mr-1">₹</span>
                                    {project.totalPaid.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-5 text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Outstanding</p>
                                <p className="text-xl font-bold text-rose-500">
                                    <span className="text-sm text-rose-500/60 font-medium mr-1">₹</span>
                                    {project.remainingAmount.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-5 text-center">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status</p>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${project.remainingAmount <= 0
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-amber-100 text-amber-700'
                                    }`}>
                                    {project.remainingAmount <= 0 ? 'Fully Settled' : 'Payment Due'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Payment History Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                                    <History size={18} />
                                </div>
                                <h2 className="text-lg font-bold text-slate-800 tracking-tight">Payment Ledger</h2>
                            </div>
                            <button
                                onClick={() => setShowPaymentModal(true)}
                                disabled={project.remainingAmount <= 0}
                                className="flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-slate-200 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-md active:scale-95"
                            >
                                <Plus size={14} /> Add Payment
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100 font-bold text-[11px] text-slate-400 uppercase tracking-wider">
                                        <th className="px-6 py-4">Transaction Date</th>
                                        <th className="px-6 py-4 text-center">Payment Mode</th>
                                        <th className="px-6 py-4">Deposit Account</th>
                                        <th className="px-6 py-4 text-right">Amount Received</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {[...project.payments].reverse().map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 font-semibold text-slate-700">
                                                    <Calendar size={14} className="text-slate-300" />
                                                    {p.date}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">
                                                    {p.mode}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-500">
                                                {p.account || '--'}
                                            </td>
                                            <td className="px-6 py-4 text-right font-bold text-slate-800 tabular-nums">
                                                ₹{p.amount.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {project.payments.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium italic">
                                                No payments recorded yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Customer Info */}
                <div className="lg:col-span-4 space-y-6 h-fit">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                                <User size={16} />
                                Client Information
                            </div>
                        </div>

                        {customer && (
                            <div className="p-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">{customer.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Client</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Phone size={16} className="text-slate-300" />
                                        <span className="text-sm font-medium text-slate-600">{customer.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail size={16} className="text-slate-300" />
                                        <span className="text-sm font-medium text-slate-600 truncate">{customer.email}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin size={16} className="text-slate-300 mt-1" />
                                        <span className="text-sm font-medium text-slate-600 leading-snug">{customer.address}</span>
                                    </div>
                                </div>

                                <Link
                                    to={`/customers/${customer.id}`}
                                    className="block w-full text-center py-3 bg-slate-50 hover:bg-slate-100 text-primary font-bold text-xs uppercase tracking-wider rounded-lg transition-all border border-slate-200"
                                >
                                    View Client Profile
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Quick Notice Card */}
                    <div className="bg-primary-dark p-6 rounded-2xl text-white">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-green-400" />
                            Verified Data
                        </h4>
                        <p className="text-xs text-white/60 leading-relaxed font-medium">
                            This project is currently active within the Ashma Fire Safety Management system. All calculations are real-time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Payment Entry Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowPaymentModal(false)}></div>
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl z-10 overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                <IndianRupee size={20} className="text-primary" /> Record Payment
                            </h2>
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddPayment} className="p-6 space-y-6">
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Payment Amount</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                                            <input
                                                type="number"
                                                required
                                                autoFocus
                                                max={project.remainingAmount}
                                                placeholder="0.00"
                                                className="w-full h-11 bg-white border border-slate-300 rounded-lg pl-8 pr-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-700"
                                                value={payment.amount}
                                                onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Receipt Date</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full h-11 bg-white border border-slate-300 rounded-lg px-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-semibold text-slate-700"
                                            value={payment.date}
                                            onChange={(e) => setPayment({ ...payment, date: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Payment Channel</label>
                                    <div className="flex gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
                                        {['Cash', 'Online'].map(mode => (
                                            <button
                                                key={mode}
                                                type="button"
                                                onClick={() => setPayment({ ...payment, mode })}
                                                className={`flex-1 h-10 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${payment.mode === mode
                                                    ? 'bg-white text-primary shadow-sm border border-slate-100'
                                                    : 'text-slate-400 hover:text-slate-600'
                                                    }`}
                                            >
                                                {mode}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {payment.mode === 'Online' && (
                                    <div className="space-y-3 animate-in fade-in duration-300">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Deposit Account</label>
                                            <div className="grid grid-cols-1 gap-3">
                                                <select
                                                    className="w-full h-11 bg-white border border-slate-300 rounded-lg px-3 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-semibold text-slate-700"
                                                    value={payment.account}
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
                                                    className="w-full h-11 bg-white border border-slate-300 rounded-lg px-3 outline-none focus:border-primary transition-all font-mono text-sm text-slate-700"
                                                    value={payment.accountNumber}
                                                    onChange={(e) => setPayment({ ...payment, accountNumber: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowPaymentModal(false)}
                                    className="flex-1 h-12 rounded-xl font-bold text-slate-500 hover:bg-slate-50 border border-slate-200 transition-all text-sm"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 h-12 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all text-sm uppercase tracking-wider"
                                >
                                    Save Entry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
