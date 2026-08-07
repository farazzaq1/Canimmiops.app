import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ShieldAlert, 
  Smartphone,
  Check,
  Info
} from "lucide-react";

interface DocumentReminder {
  id: string;
  docType: "work_permit" | "study_permit" | "passport" | "pr_card" | "visitor_visa" | "citizenship";
  title: string;
  expiryDate: string;
  notes: string;
  notifyDaysBefore: number;
}

const DEFAULT_REMINDERS: DocumentReminder[] = [
  {
    id: "rem-1",
    docType: "work_permit",
    title: "Post-Graduation Work Permit (PGWP)",
    expiryDate: "2026-11-15",
    notes: "Plan PR application or BOWP 4-6 months before expiry.",
    notifyDaysBefore: 90
  },
  {
    id: "rem-2",
    docType: "passport",
    title: "Canadian / Home Country Passport",
    expiryDate: "2027-05-20",
    notes: "IRCC documents cannot be issued beyond passport expiry.",
    notifyDaysBefore: 180
  },
  {
    id: "rem-3",
    docType: "pr_card",
    title: "Permanent Resident Card",
    expiryDate: "2028-02-10",
    notes: "Must satisfy 730-day residency obligation.",
    notifyDaysBefore: 120
  }
];

export default function NotificationsHub() {
  const [reminders, setReminders] = useState<DocumentReminder[]>(() => {
    const saved = localStorage.getItem("canimmi_reminders");
    return saved ? JSON.parse(saved) : DEFAULT_REMINDERS;
  });

  const [pushEnabled, setPushEnabled] = useState<boolean>(true);
  const [emailAlerts, setEmailAlerts] = useState<boolean>(true);
  const [smsAlerts, setSmsAlerts] = useState<boolean>(false);

  // New Reminder Form State
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newType, setNewType] = useState<DocumentReminder["docType"]>("work_permit");
  const [newDate, setNewDate] = useState<string>("");
  const [newNotes, setNewNotes] = useState<string>("");
  const [newNotifyDays, setNewNotifyDays] = useState<number>(90);

  useEffect(() => {
    localStorage.setItem("canimmi_reminders", JSON.stringify(reminders));
  }, [reminders]);

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDate) return;
    const item: DocumentReminder = {
      id: `rem-${Date.now()}`,
      title: newTitle,
      docType: newType,
      expiryDate: newDate,
      notes: newNotes,
      notifyDaysBefore: newNotifyDays
    };
    setReminders([...reminders, item]);
    setShowAddModal(false);
    setNewTitle("");
    setNewDate("");
    setNewNotes("");
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const calculateDaysRemaining = (expiryDate: string) => {
    const today = new Date();
    const exp = new Date(expiryDate);
    const diffTime = exp.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/80 border border-indigo-700/50 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300">
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              Document Expiry & Status Reminders
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
              Document Expiry Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Track critical dates for Work Permits, Study Permits, Passports, PR Cards, and Visas to avoid accidental status loss or implied status issues.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer shrink-0 font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Document</span>
          </button>
        </div>
      </div>

      {/* NOTIFICATION PREFERENCES CARD */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider font-mono text-slate-500">
          Alert Preferences
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <span className="text-xs font-bold text-slate-800">In-App Push Alerts</span>
            <input
              type="checkbox"
              checked={pushEnabled}
              onChange={(e) => setPushEnabled(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <span className="text-xs font-bold text-slate-800">Email Notifications</span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
            <span className="text-xs font-bold text-slate-800">SMS Alerts</span>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* REMINDERS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reminders.map((rem) => {
          const daysLeft = calculateDaysRemaining(rem.expiryDate);
          const isUrgent = daysLeft <= rem.notifyDaysBefore;

          return (
            <div 
              key={rem.id}
              className={`p-5 rounded-2xl border bg-white shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden ${
                isUrgent ? "border-amber-300 ring-2 ring-amber-500/10" : "border-slate-200"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    isUrgent ? "bg-amber-100 text-amber-900 border border-amber-300" : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  }`}>
                    {rem.docType.replace("_", " ")}
                  </span>
                  <button
                    onClick={() => handleDeleteReminder(rem.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition cursor-pointer"
                    title="Remove reminder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {rem.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Expires: <strong>{rem.expiryDate}</strong>
                  </p>
                </div>

                <div className={`p-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-between ${
                  daysLeft <= 60 
                    ? "bg-rose-50 border-rose-200 text-rose-900" 
                    : daysLeft <= 120 
                    ? "bg-amber-50 border-amber-200 text-amber-900" 
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Countdown:</span>
                  </span>
                  <span className="text-sm font-black">{daysLeft} Days</span>
                </div>

                {rem.notes && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                    {rem.notes}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD REMINDER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <h3 className="text-base font-bold font-display text-slate-900">Add Document Expiry Reminder</h3>

            <form onSubmit={handleAddReminder} className="space-y-3">
              <div>
                <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">
                  Document Type
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-sans"
                >
                  <option value="work_permit">Work Permit (PGWP / LMIA)</option>
                  <option value="study_permit">Study Permit</option>
                  <option value="passport">Passport</option>
                  <option value="pr_card">PR Card</option>
                  <option value="visitor_visa">Visitor Visa / TRV</option>
                  <option value="citizenship">Citizenship Application</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. PGWP Permit Document"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono font-bold text-slate-500 block mb-1">
                  Notes / Next Steps
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apply for BOWP before expiry..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
