import React, { useState } from "react";
import { 
  X, 
  LogIn, 
  UserPlus, 
  Mail, 
  Phone, 
  Lock, 
  User, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight,
  Compass
} from "lucide-react";
import { Language, translations } from "../utils/translations";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  targetStream?: string;
  isLoggedIn: boolean;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (profile: UserProfile) => void;
  language: Language;
}

const IMMIGRATION_STREAMS = [
  "Federal Express Entry (FSW / CEC / FST)",
  "Provincial Nominee Program (PNP)",
  "International Student / PGWP Pathway",
  "Temporary Foreign Worker / LMIA",
  "Spousal & Family Sponsorship",
  "Business & Investor Visa",
  "Humanitarian & Compassionate (H&C)"
];

export default function AuthModal({ isOpen, onClose, onAuthenticate, language }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"signin" | "register">("signin");
  const [showPassword, setShowPassword] = useState(false);
  
  // Sign In Form state
  const [signInIdentifier, setSignInIdentifier] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  
  // Register Form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regStream, setRegStream] = useState(IMMIGRATION_STREAMS[0]);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Status message
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!isOpen) return null;

  const t = translations[language];

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!signInIdentifier.trim()) {
      setErrorMsg("Please enter your email or mobile phone number.");
      return;
    }
    if (!signInPassword || signInPassword.length < 4) {
      setErrorMsg("Please enter a valid password (minimum 4 characters).");
      return;
    }

    const profile: UserProfile = {
      name: signInIdentifier.includes("@") 
        ? signInIdentifier.split("@")[0].replace(".", " ") 
        : "Candidate",
      email: signInIdentifier.includes("@") ? signInIdentifier.trim() : "candidate@canimmi.ca",
      phone: !signInIdentifier.includes("@") ? signInIdentifier.trim() : "+1 (647) 555-0199",
      targetStream: IMMIGRATION_STREAMS[0],
      isLoggedIn: true
    };

    setSuccessMsg("Signed in successfully! Syncing profile data...");
    setTimeout(() => {
      onAuthenticate(profile);
      onClose();
    }, 600);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!regName.trim()) {
      setErrorMsg("Full Name is required.");
      return;
    }
    if (!regEmail.trim() || !regEmail.includes("@")) {
      setErrorMsg("A valid email address is required.");
      return;
    }
    if (!regPhone.trim()) {
      setErrorMsg("Mobile phone number is required.");
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }
    if (!agreeTerms) {
      setErrorMsg("Please agree to the Terms of Service to create an account.");
      return;
    }

    const profile: UserProfile = {
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      targetStream: regStream,
      isLoggedIn: true
    };

    setSuccessMsg("Account created successfully! Welcome to CanImmi Operations.");
    setTimeout(() => {
      onAuthenticate(profile);
      onClose();
    }, 800);
  };

  const handleQuickDemoSignIn = () => {
    const demoProfile: UserProfile = {
      name: "Harpreet Singh",
      email: "harpreet.candidate@canimmi.ca",
      phone: "+1 (647) 555-0199",
      targetStream: "Federal Express Entry (FSW / CEC / FST)",
      isLoggedIn: true
    };
    setSuccessMsg("Logged in as Demo Candidate!");
    setTimeout(() => {
      onAuthenticate(demoProfile);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl text-slate-100 flex flex-col max-h-[92vh]">
        
        {/* MODAL HEADER */}
        <div className="bg-[#8b0d0d] px-5 py-4 border-b border-red-950 flex items-center justify-between relative">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#401111] flex items-center justify-center text-lg border border-red-400/30 shadow-sm shrink-0">
              🍁
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-base leading-tight">
                CanImmi Candidate Portal
              </h2>
              <p className="text-[11px] text-red-200 font-mono">
                {activeTab === "signin" ? "Sign in to access synchronized profile" : "Create your free candidate profile"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-red-200 hover:text-white hover:bg-red-900/60 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* TABS SWITCHER */}
        <div className="grid grid-cols-2 bg-slate-950 border-b border-slate-800 p-1.5 gap-1 text-xs font-bold">
          <button
            onClick={() => {
              setActiveTab("signin");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "signin"
                ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                : "text-slate-400 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            <LogIn className="w-3.5 h-3.5 text-amber-400" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("register");
              setErrorMsg("");
              setSuccessMsg("");
            }}
            className={`py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === "register"
                ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                : "text-slate-400 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Create Account</span>
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 overflow-y-auto space-y-4">

          {/* Alert Messages */}
          {errorMsg && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/40 text-rose-200 rounded-xl text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0"></span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: SIGN IN */}
          {activeTab === "signin" && (
            <form onSubmit={handleSignInSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Email Address or Mobile Number
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. candidate@canimmi.ca or +1 (647) 555-0199"
                    value={signInIdentifier}
                    onChange={(e) => setSignInIdentifier(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] font-bold text-slate-300">
                    Password
                  </label>
                  <span className="text-[10px] text-amber-400/80 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your account password"
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 text-xs rounded-xl pl-9 pr-9 py-2.5 text-white placeholder-slate-600 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer mt-1"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Candidate Account</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-3 text-[10px] font-mono text-slate-500 uppercase">Or instant access</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              <button
                type="button"
                onClick={handleQuickDemoSignIn}
                className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>One-Click Demo Candidate Sign In</span>
              </button>
            </form>
          )}

          {/* TAB 2: CREATE ACCOUNT */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Harpreet Singh"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-600 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                    <input
                      type="email"
                      placeholder="name@domain.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-600 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">
                    Mobile Phone <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="+1 (647) 555-0199"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs rounded-xl pl-9 pr-3 py-2.5 text-white placeholder-slate-600 focus:outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Target Immigration Stream
                </label>
                <div className="relative flex items-center">
                  <Compass className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                  <select
                    value={regStream}
                    onChange={(e) => setRegStream(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs rounded-xl pl-9 pr-3 py-2.5 text-white focus:outline-none transition cursor-pointer appearance-none"
                  >
                    {IMMIGRATION_STREAMS.map((s) => (
                      <option key={s} value={s} className="bg-slate-900 text-white">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">
                  Create Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 text-xs rounded-xl pl-9 pr-9 py-2.5 text-white placeholder-slate-600 focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500/30 cursor-pointer"
                />
                <label htmlFor="agreeTerms" className="text-[10.5px] text-slate-400 leading-tight select-none cursor-pointer">
                  I agree to the CanImmi Operations Terms of Service, Document Cache Policy, and Privacy Notice.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Free Candidate Profile</span>
              </button>
            </form>
          )}

          {/* ACCOUNT BENEFITS SUMMARY */}
          <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-3.5 space-y-2 mt-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Candidate Account Privileges
            </span>
            <div className="grid grid-cols-2 gap-2 text-[10.5px] text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Sync CRS Scores</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Expiry Alerts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>RCIC Case Tracking</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Live Government Draw Updates</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
