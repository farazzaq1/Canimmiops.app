import React, { useState } from "react";
import { 
  FileText, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  AlertCircle,
  Sparkles,
  Info,
  Calendar
} from "lucide-react";

interface Props {
  userEmail?: string;
  userPhone?: string;
  userName?: string;
}

export default function ProfessionalConsultation({ userEmail, userPhone, userName }: Props) {
  // Form State
  const [fullName, setFullName] = useState<string>(userName || "");
  const [email, setEmail] = useState<string>(userEmail || "");
  const [phoneNum, setPhoneNum] = useState<string>(userPhone || "");
  const [currentLocation, setCurrentLocation] = useState<string>("Inside Canada (Ontario)");
  
  const [inquiryCategory, setInquiryCategory] = useState<string>("Express Entry & CEC");
  const [currentStatus, setCurrentStatus] = useState<string>("PGWP / Work Permit");
  const [crsScore, setCrsScore] = useState<string>("");
  const [targetProvince, setTargetProvince] = useState<string>("Ontario (OINP)");
  
  const [querySubject, setQuerySubject] = useState<string>("");
  const [queryDetails, setQueryDetails] = useState<string>("");
  const [preferredContact, setPreferredContact] = useState<"email" | "phone" | "whatsapp">("email");
  const [agreedDisclaimer, setAgreedDisclaimer] = useState<boolean>(false);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    date: string;
    fullName: string;
    email: string;
    category: string;
  } | null>(null);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedDisclaimer) {
      alert("Please accept the preliminary assessment disclaimer before submitting your query.");
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `#INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedTicket({
        id: ticketId,
        date: new Date().toLocaleString(),
        fullName: fullName || "Valued Applicant",
        email: email || "Registered Email",
        category: inquiryCategory
      });
    }, 1200);
  };

  const handleResetForm = () => {
    setSubmittedTicket(null);
    setQuerySubject("");
    setQueryDetails("");
    setAgreedDisclaimer(false);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-indigo-800/40 shadow-xl space-y-3">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/80 border border-indigo-700/50 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Pre-Consultation Case Assessment Form
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
              Submit Your Immigration Query
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Have questions about your Express Entry eligibility, PNP streams, work permits, or spousal sponsorship? Submit your case details below. Our assessment team will review your profile and respond via email within <strong>24–48 hours</strong> with tailored guidance and next steps.
            </p>
          </div>
        </div>
      </div>

      {/* CONFIRMATION TICKET DISPLAY */}
      {submittedTicket ? (
        <div className="bg-emerald-950 text-white p-6 sm:p-8 rounded-2xl border border-emerald-800 shadow-xl space-y-6 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-900/80 rounded-2xl border border-emerald-500/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-900/90 text-emerald-300 border border-emerald-700/60 rounded-md text-[10px] font-mono font-bold uppercase">
                Query Received Successfully
              </div>
              <h2 className="text-xl font-display font-black text-white">
                Case Inquiry #{submittedTicket.id} Submitted
              </h2>
              <p className="text-xs text-emerald-200/90 leading-relaxed max-w-2xl">
                Thank you, <strong>{submittedTicket.fullName}</strong>. Your immigration query under category <strong>"{submittedTicket.category}"</strong> has been securely logged. A confirmation receipt has been generated for <strong>{submittedTicket.email}</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/60 text-xs font-mono">
            <div>
              <span className="text-emerald-400 block text-[10px] uppercase font-bold">Reference Number</span>
              <span className="text-white font-bold text-sm">{submittedTicket.id}</span>
            </div>
            <div>
              <span className="text-emerald-400 block text-[10px] uppercase font-bold">Submission Time</span>
              <span className="text-white">{submittedTicket.date}</span>
            </div>
            <div>
              <span className="text-emerald-400 block text-[10px] uppercase font-bold">Expected Response Time</span>
              <span className="text-emerald-300 font-bold">Within 24 – 48 Hours</span>
            </div>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
            <h4 className="font-bold text-amber-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-400 shrink-0" />
              What Happens Next?
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11.5px] leading-relaxed">
              <li>Our team will review your submitted profile details and questions against current IRCC draw trends and PNP guidelines.</li>
              <li>You will receive an email response containing structured feedback, potential eligibility avenues, and optional retainer / formal consultation details if required.</li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={handleResetForm}
              className="px-5 py-2.5 bg-white text-emerald-950 font-bold text-xs rounded-xl hover:bg-emerald-100 transition cursor-pointer shadow-sm"
            >
              Submit Another Query
            </button>
          </div>
        </div>
      ) : (
        /* INQUIRY FORM */
        <form onSubmit={handleSubmitInquiry} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT 7 COLUMNS: CONTACT & CASE INFORMATION */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* SECTION 1: APPLICANT CONTACT INFO */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider font-mono text-slate-500 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                1. Your Contact Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="+1 (416) 000-0000"
                      value={phoneNum}
                      onChange={(e) => setPhoneNum(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                    Current Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Toronto, Canada or India"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 2: IMMIGRATION PROFILE DETAILS */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider font-mono text-slate-500 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                2. Immigration Case Background
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                    Primary Inquiry Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={inquiryCategory}
                    onChange={(e) => setInquiryCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Express Entry & CEC">Express Entry & Canadian Experience Class</option>
                    <option value="Provincial Nominee Program (PNP)">Provincial Nominee Program (OINP, BCPNP, AAIP, etc.)</option>
                    <option value="Work Permit & LMIA / PGWP">Work Permit, PGWP Extension, LMIA</option>
                    <option value="Study Permit & Extensions">Study Permit & Student Extensions</option>
                    <option value="Spousal & Family Sponsorship">Spousal & Family Sponsorship</option>
                    <option value="Visitor Visa & TRV Extension">Visitor Visa / TRV / Super Visa</option>
                    <option value="General PR Inquiry">General Permanent Residency Inquiry</option>
                    <option value="Other / General Query">Other Specific Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                    Current Status in Canada
                  </label>
                  <select
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="PGWP / Work Permit">Post-Graduation Work Permit (PGWP)</option>
                    <option value="Closed Work Permit (LMIA/IMP)">Closed Work Permit (LMIA / IMP)</option>
                    <option value="International Student">International Student (Study Permit)</option>
                    <option value="Visitor / Tourist">Visitor / Tourist Status</option>
                    <option value="Outside Canada (Foreign National)">Outside Canada (Living Abroad)</option>
                    <option value="PR / Citizen">Permanent Resident / Citizen</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                    Estimated Express Entry CRS Score (if calculated)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 485"
                    value={crsScore}
                    onChange={(e) => setCrsScore(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                    Target Province / Region
                  </label>
                  <select
                    value={targetProvince}
                    onChange={(e) => setTargetProvince(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Ontario (OINP)">Ontario (OINP)</option>
                    <option value="British Columbia (BCPNP)">British Columbia (BCPNP)</option>
                    <option value="Alberta (AAIP)">Alberta (AAIP)</option>
                    <option value="Nova Scotia (NSNP)">Nova Scotia (NSNP)</option>
                    <option value="Manitoba (MPNP)">Manitoba (MPNP)</option>
                    <option value="Saskatchewan (SINP)">Saskatchewan (SINP)</option>
                    <option value="Open to Any Province">Open to Any Province / Federal</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLUMNS: QUERY DETAILS & SUBMIT */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xs font-extrabold uppercase tracking-wider font-mono text-slate-500 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-600" />
                3. Your Question & Preferred Response
              </h2>

              <div>
                <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                  Query Subject Line <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Question about PGWP extension eligibility under 2026 rules"
                  value={querySubject}
                  onChange={(e) => setQuerySubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                  Detailed Case Description / Questions <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Provide background details such as work experience in Canada, education completed, language test scores (IELTS/CELPIP), and your specific questions..."
                  value={queryDetails}
                  onChange={(e) => setQueryDetails(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-mono font-bold text-slate-600 block mb-1">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "email", label: "Email" },
                    { id: "phone", label: "Phone Call" },
                    { id: "whatsapp", label: "WhatsApp" }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPreferredContact(item.id as any)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition cursor-pointer text-center ${
                        preferredContact === item.id
                          ? "bg-slate-900 text-white border-slate-900"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* DISCLAIMER CHECKBOX */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedDisclaimer}
                    onChange={(e) => setAgreedDisclaimer(e.target.checked)}
                    className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer w-4 h-4 shrink-0"
                  />
                  <span className="text-[11px] text-slate-600 leading-tight">
                    I understand this is a preliminary assessment inquiry. Submitting this form allows the team to review my case background. No regulated legal retainer agreement is created until formally signed.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-red-700 hover:bg-red-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider font-mono active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging Your Query...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Case Inquiry For Review</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* FOOTER NOTICE */}
      <div className="bg-slate-100/80 border border-slate-200 p-4 rounded-xl text-xs text-slate-600 space-y-1">
        <p className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          Confidentiality & Privacy Notice
        </p>
        <p className="text-[10.5px] leading-relaxed text-slate-600">
          All submitted details are treated with strict confidentiality. Information collected is solely used to evaluate immigration eligibility and provide guidance.
        </p>
      </div>

    </div>
  );
}
