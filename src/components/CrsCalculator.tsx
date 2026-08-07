import React, { useState, useEffect } from "react";
import { Calculator, Award, UserCheck, Languages, Briefcase, PlusCircle, CheckCircle, RefreshCw, Smartphone, Sparkles } from "lucide-react";

interface CrsCalculatorProps {
  currentScore: number;
  onScoreUpdate: (score: number) => void;
  userPhone?: string;
}

export default function CrsCalculator({ currentScore, onScoreUpdate, userPhone }: CrsCalculatorProps) {
  // AI Prediction states
  const [loadingPrediction, setLoadingPrediction] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<string>("");
  const [successRates, setSuccessRates] = useState<Record<string, number> | null>(null);
  const [predictionError, setPredictionError] = useState<string>("");

  const handlePredictCRS = async () => {
    setLoadingPrediction(true);
    setPredictionError("");
    setPredictionResult("");
    setSuccessRates(null);

    try {
      const res = await fetch("/api/gemini/crs-evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile: {
            crsScore: breakdown.total,
            age,
            education,
            hasFrench,
            hasPnp,
            hasCanadianDegree,
            canadianWork,
            foreignWork
          }
        })
      });

      if (!res.ok) {
        throw new Error("Failed to contact the predictive AI gateway.");
      }

      const data = await res.json();
      setPredictionResult(data.analysis || "");
      setSuccessRates(data.successRates || null);
    } catch (err: any) {
      console.error(err);
      setPredictionError(err.message || "An error occurred during evaluation.");
    } finally {
      setLoadingPrediction(false);
    }
  };

  const renderMarkdown = (text: string) => {
    return text.split("\n").map((line, idx) => {
      // Handle Bold text
      const parts = line.split("**");
      const content = parts.map((part, i) => {
        if (i % 2 === 1) return <strong key={i} className="font-bold text-slate-900">{part}</strong>;
        return part;
      });

      if (line.startsWith("### ")) {
        return <h3 key={idx} className="text-sm font-bold text-indigo-950 mt-4 mb-2 border-b border-slate-100 pb-1">{line.replace("### ", "")}</h3>;
      }
      if (line.startsWith("#### ")) {
        return <h4 key={idx} className="text-xs font-bold text-slate-850 mt-3 mb-1.5">{line.replace("#### ", "")}</h4>;
      }
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return <li key={idx} className="text-[11px] text-slate-600 ml-4 list-disc mt-1">{content}</li>;
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-[11px] text-slate-600 leading-relaxed">{content}</p>;
    });
  };

  // 1. Core State Inputs
  const [maritalStatus, setMaritalStatus] = useState<"single" | "married">("single");
  const [age, setAge] = useState<number>(28);
  const [education, setEducation] = useState<string>("bachelors");
  const [clbListening, setClbListening] = useState<number>(9);
  const [clbReading, setClbReading] = useState<number>(9);
  const [clbWriting, setClbWriting] = useState<number>(9);
  const [clbSpeaking, setClbSpeaking] = useState<number>(9);
  
  const [canadianWork, setCanadianWork] = useState<number>(1); // years
  const [foreignWork, setForeignWork] = useState<number>(2); // years
  
  // 2. Additional Factors
  const [hasPnp, setHasPnp] = useState<boolean>(false);
  const [hasFrench, setHasFrench] = useState<boolean>(false);
  const [hasCanadianDegree, setHasCanadianDegree] = useState<boolean>(false);
  const [hasSibling, setHasSibling] = useState<boolean>(false);
  const [hasJobOffer, setHasJobOffer] = useState<boolean>(false);

  // 3. Calculation Breakdown States
  const [breakdown, setBreakdown] = useState({
    agePoints: 0,
    educationPoints: 0,
    languagePoints: 0,
    canadianWorkPoints: 0,
    transferabilityPoints: 0,
    additionalPoints: 0,
    total: 0
  });

  // Re-run calculations on any input change
  useEffect(() => {
    // A. AGE POINTS (Max 110 single, 100 married)
    let agePts = 0;
    if (maritalStatus === "single") {
      if (age >= 20 && age <= 29) agePts = 110;
      else if (age === 18) agePts = 99;
      else if (age === 19) agePts = 105;
      else if (age === 30) agePts = 105;
      else if (age === 31) agePts = 99;
      else if (age === 32) agePts = 94;
      else if (age === 33) agePts = 88;
      else if (age === 34) agePts = 83;
      else if (age === 35) agePts = 77;
      else if (age === 36) agePts = 72;
      else if (age === 37) agePts = 66;
      else if (age === 38) agePts = 61;
      else if (age === 39) agePts = 55;
      else if (age === 40) agePts = 50;
      else if (age === 41) agePts = 39;
      else if (age === 42) agePts = 28;
      else if (age === 43) agePts = 17;
      else if (age === 44) agePts = 6;
      else if (age >= 45) agePts = 0;
    } else {
      if (age >= 20 && age <= 29) agePts = 100;
      else if (age === 18) agePts = 90;
      else if (age === 19) agePts = 95;
      else if (age === 30) agePts = 95;
      else if (age === 31) agePts = 90;
      else if (age === 32) agePts = 85;
      else if (age === 33) agePts = 80;
      else if (age === 34) agePts = 75;
      else if (age === 35) agePts = 70;
      else if (age === 36) agePts = 65;
      else if (age === 37) agePts = 60;
      else if (age === 38) agePts = 55;
      else if (age === 39) agePts = 50;
      else if (age === 40) agePts = 45;
      else if (age === 41) agePts = 35;
      else if (age === 42) agePts = 25;
      else if (age === 43) agePts = 15;
      else if (age === 44) agePts = 5;
      else if (age >= 45) agePts = 0;
    }

    // B. EDUCATION POINTS (Max 150 single, 140 married)
    let eduPts = 0;
    const isSingle = maritalStatus === "single";
    if (education === "phd") eduPts = isSingle ? 150 : 140;
    else if (education === "masters") eduPts = isSingle ? 135 : 126;
    else if (education === "two_degrees") eduPts = isSingle ? 128 : 119;
    else if (education === "three_year") eduPts = isSingle ? 120 : 112;
    else if (education === "two_year") eduPts = isSingle ? 98 : 91;
    else if (education === "one_year") eduPts = isSingle ? 90 : 84;
    else eduPts = isSingle ? 30 : 28; // High school

    // C. LANGUAGE POINTS (Max 136 single, 128 married)
    const getLangPointsPerSection = (clb: number) => {
      if (clb >= 10) return isSingle ? 34 : 32;
      if (clb === 9) return isSingle ? 31 : 29;
      if (clb === 8) return isSingle ? 23 : 22;
      if (clb === 7) return isSingle ? 17 : 16;
      if (clb === 6) return isSingle ? 9 : 8;
      if (clb === 5) return isSingle ? 6 : 6;
      return 0;
    };
    const langPts = getLangPointsPerSection(clbListening) + 
                    getLangPointsPerSection(clbReading) + 
                    getLangPointsPerSection(clbWriting) + 
                    getLangPointsPerSection(clbSpeaking);

    // D. CANADIAN WORK EXPERIENCE (Max 80 single, 70 married)
    let canWorkPts = 0;
    if (canadianWork >= 5) canWorkPts = isSingle ? 80 : 70;
    else if (canadianWork === 4) canWorkPts = isSingle ? 74 : 64;
    else if (canadianWork === 3) canWorkPts = isSingle ? 64 : 56;
    else if (canadianWork === 2) canWorkPts = isSingle ? 53 : 46;
    else if (canadianWork === 1) canWorkPts = isSingle ? 40 : 35;

    // E. SKILL TRANSFERABILITY (Max 100 points)
    // 1. Education + Language (Max 50 points)
    let eduLangPts = 0;
    const avgClb = (clbListening + clbReading + clbWriting + clbSpeaking) / 4;
    const isClb9OrMore = clbListening >= 9 && clbReading >= 9 && clbWriting >= 9 && clbSpeaking >= 9;
    const isClb7OrMore = clbListening >= 7 && clbReading >= 7 && clbWriting >= 7 && clbSpeaking >= 7;

    if (education === "phd" || education === "masters" || education === "two_degrees" || education === "three_year") {
      if (isClb9OrMore) eduLangPts = 50;
      else if (isClb7OrMore) eduLangPts = 25;
    } else if (education === "two_year" || education === "one_year") {
      if (isClb9OrMore) eduLangPts = 26;
      else if (isClb7OrMore) eduLangPts = 13;
    }

    // 2. Education + Canadian Work (Max 50 points)
    let eduWorkPts = 0;
    if (education === "phd" || education === "masters" || education === "two_degrees" || education === "three_year") {
      if (canadianWork >= 2) eduWorkPts = 50;
      else if (canadianWork === 1) eduWorkPts = 25;
    } else if (education === "two_year" || education === "one_year") {
      if (canadianWork >= 2) eduWorkPts = 26;
      else if (canadianWork === 1) eduWorkPts = 13;
    }

    // 3. Foreign Work + Language (Max 50 points)
    let foreignLangPts = 0;
    if (foreignWork >= 3) {
      if (isClb9OrMore) foreignLangPts = 50;
      else if (isClb7OrMore) foreignLangPts = 25;
    } else if (foreignWork === 1 || foreignWork === 2) {
      if (isClb9OrMore) foreignLangPts = 25;
      else if (isClb7OrMore) foreignLangPts = 13;
    }

    // Combine skill transferability (capped at 100 points in total)
    const transferabilityPts = Math.min(100, (eduLangPts + eduWorkPts + foreignLangPts));

    // F. ADDITIONAL POINTS (Max 600 points)
    let addPts = 0;
    if (hasPnp) addPts += 600;
    if (hasFrench) addPts += 50;
    if (hasCanadianDegree) addPts += 30;
    if (hasSibling) addPts += 15;
    if (hasJobOffer) addPts += 50; // assuming TEER 1/2/3 job offer (+50 points)
    
    // Total capped additional points
    const finalAddPts = Math.min(600, addPts);

    const totalScore = agePts + eduPts + langPts + canWorkPts + transferabilityPts + finalAddPts;

    setBreakdown({
      agePoints: agePts,
      educationPoints: eduPts,
      languagePoints: langPts,
      canadianWorkPoints: canWorkPts,
      transferabilityPoints: transferabilityPts,
      additionalPoints: finalAddPts,
      total: totalScore
    });

    onScoreUpdate(totalScore);
  }, [
    maritalStatus, age, education, clbListening, clbReading, clbWriting, clbSpeaking,
    canadianWork, foreignWork, hasPnp, hasFrench, hasCanadianDegree, hasSibling, hasJobOffer
  ]);

  const handleReset = () => {
    setMaritalStatus("single");
    setAge(28);
    setEducation("bachelors");
    setClbListening(9);
    setClbReading(9);
    setClbWriting(9);
    setClbSpeaking(9);
    setCanadianWork(1);
    setForeignWork(2);
    setHasPnp(false);
    setHasFrench(false);
    setHasCanadianDegree(false);
    setHasSibling(false);
    setHasJobOffer(false);
  };

  return (
    <div id="crs-calculator-section" className="space-y-6">
      
      {/* HEADER CARD */}
      <div className="bg-[#4a3622] rounded-xl p-4 sm:p-5 text-white border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-[10px] font-bold font-mono tracking-wider uppercase border border-indigo-500/30">
              IRCC Express Entry aligned
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl tracking-tight">Express Entry CRS Calculator</h2>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Estimate your Comprehensive Ranking System (CRS) score based on core demographic criteria, skills transferability, and provincial nomination pathways.
          </p>
        </div>

        {/* Dynamic Score Dial */}
        <div className="flex flex-col items-center justify-center bg-slate-950 border border-slate-800 rounded-2xl p-4 md:w-48 text-center shadow-inner relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-bold">CRS Points</span>
          <span className="text-4xl md:text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-400 to-amber-300 block py-1">
            {breakdown.total}
          </span>
          <span className="text-[9px] text-slate-400 block font-medium">Max Limit: 1200</span>
          {userPhone && (
            <span className="mt-1 text-[8px] font-mono text-emerald-400 flex items-center gap-1">
              <Smartphone className="w-2.5 h-2.5" /> Cached on {userPhone}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* INPUT FORM PANEL (2/3 width on desktop) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Card 1: Core Personal Factors */}
          <div className="bg-[#ab9f9f] rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              <h3 className="font-display font-bold text-sm text-slate-900">1. Core Human Capital Factors</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Marital Status */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Marital Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMaritalStatus("single")}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      maritalStatus === "single"
                        ? "bg-indigo-50 border-indigo-600 text-indigo-700"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Single / Unmarried
                  </button>
                  <button
                    onClick={() => setMaritalStatus("married")}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      maritalStatus === "married"
                        ? "bg-indigo-50 border-indigo-600 text-indigo-700"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    Married
                  </button>
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Age: <span className="text-indigo-600 font-bold font-mono text-sm">{age} years old</span>
                </label>
                <input
                  type="range"
                  min="17"
                  max="50"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
                  <span>17 yrs</span>
                  <span className="font-bold text-indigo-600">Peak (20-29 yrs)</span>
                  <span>50 yrs</span>
                </div>
              </div>
            </div>

            {/* Level of Education */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Highest Level of Education</label>
              <select
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 font-medium"
              >
                <option value="high_school">High School Diploma (Secondary school)</option>
                <option value="one_year">One-year post-secondary program</option>
                <option value="two_year">Two-year post-secondary program</option>
                <option value="three_year">Bachelor's Degree (Three or more year program)</option>
                <option value="two_degrees">Two or more post-secondary certificates (One must be 3+ yrs)</option>
                <option value="masters">Master's Degree (or professional degree like Medicine)</option>
                <option value="phd">Doctoral Level (PhD)</option>
              </select>
            </div>
          </div>

          {/* Card 2: Language Capabilities */}
          <div className="bg-[#ab9f9f] rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3.5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Languages className="w-5 h-5 text-indigo-600" />
              <h3 className="font-display font-bold text-sm text-slate-900">2. First Official Language (CLB Levels)</h3>
            </div>
            
            <p className="text-[11px] text-slate-500 leading-normal">
              Select your Canadian Language Benchmark (CLB) score equivalent for each communication skill (e.g., IELTS, CELPIP, or TEF/TCF score equivalents).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Reading</label>
                <select
                  value={clbReading}
                  onChange={(e) => setClbReading(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 font-mono"
                >
                  <option value="10">CLB 10+</option>
                  <option value="9">CLB 9</option>
                  <option value="8">CLB 8</option>
                  <option value="7">CLB 7</option>
                  <option value="6">CLB 6</option>
                  <option value="5">CLB 5</option>
                  <option value="4">CLB 4 or under</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Writing</label>
                <select
                  value={clbWriting}
                  onChange={(e) => setClbWriting(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 font-mono"
                >
                  <option value="10">CLB 10+</option>
                  <option value="9">CLB 9</option>
                  <option value="8">CLB 8</option>
                  <option value="7">CLB 7</option>
                  <option value="6">CLB 6</option>
                  <option value="5">CLB 5</option>
                  <option value="4">CLB 4 or under</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Listening</label>
                <select
                  value={clbListening}
                  onChange={(e) => setClbListening(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 font-mono"
                >
                  <option value="10">CLB 10+</option>
                  <option value="9">CLB 9</option>
                  <option value="8">CLB 8</option>
                  <option value="7">CLB 7</option>
                  <option value="6">CLB 6</option>
                  <option value="5">CLB 5</option>
                  <option value="4">CLB 4 or under</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Speaking</label>
                <select
                  value={clbSpeaking}
                  onChange={(e) => setClbSpeaking(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 font-mono"
                >
                  <option value="10">CLB 10+</option>
                  <option value="9">CLB 9</option>
                  <option value="8">CLB 8</option>
                  <option value="7">CLB 7</option>
                  <option value="6">CLB 6</option>
                  <option value="5">CLB 5</option>
                  <option value="4">CLB 4 or under</option>
                </select>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 p-2.5 rounded-xl text-[10px] text-indigo-800 font-medium leading-relaxed mt-2">
              💡 **Language Strategy**: Scoring a **CLB 9** or higher in all four sections triggers major bonus multipliers in the **Skill Transferability** section, potentially elevating your score by up to **50-80 additional points**.
            </div>
          </div>

          {/* Card 3: Work Experience */}
          <div className="bg-[#ab9f9f] rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Briefcase className="w-5 h-5 text-indigo-600" />
              <h3 className="font-display font-bold text-sm text-slate-900">3. Work Experience</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Canadian Work Experience */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Skilled Canadian Work Experience</label>
                <select
                  value={canadianWork}
                  onChange={(e) => setCanadianWork(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 font-medium"
                >
                  <option value="0">None (less than 1 year)</option>
                  <option value="1">1 year of experience</option>
                  <option value="2">2 years of experience</option>
                  <option value="3">3 years of experience</option>
                  <option value="4">4 years of experience</option>
                  <option value="5">5 or more years of experience</option>
                </select>
              </div>

              {/* Foreign Work Experience */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Skilled Foreign Work Experience</label>
                <select
                  value={foreignWork}
                  onChange={(e) => setForeignWork(parseInt(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 font-medium"
                >
                  <option value="0">None (less than 1 year)</option>
                  <option value="1">1 year of experience</option>
                  <option value="2">2 years of experience</option>
                  <option value="3">3 or more years of experience</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 4: Additional Endorsements / Multipliers */}
          <div className="bg-[#ab9f9f] rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              <h3 className="font-display font-bold text-sm text-slate-900">4. Additional Pathway Endorsements</h3>
            </div>

            <p className="text-[11px] text-slate-500 leading-normal">
              Select any additional variables that apply to your Express Entry profile. These grant static points directly.
            </p>

            <div className="space-y-3 pt-1">
              {/* Provincial Nomination */}
              <label className="flex items-start gap-3 p-3 bg-[#f4e6e6] border border-red-200 hover:bg-[#ebdbdb] transition-colors rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasPnp}
                  onChange={(e) => setHasPnp(e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Nomination from a Province or Territory (PNP)</span>
                  <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">+600 Points (The single largest scoring multiplier)</span>
                  <span className="text-[10px] text-slate-500 block leading-relaxed">
                    Applies if you have received a provincial nomination certificate (such as Manitoba MPNP, Alberta AAIP, British Columbia BCPNP, etc.).
                  </span>
                </div>
              </label>

              {/* French Ability */}
              <label className="flex items-start gap-3 p-3 bg-[#f4e6e6] hover:bg-[#ebdbdb] transition-colors rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFrench}
                  onChange={(e) => setHasFrench(e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">French Language Skills (CLB 7+ in French)</span>
                  <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">+50 Points</span>
                  <span className="text-[10px] text-slate-500 block">
                    You have achieved intermediate or advanced proficiency in all 4 French competencies (TEF or TCF Canada).
                  </span>
                </div>
              </label>

              {/* Canadian Degree */}
              <label className="flex items-start gap-3 p-3 bg-[#f4e6e6] hover:bg-[#ebdbdb] transition-colors rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasCanadianDegree}
                  onChange={(e) => setHasCanadianDegree(e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Post-Secondary Education in Canada</span>
                  <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">+30 Points (Master/PhD/3-year degree) or +15 Points (1/2 year diploma)</span>
                  <span className="text-[10px] text-slate-500 block">
                    You completed an eligible post-secondary credential inside Canada of at least 1 or more years.
                  </span>
                </div>
              </label>

              {/* Sibling in Canada */}
              <label className="flex items-start gap-3 p-3 bg-[#f4e6e6] hover:bg-[#ebdbdb] transition-colors rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSibling}
                  onChange={(e) => setHasSibling(e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Sibling living in Canada (Citizen or PR)</span>
                  <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">+15 Points</span>
                  <span className="text-[10px] text-slate-500 block">
                    You or your spouse has a sibling who is at least 18 years old, living in Canada, and is a Citizen or Permanent Resident.
                  </span>
                </div>
              </label>

              {/* Arranged Job Offer */}
              <label className="flex items-start gap-3 p-3 bg-[#f4e6e6] hover:bg-[#ebdbdb] transition-colors rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasJobOffer}
                  onChange={(e) => setHasJobOffer(e.target.checked)}
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded"
                />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Arranged Employment (Valid Job Offer)</span>
                  <span className="text-[10px] text-indigo-600 font-bold block mt-0.5">+50 Points (TEER 1, 2, 3) or +200 Points (TEER 0 Major Group 00)</span>
                  <span className="text-[10px] text-slate-500 block">
                    You have a valid, written job offer from an employer in Canada supported by an LMIA, or LMIA-exempt.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Reset button */}
          <div className="flex justify-end pt-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Calculator Parameters
            </button>
          </div>

        </div>

        {/* SIDE SCORE DISCLOSURE PANEL (1/3 width on desktop) */}
        <div className="space-y-6">
          <div className="bg-[#ab9f9f] rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm sticky top-24 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Award className="w-5 h-5 text-indigo-600 animate-pulse" />
              <h3 className="font-display font-bold text-sm text-slate-900">Score Breakdown</h3>
            </div>

            <div className="space-y-4">
              {/* Age breakdown */}
              <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2.5">
                <div>
                  <span className="font-bold text-slate-800 block">Age points</span>
                  <span className="text-[10px] text-slate-400 font-mono">Demographic Curve</span>
                </div>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                  {breakdown.agePoints}
                </span>
              </div>

              {/* Education breakdown */}
              <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2.5">
                <div>
                  <span className="font-bold text-slate-800 block">Education level</span>
                  <span className="text-[10px] text-slate-400 font-mono">Academic Credentials</span>
                </div>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                  {breakdown.educationPoints}
                </span>
              </div>

              {/* Language breakdown */}
              <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2.5">
                <div>
                  <span className="font-bold text-slate-800 block">First Language</span>
                  <span className="text-[10px] text-slate-400 font-mono">English (CLB Listening, etc.)</span>
                </div>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                  {breakdown.languagePoints}
                </span>
              </div>

              {/* Work breakdown */}
              <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2.5">
                <div>
                  <span className="font-bold text-slate-800 block">Canadian Work Experience</span>
                  <span className="text-[10px] text-slate-400 font-mono">Core In-Country Work</span>
                </div>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                  {breakdown.canadianWorkPoints}
                </span>
              </div>

              {/* Transferability breakdown */}
              <div className="flex justify-between items-center text-xs border-b border-slate-50 pb-2.5">
                <div>
                  <span className="font-bold text-slate-800 block">Skill Transferability</span>
                  <span className="text-[10px] text-slate-400 font-mono">Education + Language combo, etc.</span>
                </div>
                <span className="font-mono font-bold text-slate-950 bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md">
                  {breakdown.transferabilityPoints}
                </span>
              </div>

              {/* Additional breakdown */}
              <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-3">
                <div>
                  <span className="font-bold text-slate-800 block">Additional Points</span>
                  <span className="text-[10px] text-indigo-600 font-bold font-mono">PNP, French, Job Offer</span>
                </div>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  +{breakdown.additionalPoints}
                </span>
              </div>

              {/* Grand Total */}
              <div className="pt-2">
                <div className="bg-[#f4e6e6] p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">Total Score</span>
                  <span className="text-2xl font-display font-black text-indigo-600 font-mono">
                    {breakdown.total}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION PROMPT */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-xl p-4 text-xs space-y-3 shadow-md border border-slate-800">
              <span className="font-bold text-yellow-300 flex items-center gap-1">
                ⭐ Score Assessment
              </span>
              <p className="leading-relaxed text-slate-200">
                {breakdown.total >= 500 
                  ? "Excellent! Your score of 500+ is highly competitive for direct Federal Express Entry draws under current 2026 conditions."
                  : breakdown.total >= 400
                  ? "Good! Your score is in the moderate range. Try securing a Provincial Nomination (+600) or boosting language scores to CLB 9 to enter the selected pool."
                  : "Consider target regional pathways. Streams like the Alberta Rural Renewal or Manitoba Morden program are excellent options that bypass high CRS requirements!"}
              </p>
              <div className="border-t border-slate-800 pt-2.5 text-[10px] text-slate-300">
                👉 Your scores are autosaved under your cached profile for customized chatbot analysis.
              </div>
            </div>

            {/* AI PREDICTIVE DRAW ASSESSOR CARD */}
            <div className="bg-[#fff8f8] rounded-xl p-4 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-indigo-50 p-1.5 rounded text-indigo-600">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">AI Predictive Draw Assessor</h4>
                  <p className="text-[10px] text-slate-400">Evaluate Draw Probabilities</p>
                </div>
              </div>

              <button
                onClick={handlePredictCRS}
                disabled={loadingPrediction}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-semibold py-2 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                {loadingPrediction ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing 2026 Pools...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run AI Success Assessor</span>
                  </>
                )}
              </button>

              {predictionError && (
                <div className="p-3 bg-amber-50 rounded-lg text-[10px] text-amber-800 leading-normal">
                  {predictionError}
                </div>
              )}

              {successRates && (
                <div className="space-y-2.5 pt-2 border-t border-slate-100">
                  <p className="text-[10px] uppercase font-mono text-slate-400 font-bold tracking-wider">Estimated Success Percentiles</p>
                  <div className="space-y-1.5">
                    {Object.entries(successRates).map(([drawName, rate]) => {
                      const rateVal = rate as number;
                      return (
                        <div key={drawName} className="space-y-0.5">
                          <div className="flex justify-between text-[10px] font-mono">
                            <span className="capitalize text-slate-600">{drawName} draws</span>
                            <span className="font-bold text-slate-850">{rateVal}% Chance</span>
                          </div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${
                                rateVal >= 75 ? "bg-emerald-500" : rateVal >= 40 ? "bg-amber-500" : "bg-rose-500"
                              }`} 
                              style={{ width: `${rateVal}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {predictionResult && (
                <div className="bg-slate-50 border border-slate-150 rounded-lg p-3.5 mt-2 max-h-[350px] overflow-y-auto space-y-2 text-xs scrollbar-thin">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-1.5 mb-2">
                    <span className="font-bold text-indigo-950 font-display">🍁 Dynamic Strategy Briefing</span>
                    <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">Grounded Intelligence</span>
                  </div>
                  <div className="space-y-1 text-slate-600 leading-relaxed text-[11px]">
                    {renderMarkdown(predictionResult)}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
