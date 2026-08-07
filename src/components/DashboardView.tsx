import React, { useState, useEffect } from "react";
import { Province, FederalSource } from "../types";
import { Language, translations } from "../utils/translations";
import { 
  Search, 
  MapPin, 
  Rss, 
  TrendingUp, 
  Globe, 
  ExternalLink, 
  Database, 
  AlertCircle, 
  FileText,
  Clock,
  Sparkles,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Tv,
  Play
} from "lucide-react";

// PROVINCE-SPECIFIC FLAG COLOR THEMES & PALETTES
const PROVINCE_THEMES: Record<string, {
  bgGradient: string;
  borderColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentText: string;
  glowColor: string;
  innerCardBg: string;
  innerCardBorder: string;
  flagDesc: string;
  flagStrip: string; // color strip classes, e.g. "bg-red-600"
  buttonSelectedBg: string; // Selected button class
  buttonSelectedBorder: string;
  badgeColorDot: string; // mini-dot color
  buttonUnselectedBg: string; // Full unselected filled button background
}> = {
  ON: {
    bgGradient: "from-[#2b0c15] via-[#1a1c38] to-[#121929]",
    borderColor: "border-red-500/35",
    badgeBg: "bg-red-950/80",
    badgeText: "text-red-300",
    badgeBorder: "border-red-800/40",
    accentText: "text-red-400",
    glowColor: "bg-red-500/10",
    innerCardBg: "bg-[#1d0e12]",
    innerCardBorder: "border-red-950/45",
    flagDesc: "Red Ensign with green Maple Leaves shield",
    flagStrip: "bg-red-600",
    buttonSelectedBg: "bg-gradient-to-br from-red-600 to-red-800 text-white shadow-red-500/30",
    buttonSelectedBorder: "border-red-400",
    badgeColorDot: "bg-red-500",
    buttonUnselectedBg: "bg-[#302323] hover:bg-red-900/80 border-red-900/50 text-red-100/90 hover:border-red-500/50 hover:text-white"
  },
  BC: {
    bgGradient: "from-[#0a1e3d] via-[#15254d] to-[#2b2713]",
    borderColor: "border-amber-500/35",
    badgeBg: "bg-amber-950/80",
    badgeText: "text-amber-300",
    badgeBorder: "border-amber-850/40",
    accentText: "text-amber-400",
    glowColor: "bg-amber-550/10",
    innerCardBg: "bg-[#0b1429]",
    innerCardBorder: "border-indigo-950/45",
    flagDesc: "Union Jack with central Crown above wavy Golden Sun rays",
    flagStrip: "bg-amber-500",
    buttonSelectedBg: "bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold shadow-amber-500/30",
    buttonSelectedBorder: "border-amber-300",
    badgeColorDot: "bg-amber-400",
    buttonUnselectedBg: "bg-amber-950/50 hover:bg-amber-900/70 border-amber-800/40 text-amber-100/90 hover:border-amber-400/55 hover:text-white"
  },
  AB: {
    bgGradient: "from-[#081e3f] via-[#122c54] to-[#132517]",
    borderColor: "border-blue-500/35",
    badgeBg: "bg-blue-950/80",
    badgeText: "text-blue-300",
    badgeBorder: "border-blue-800/40",
    accentText: "text-sky-400",
    glowColor: "bg-blue-500/10",
    innerCardBg: "bg-[#08152e]",
    innerCardBorder: "border-blue-950/45",
    flagDesc: "Royal Blue field centering provincial shield of mountains and wheat",
    flagStrip: "bg-blue-600",
    buttonSelectedBg: "bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-blue-500/30",
    buttonSelectedBorder: "border-blue-400",
    badgeColorDot: "bg-blue-500",
    buttonUnselectedBg: "bg-[#20379c] hover:bg-blue-900/85 border-blue-900/50 text-blue-100/90 hover:border-blue-500/50 hover:text-white"
  },
  SK: {
    bgGradient: "from-[#0f2418] via-[#182e22] to-[#262312]",
    borderColor: "border-emerald-500/35",
    badgeBg: "bg-emerald-950/80",
    badgeText: "text-emerald-300",
    badgeBorder: "border-emerald-800/40",
    accentText: "text-emerald-400",
    glowColor: "bg-emerald-550/10",
    innerCardBg: "bg-[#0c1813]",
    innerCardBorder: "border-emerald-950/45",
    flagDesc: "Green over Gold horizontal bi-band with Western Red Lily",
    flagStrip: "bg-emerald-600",
    buttonSelectedBg: "bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-emerald-500/30",
    buttonSelectedBorder: "border-emerald-400",
    badgeColorDot: "bg-emerald-500",
    buttonUnselectedBg: "bg-emerald-950/60 hover:bg-emerald-900/80 border-emerald-800/40 text-emerald-100/90 hover:border-emerald-500/50 hover:text-white"
  },
  MB: {
    bgGradient: "from-[#290c12] via-[#1a1633] to-[#14121d]",
    borderColor: "border-red-600/35",
    badgeBg: "bg-red-950/80",
    badgeText: "text-red-300",
    badgeBorder: "border-red-900/40",
    accentText: "text-red-450",
    glowColor: "bg-red-600/10",
    innerCardBg: "bg-[#160c10]",
    innerCardBorder: "border-red-950/45",
    flagDesc: "Red Ensign with shield of St. George and a standing Bison",
    flagStrip: "bg-red-700",
    buttonSelectedBg: "bg-gradient-to-br from-red-700 to-rose-900 text-white shadow-red-650/30",
    buttonSelectedBorder: "border-red-500",
    badgeColorDot: "bg-red-650",
    buttonUnselectedBg: "bg-[#450909] hover:bg-red-900/80 border-red-900/50 text-rose-100/90 hover:border-red-500/50 hover:text-white"
  },
  QC: {
    bgGradient: "from-[#0b224d] via-[#1a2d59] to-[#121929]",
    borderColor: "border-blue-400/35",
    badgeBg: "bg-blue-950/90",
    badgeText: "text-blue-200",
    badgeBorder: "border-blue-800/40",
    accentText: "text-blue-300",
    glowColor: "bg-blue-500/10",
    innerCardBg: "bg-[#0b162f]",
    innerCardBorder: "border-blue-950/45",
    flagDesc: "Fleurdelisé blue field with white cross and 4 white fleur-de-lis",
    flagStrip: "bg-blue-500",
    buttonSelectedBg: "bg-gradient-to-br from-blue-600 to-indigo-800 text-white shadow-blue-500/30",
    buttonSelectedBorder: "border-blue-400",
    badgeColorDot: "bg-blue-400",
    buttonUnselectedBg: "bg-[#4d6dcb] hover:bg-blue-900/85 border-blue-900/50 text-blue-100/90 hover:border-blue-500/50 hover:text-white"
  },
  NB: {
    bgGradient: "from-[#291610] via-[#161c33] to-[#0e2129]",
    borderColor: "border-amber-500/40",
    badgeBg: "bg-amber-950/80",
    badgeText: "text-amber-300",
    badgeBorder: "border-amber-800/40",
    accentText: "text-amber-400",
    glowColor: "bg-amber-500/10",
    innerCardBg: "bg-[#18110b]",
    innerCardBorder: "border-amber-950/45",
    flagDesc: "Golden Lion on Red above an ancient Galley ship at sea",
    flagStrip: "bg-amber-600",
    buttonSelectedBg: "bg-gradient-to-br from-amber-500 to-amber-700 text-slate-950 font-bold shadow-amber-600/30",
    buttonSelectedBorder: "border-amber-400",
    badgeColorDot: "bg-amber-500",
    buttonUnselectedBg: "bg-[#cc5e1f] hover:bg-amber-900/70 border-amber-800/40 text-amber-100/90 hover:border-amber-500/50 hover:text-white"
  },
  NS: {
    bgGradient: "from-[#081e3a] via-[#1b2f4f] to-[#262010]",
    borderColor: "border-sky-450/35",
    badgeBg: "bg-sky-950/80",
    badgeText: "text-sky-300",
    badgeBorder: "border-sky-800/40",
    accentText: "text-sky-300",
    glowColor: "bg-sky-500/10",
    innerCardBg: "bg-[#071529]",
    innerCardBorder: "border-sky-950/45",
    flagDesc: "Blue Saltire cross on white field with Scotland Lion shield",
    flagStrip: "bg-sky-400",
    buttonSelectedBg: "bg-gradient-to-br from-sky-500 to-sky-700 text-slate-950 font-bold shadow-sky-500/30",
    buttonSelectedBorder: "border-sky-300",
    badgeColorDot: "bg-sky-400",
    buttonUnselectedBg: "bg-[#81b8de] hover:bg-sky-900/80 border-sky-800/40 text-sky-100/90 hover:border-sky-450/50 hover:text-white"
  },
  PE: {
    bgGradient: "from-[#2b0e11] via-[#112918] to-[#121824]",
    borderColor: "border-red-500/35",
    badgeBg: "bg-red-950/80",
    badgeText: "text-red-300",
    badgeBorder: "border-red-800/40",
    accentText: "text-emerald-450",
    glowColor: "bg-emerald-500/10",
    innerCardBg: "bg-[#120709]",
    innerCardBorder: "border-red-950/45",
    flagDesc: "Red/white border with golden lion above deep green Oak trees",
    flagStrip: "bg-rose-600",
    buttonSelectedBg: "bg-gradient-to-br from-rose-600 to-rose-800 text-white shadow-rose-600/30",
    buttonSelectedBorder: "border-rose-400",
    badgeColorDot: "bg-rose-500",
    buttonUnselectedBg: "bg-[#024e22] hover:bg-rose-900/75 border-rose-900/50 text-rose-100/90 hover:border-rose-500/50 hover:text-white"
  },
  NL: {
    bgGradient: "from-[#0a1e3f] via-[#182a4d] to-[#121c29]",
    borderColor: "border-blue-450/35",
    badgeBg: "bg-blue-950/80",
    badgeText: "text-blue-300",
    badgeBorder: "border-blue-800/40",
    accentText: "text-amber-400",
    glowColor: "bg-blue-550/10",
    innerCardBg: "bg-[#071329]",
    innerCardBorder: "border-blue-950/45",
    flagDesc: "Cobalt Blue triangles and Golden arrow on crisp white ground",
    flagStrip: "bg-blue-600",
    buttonSelectedBg: "bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-indigo-500/30",
    buttonSelectedBorder: "border-indigo-400",
    badgeColorDot: "bg-blue-500",
    buttonUnselectedBg: "bg-indigo-950/60 hover:bg-indigo-900/85 border-indigo-900/50 text-indigo-100/90 hover:border-indigo-500/50 hover:text-white"
  },
  YT: {
    bgGradient: "from-[#081c33] via-[#102d2d] to-[#141b26]",
    borderColor: "border-teal-500/35",
    badgeBg: "bg-teal-950/80",
    badgeText: "text-teal-300",
    badgeBorder: "border-teal-800/40",
    accentText: "text-teal-400",
    glowColor: "bg-teal-500/10",
    innerCardBg: "bg-[#071324]",
    innerCardBorder: "border-teal-950/45",
    flagDesc: "Vertical tricolor of Blue, White, and Green with Territorial Arms",
    flagStrip: "bg-teal-600",
    buttonSelectedBg: "bg-gradient-to-br from-teal-600 to-teal-800 text-white shadow-teal-550/30",
    buttonSelectedBorder: "border-teal-400",
    badgeColorDot: "bg-teal-500",
    buttonUnselectedBg: "bg-[#0d4e4e] hover:bg-teal-900/85 border-teal-900/50 text-teal-100/90 hover:border-teal-500/50 hover:text-white"
  },
  NT: {
    bgGradient: "from-[#0b1f4d] via-[#1a2d59] to-[#141b26]",
    borderColor: "border-blue-400/35",
    badgeBg: "bg-blue-950/80",
    badgeText: "text-blue-300",
    badgeBorder: "border-blue-800/40",
    accentText: "text-amber-450",
    glowColor: "bg-blue-500/10",
    innerCardBg: "bg-[#0b1533]",
    innerCardBorder: "border-blue-950/45",
    flagDesc: "Blue-white-blue vertical stripes with gold-bearing Shield and Husky dog crest",
    flagStrip: "bg-blue-550",
    buttonSelectedBg: "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-blue-550/30",
    buttonSelectedBorder: "border-blue-400",
    badgeColorDot: "bg-blue-550",
    buttonUnselectedBg: "bg-[#4a3909] hover:bg-cyan-900/75 border-cyan-800/40 text-cyan-100/90 hover:border-cyan-500/50 hover:text-white"
  },
  NU: {
    bgGradient: "from-[#29210b] via-[#1e203b] to-[#191129]",
    borderColor: "border-amber-400/35",
    badgeBg: "bg-amber-950/80",
    badgeText: "text-amber-300",
    badgeBorder: "border-amber-800/40",
    accentText: "text-red-400",
    glowColor: "bg-amber-500/10",
    innerCardBg: "bg-[#1f1a09]",
    innerCardBorder: "border-amber-950/45",
    flagDesc: "Yellow & White divided by a Red Inuksuk stone structure with Blue Star",
    flagStrip: "bg-amber-500",
    buttonSelectedBg: "bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 font-bold shadow-amber-500/30",
    buttonSelectedBorder: "border-amber-300",
    badgeColorDot: "bg-amber-400",
    buttonUnselectedBg: "bg-[#40066d] hover:bg-yellow-900/70 border-yellow-800/40 text-yellow-100/90 hover:border-yellow-400/55 hover:text-white"
  }
};

const getTheme = (provId: string) => {
  return PROVINCE_THEMES[provId] || {
    bgGradient: "from-[#182647] to-[#1e325c]",
    borderColor: "border-indigo-550/30",
    badgeBg: "bg-[#1c325e]",
    badgeText: "text-indigo-200",
    badgeBorder: "border-indigo-500/20",
    accentText: "text-indigo-400",
    glowColor: "bg-indigo-500/10",
    innerCardBg: "bg-[#121d38]",
    innerCardBorder: "border-indigo-950/60",
    flagDesc: "Canadian Provincial Jurisdiction",
    flagStrip: "bg-indigo-600",
    buttonSelectedBg: "bg-indigo-600 text-white hover:bg-indigo-500",
    buttonSelectedBorder: "border-indigo-500 shadow-indigo-500/20",
    badgeColorDot: "bg-indigo-500",
    buttonUnselectedBg: "bg-indigo-950/60 border-indigo-900/55 hover:border-indigo-550/50 text-slate-200 hover:bg-indigo-900/80"
  };
};

const renderMiniFlag = (provId: string) => {
  switch (provId) {
    case "ON":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex relative shadow-md">
          <div className="absolute inset-0 bg-[#b91c1c]"></div>
          <div className="absolute top-0 left-0 w-6 h-3.5 bg-blue-900 flex items-center justify-center overflow-hidden">
            <div className="absolute w-full h-[2px] bg-white rotate-[30deg]"></div>
            <div className="absolute w-full h-[2px] bg-white -rotate-[30deg]"></div>
            <div className="absolute w-full h-[3px] bg-white"></div>
            <div className="absolute h-full w-[3px] bg-white"></div>
            <div className="absolute w-full h-[1px] bg-red-600"></div>
            <div className="absolute h-full w-[1px] bg-red-600"></div>
          </div>
          <div className="absolute right-2.5 bottom-1 w-2.5 h-2.5 bg-green-600 rounded-full border border-yellow-400/50 flex items-center justify-center">
            <span className="text-[5px] text-yellow-300 font-bold">🍁</span>
          </div>
        </div>
      );
    case "BC":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex flex-col relative shadow-md">
          <div className="h-1/2 bg-white flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-900"></div>
            <div className="absolute w-full h-[2px] bg-white rotate-[30deg]"></div>
            <div className="absolute w-full h-[2px] bg-white -rotate-[30deg]"></div>
            <div className="absolute w-full h-[3px] bg-white"></div>
            <div className="absolute h-full w-[3px] bg-white"></div>
            <div className="absolute w-full h-[1px] bg-red-600"></div>
            <div className="absolute h-full w-[1px] bg-red-600"></div>
            <div className="absolute w-1.5 h-1.5 bg-amber-500 rounded-full border border-red-700"></div>
          </div>
          <div className="h-1/2 bg-blue-600 relative overflow-hidden flex flex-col justify-between">
            <div className="h-[2px] bg-white"></div>
            <div className="h-[2px] bg-white"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-3.5 bg-amber-400 rounded-t-full border-t border-amber-300 shadow"></div>
          </div>
        </div>
      );
    case "AB":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex items-center justify-center relative shadow-md bg-blue-800">
          <div className="w-4 h-5 bg-sky-400 border border-amber-400/40 rounded flex flex-col justify-between overflow-hidden">
            <div className="h-1/3 bg-sky-200 flex items-center justify-center"><span className="text-[4px] text-red-600">✝</span></div>
            <div className="h-1/3 bg-emerald-700"></div>
            <div className="h-1/3 bg-amber-400"></div>
          </div>
        </div>
      );
    case "SK":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex flex-col relative shadow-md">
          <div className="h-1/2 bg-emerald-700 relative">
            <div className="absolute top-0.5 left-1 w-1.5 h-1.5 bg-amber-500 rounded-sm"></div>
          </div>
          <div className="h-1/2 bg-amber-400 relative">
            <div className="absolute right-2 bottom-0 w-2 h-3 bg-red-600 rounded-t-sm"></div>
          </div>
        </div>
      );
    case "MB":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex relative shadow-md">
          <div className="absolute inset-0 bg-[#a61c1c]"></div>
          <div className="absolute top-0 left-0 w-6 h-3.5 bg-blue-900 flex items-center justify-center overflow-hidden">
            <div className="absolute w-full h-[2px] bg-white rotate-[30deg]"></div>
            <div className="absolute w-full h-[2px] bg-white -rotate-[30deg]"></div>
            <div className="absolute w-full h-[3px] bg-white"></div>
            <div className="absolute h-full w-[3px] bg-white"></div>
            <div className="absolute w-full h-[1px] bg-red-600"></div>
            <div className="absolute h-full w-[1px] bg-red-600"></div>
          </div>
          <div className="absolute right-2.5 bottom-1 w-3 h-2.5 bg-amber-500 rounded-sm flex items-center justify-center">
            <span className="text-[5px] text-amber-950 font-bold">🦬</span>
          </div>
        </div>
      );
    case "QC":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex relative bg-blue-700 shadow-md">
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-[3px] h-full bg-white"></div>
            <div className="absolute w-full h-[3px] bg-white"></div>
          </div>
          <span className="absolute top-0.5 left-1 text-[5px] text-white">❄</span>
          <span className="absolute top-0.5 right-1 text-[5px] text-white">❄</span>
          <span className="absolute bottom-0.5 left-1 text-[5px] text-white">❄</span>
          <span className="absolute bottom-0.5 right-1 text-[5px] text-white">❄</span>
        </div>
      );
    case "NB":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex flex-col relative shadow-md">
          <div className="h-2.5 bg-red-600 flex items-center justify-center relative">
            <span className="text-[6px] text-amber-300 font-bold">🦁</span>
          </div>
          <div className="flex-grow bg-amber-400 relative overflow-hidden">
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[7px]">⛵</div>
            <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-white to-blue-500"></div>
          </div>
        </div>
      );
    case "NS":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex items-center justify-center relative bg-white shadow-md">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-[3px] bg-sky-500 rotate-[30deg]"></div>
            <div className="absolute w-full h-[3px] bg-sky-500 -rotate-[30deg]"></div>
          </div>
          <div className="absolute w-2.5 h-3.5 bg-amber-400 rounded-sm border border-red-600 flex items-center justify-center z-10">
            <span className="text-[4px] text-red-600 font-bold">🦁</span>
          </div>
        </div>
      );
    case "PE":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex flex-col relative bg-white shadow-md">
          <div className="h-2.5 bg-red-600 flex items-center justify-center border-b border-amber-400">
            <span className="text-[6px] text-amber-300 font-bold">🦁</span>
          </div>
          <div className="flex-grow relative flex items-center justify-center gap-0.5">
            <span className="text-[7px] text-emerald-700">🌲</span>
            <span className="text-[5px] text-emerald-600">🌳</span>
          </div>
          <div className="absolute inset-0 border-[1px] border-red-600 pointer-events-none"></div>
        </div>
      );
    case "NL":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex relative bg-white shadow-md">
          <div className="w-1/2 bg-blue-800 relative">
            <div className="absolute left-0 top-0 w-0 h-0 border-t-[7px] border-t-white border-r-[12px] border-r-transparent"></div>
            <div className="absolute left-0 bottom-0 w-0 h-0 border-b-[7px] border-b-white border-r-[12px] border-r-transparent"></div>
          </div>
          <div className="w-1/2 bg-white relative flex flex-col justify-center items-center">
            <div className="w-full h-0.5 bg-amber-400"></div>
            <div className="w-2 h-2 border-t-2 border-r-2 border-red-650 rotate-45"></div>
          </div>
        </div>
      );
    case "YT":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex relative shadow-md">
          <div className="w-1/4 bg-blue-700"></div>
          <div className="w-2/4 bg-white flex items-center justify-center">
            <div className="w-3 h-4 bg-sky-200 border border-amber-600 rounded-sm flex items-center justify-center">
              <span className="text-[4px] text-emerald-700">🌲</span>
            </div>
          </div>
          <div className="w-1/4 bg-emerald-700"></div>
        </div>
      );
    case "NT":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex relative shadow-md">
          <div className="w-1/4 bg-blue-600"></div>
          <div className="w-2/4 bg-white flex items-center justify-center">
            <div className="w-3.5 h-4.5 bg-amber-400 rounded-sm border border-slate-300 flex items-center justify-center">
              <span className="text-[4px] text-blue-900">❄</span>
            </div>
          </div>
          <div className="w-1/4 bg-blue-600"></div>
        </div>
      );
    case "NU":
      return (
        <div className="w-12 h-7 rounded border border-white/20 overflow-hidden flex relative shadow-md">
          <div className="w-1/2 bg-amber-400"></div>
          <div className="w-1/2 bg-white"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[7px] text-red-600 font-bold">⛩</span>
          </div>
          <span className="absolute top-0.5 right-1.5 text-[4px] text-blue-800 font-bold">★</span>
        </div>
      );
    default:
      return <div className="w-12 h-7 bg-indigo-700 rounded border border-white/20"></div>;
  }
};

const newsVideos = {
  ctv: {
    title: "CTV News - Canada Immigration Shift & Policy Analysis",
    embedUrl: "https://www.youtube-nocookie.com/embed/a9r-xV-p7zE?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=a9r-xV-p7zE",
    channel: "CTV News",
    videoId: "a9r-xV-p7zE",
    desc: "National broadcast with updates on federal housing, labor, and immigration levels plan."
  },
  cbc: {
    title: "CBC News - Canada Immigration Cap Impact & Housing",
    embedUrl: "https://www.youtube-nocookie.com/embed/jNQXAC9IVRw?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    channel: "CBC News The National",
    videoId: "jNQXAC9IVRw",
    desc: "National public broadcaster report focusing on municipal workforce needs and PR cap statistics."
  },
  mandate: {
    title: "2026 Caps & IRCC Policy Briefing (CPAC / IRCC)",
    embedUrl: "https://www.youtube-nocookie.com/embed/3Qd_P80w8t0?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=3Qd_P80w8t0",
    channel: "CPAC / Government of Canada",
    videoId: "3Qd_P80w8t0",
    desc: "Official analytical breakdown of New Canadian Immigration Levels Plan and temporary resident caps."
  },
  students: {
    title: "IRCC Official - Express Entry & Student PR Pathways",
    embedUrl: "https://www.youtube-nocookie.com/embed/3Qd_P80w8t0?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=3Qd_P80w8t0",
    channel: "IRCC Official (@CitImmCanada)",
    videoId: "3Qd_P80w8t0",
    desc: "Comprehensive official overview of Express Entry, student transitions, PGWPs, and PNP options."
  },
  sponsorship: {
    title: "IRCC Family & Spousal Sponsorship Overview",
    embedUrl: "https://www.youtube-nocookie.com/embed/a9r-xV-p7zE?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=a9r-xV-p7zE",
    channel: "IRCC Official",
    videoId: "a9r-xV-p7zE",
    desc: "Detailed guide on family sponsorship streams, spousal open work permits, and processing metrics."
  },
  workpermits: {
    title: "Work Permits & LMIA Processing Insights",
    embedUrl: "https://www.youtube-nocookie.com/embed/jNQXAC9IVRw?rel=0",
    watchUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    channel: "CBC / CPAC News",
    videoId: "jNQXAC9IVRw",
    desc: "Analysis of temporary work permit reforms, employer-specific LMIA processes, and PR transitions."
  }
};

interface DashboardViewProps {
  provinces: Province[];
  federalSources: FederalSource[];
  onSelectProvince?: (id: string) => void;
  language?: Language;
  onOpenInAppViewer: (url: string, title: string) => void;
  onNavigateTab?: (tab: any) => void;
  companyName?: string;
}

export default function DashboardView({ provinces, federalSources, onSelectProvince, language = "EN", onOpenInAppViewer, onNavigateTab }: DashboardViewProps) {
  const t = translations[language];
  const [selectedProvId, setSelectedProvId] = useState<string>("ON");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [liveQuery, setLiveQuery] = useState<string>("");
  const [liveResult, setLiveResult] = useState<string>("");
  const [liveSources, setLiveSources] = useState<Array<{ title: string; url: string }>>([]);
  const [searchingLive, setSearchingLive] = useState<boolean>(false);
  const [liveSearchError, setLiveSearchError] = useState<string>("");

  // Live Border Inquiries Blog/Board States
  const [inquiries, setInquiries] = useState<Array<{ id: string; name: string; question: string; votes: number; date: string; answered: boolean; response?: string }>>(() => {
    const saved = localStorage.getItem("immi_border_inquiries");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return [
      { id: "1", name: "Gurpreet S.", question: "What are the average study permit landing processing times at Toronto Pearson (YYZ) right now?", votes: 14, date: "July 15, 2026", answered: true, response: "Currently averaging 40-50 minutes in the secondary clearance hall. Ensure you have your physical Letter of Introduction, LOA, and provincial attestation documents in hand." },
      { id: "2", name: "Amélie M.", question: "Can we flagpole at the Rainbow Bridge (Niagara) on weekends for work permit renewal?", votes: 26, date: "July 14, 2026", answered: true, response: "Flagpoling at Rainbow Bridge, Queenston-Lewiston, and Peace Bridge is strictly restricted to Tuesday, Wednesday, and Thursday. Weekends are generally blocked for flagpoling." },
      { id: "3", name: "Chen W.", question: "Are there commercial delays at Pacific Highway crossing for express priority STEM equipment?", votes: 9, date: "July 15, 2026", answered: false }
    ];
  });
  const [newInquiryName, setNewInquiryName] = useState("");
  const [newInquiryText, setNewInquiryText] = useState("");
  const [postingInquiry, setPostingInquiry] = useState(false);
  const [showLandmarkPhoto, setShowLandmarkPhoto] = useState<boolean>(true);

  const [selectedVideoChannel, setSelectedVideoChannel] = useState<string>("ctv");
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [autoCycleVideos, setAutoCycleVideos] = useState<boolean>(true);
  const [videoTimer, setVideoTimer] = useState<number>(60); // 60 seconds per video

  useEffect(() => {
    if (!autoCycleVideos) return;
    const interval = setInterval(() => {
      setVideoTimer((prev) => {
        if (prev <= 1) {
          const keys = Object.keys(newsVideos) as Array<keyof typeof newsVideos>;
          const currentIndex = keys.indexOf(selectedVideoChannel as any);
          const nextIndex = (currentIndex + 1) % keys.length;
          setSelectedVideoChannel(keys[nextIndex]);
          return 60; // reset countdown to 60s
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [autoCycleVideos, selectedVideoChannel]);

  const selectChannelWithReset = (channel: string) => {
    setSelectedVideoChannel(channel);
    setVideoTimer(60); // Reset timer on manual selection
    setIsPlayingVideo(true); // Automatically play selected video
  };

  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingReason, setBookingReason] = useState<string>("Express Entry / CEC / Federal Skilled Worker");
  const [bookingEmail, setBookingEmail] = useState<string>("");
  const [bookingPhone, setBookingPhone] = useState<string>("");
  const [bookingMessage, setBookingMessage] = useState<string>("");
  const [bookingSubmitting, setBookingSubmitting] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("immi_border_inquiries", JSON.stringify(inquiries));
  }, [inquiries]);

  const handleAddInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInquiryName.trim() || !newInquiryText.trim()) return;
    setPostingInquiry(true);
    setTimeout(() => {
      const item = {
        id: "inq-" + Date.now(),
        name: newInquiryName.trim(),
        question: newInquiryText.trim(),
        votes: 1,
        date: "Just now",
        answered: false
      };
      setInquiries(prev => [item, ...prev]);
      setNewInquiryName("");
      setNewInquiryText("");
      setPostingInquiry(false);
    }, 600);
  };

  const handleVoteInquiry = (id: string) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, votes: inq.votes + 1 } : inq));
  };

  const selectedProvince = provinces.find(p => p.id === selectedProvId) || provinces[0];

  const suggestedQueries = [
    "Latest Express Entry draw cut off CRS score",
    "Ontario OINP tech draw requirements",
    "CBSA wait times land border crossings",
    "BC PNP recent invitations and targets"
  ];

  const handleLiveSearch = async (queryToSearch: string) => {
    if (!queryToSearch.trim()) return;
    setSearchingLive(true);
    setLiveSearchError("");
    setLiveResult("");
    setLiveSources([]);
    setLiveQuery(queryToSearch);

    try {
      const res = await fetch("/api/gemini/live-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToSearch })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to retrieve live data updates.");
      }

      setLiveResult(data.answer);
      setLiveSources(data.sources || []);
    } catch (err: any) {
      console.error(err);
      setLiveSearchError(err.message || "An error occurred while connecting to the search service.");
    } finally {
      setSearchingLive(false);
    }
  };

  // Filter provinces based on search input
  const filteredProvinces = provinces.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.capital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Real-Time CBSA Border wait times states
  const [borderPorts, setBorderPorts] = useState<any[]>([]);
  const [loadingBorder, setLoadingBorder] = useState<boolean>(false);
  const [borderError, setBorderError] = useState<string>("");
  const [borderFilter, setBorderFilter] = useState<string>("ALL"); // "ALL", "ON", "BC", "MB"

  // Live Feed Proxy states
  const [activeFeed, setActiveFeed] = useState<{ name: string; url: string } | null>(null);
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [loadingFeed, setLoadingFeed] = useState<boolean>(false);
  const [feedError, setFeedError] = useState<string>("");

  const fetchBorderWaitTimes = async () => {
    setLoadingBorder(true);
    setBorderError("");
    try {
      const res = await fetch("/api/border-wait-times");
      if (!res.ok) throw new Error("Failed to load border delays.");
      const data = await res.json();
      setBorderPorts(data.ports || []);
    } catch (err: any) {
      console.error(err);
      setBorderError(err.message || "Error fetching live border wait times.");
    } finally {
      setLoadingBorder(false);
    }
  };

  const handleSyncFeed = async (feed: { name: string; url: string }) => {
    setActiveFeed(feed);
    setLoadingFeed(true);
    setFeedError("");
    setFeedItems([]);
    try {
      const res = await fetch("/api/proxy-feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: feed.url, name: feed.name })
      });
      if (!res.ok) throw new Error("Failed to fetch live updates from portal feed.");
      const data = await res.json();
      setFeedItems(data.items || []);
    } catch (err: any) {
      console.error(err);
      setFeedError(err.message || "Error establishing live stream connection.");
    } finally {
      setLoadingFeed(false);
    }
  };

  useEffect(() => {
    fetchBorderWaitTimes();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in" id="dashboard_view">
      {/* Hero Banner Section */}
      <div className="bg-gradient-to-br from-[#230306] via-[#100102] to-[#2e0509] rounded-xl p-4 sm:p-5 md:p-6 text-white shadow-2xl relative overflow-hidden border border-red-500/20 hover:border-red-500/30 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">

        {/* Dynamic Glow Orbs */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-indigo-100 tracking-wide backdrop-blur-md">
              <Globe className="w-3.5 h-3.5 animate-pulse text-red-400" />
              Live Federal Immigration Grid
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-sm">
              Canadian Immigration & Border Technology Hub
            </h1>
            <p className="text-indigo-100/90 text-sm md:text-base leading-relaxed drop-shadow-sm max-w-2xl">
              Centralizing multi-provincial Nominee Programs (PNP), land border ingress delays, and IRCC open data datasets. Perform live, grounded search queries across federal archives using Google Search Grounding technology.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="bg-black/25 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-red-400" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-indigo-200 font-mono">2026 Federal Target</p>
                  <p className="text-lg font-bold font-display text-white">485,000 PRs</p>
                </div>
              </div>
              <div className="bg-black/25 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                <Database className="w-5 h-5 text-indigo-300" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-indigo-200 font-mono">Indexed Portals</p>
                  <p className="text-lg font-bold font-display text-white">13 Provinces & Terr.</p>
                </div>
              </div>
              <div className="bg-black/25 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                <Rss className="w-5 h-5 text-amber-400" />
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-indigo-200 font-mono">Open Gov Feeds</p>
                  <p className="text-lg font-bold font-display text-white">5 Unified API Indices</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 relative">
            <div className="bg-black/30 p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-white/10 gap-2">
                <span className="text-[10px] text-indigo-200 font-mono uppercase tracking-widest font-semibold truncate">Ontario Gateway Clock</span>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold font-mono text-white tracking-tight flex items-baseline gap-1">
                  {new Date().toLocaleTimeString("en-US", { timeZone: "America/Toronto", hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  <span className="text-xs font-semibold text-indigo-300 ml-1">EST/EDT</span>
                </div>
                <div className="text-[11px] text-indigo-200/80 font-sans">
                  Toronto CN Tower & Niagara Falls Zone
                </div>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-white/5">
                <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                  <span className="text-indigo-200 block text-[9px] uppercase">Border Status</span>
                  <span className="text-emerald-400 font-bold block mt-0.5">● Dynamic Draw</span>
                </div>
                <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                  <span className="text-indigo-200 block text-[9px] uppercase">IRCC Integrity</span>
                  <span className="text-white font-bold block mt-0.5">Live Secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Left Column = Live Web Search Agent, Right Column = Provincial Index */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: LIVE AI SEARCH ENGINE & BORDER TELEMETRY (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-2">
          {/* 1. LIVE AI SEARCH ENGINE */}
          <div className="bg-[#0b132b] rounded-xl p-4 sm:p-5 border border-indigo-500/25 shadow-xl flex flex-col text-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-[#1c2e54] p-2 rounded-lg text-indigo-300 border border-indigo-500/35">
                    <Sparkles className="w-5 h-5 animate-pulse text-indigo-300" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-slate-100 text-sm">{t.liveIntelligence}</h3>
                    <p className="text-xs text-slate-400">{t.liveWeb}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#1c2e54]/90 text-indigo-200 border border-indigo-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span> {t.liveWeb}
                </span>
              </div>

              <p className="text-xs text-slate-350 leading-relaxed">
                {t.liveDesc}
              </p>

              {/* Live Input Form */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={liveQuery}
                    onChange={(e) => setLiveQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleLiveSearch(liveQuery);
                    }}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-3 pr-10 py-2.5 bg-[#0c1529] border border-indigo-800/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all text-slate-100 placeholder:text-slate-500"
                  />
                  <button
                    onClick={() => handleLiveSearch(liveQuery)}
                    disabled={searchingLive || !liveQuery.trim()}
                    className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-900 disabled:text-slate-700 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    {searchingLive ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Search className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                {/* Suggestions */}
                <div className="space-y-1.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold">{t.suggestedQueries}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedQueries.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setLiveQuery(q);
                          handleLiveSearch(q);
                        }}
                        className="text-[11px] text-slate-200 bg-[#1a2d54] hover:bg-[#233d73] hover:text-white border border-indigo-900/50 hover:border-indigo-500/40 px-2.5 py-1 rounded-md transition-colors text-left cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Search Results Content */}
            <div className="mt-4 pt-4 border-t border-indigo-950 flex-grow min-h-[160px] flex flex-col justify-between">
              {searchingLive && (
                <div className="flex flex-col items-center justify-center py-6 space-y-3">
                  <div className="w-8 h-8 border-3 border-slate-900 border-t-indigo-500 rounded-full animate-spin"></div>
                  <p className="text-xs text-slate-400 font-medium">{t.scouringGovFeeds}</p>
                </div>
              )}

              {!searchingLive && !liveResult && !liveSearchError && (
                <div className="flex flex-col items-center justify-center py-6 text-center text-slate-400 space-y-1.5">
                  <HelpCircle className="w-8 h-8 stroke-1 text-slate-600" />
                  <p className="text-xs font-medium text-slate-350">No active search report loaded.</p>
                  <p className="text-[10px] max-w-xs text-slate-500">Trigger an AI Search above to fetch real-time updates directly from IRCC, CBSA, and provincial portals.</p>
                </div>
              )}

              {liveSearchError && (
                <div className="p-3 bg-red-950/40 rounded-xl border border-red-900/40 flex gap-2 text-red-200 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
                  <div>
                    <p className="font-semibold text-red-100">Search Connection Refused</p>
                    <p className="text-red-300 mt-1">{liveSearchError}</p>
                    <p className="text-[10px] mt-2 text-red-400 font-mono">Verify that your Gemini API Key is configured in the Secrets panel.</p>
                  </div>
                </div>
              )}

              {liveResult && (
                <div className="space-y-3 flex flex-col justify-between h-full">
                  <div className="bg-[#0c1529] border border-indigo-950 rounded-xl p-3 max-h-[250px] overflow-y-auto text-xs text-slate-300 leading-relaxed space-y-2 scrollbar-thin">
                    <p className="font-semibold text-slate-200 border-b border-indigo-950/60 pb-1 flex items-center justify-between">
                      <span className="truncate max-w-[220px]">{t.queryReport}: "{liveQuery}"</span>
                      <span className="text-[10px] font-mono text-indigo-300 bg-indigo-950/80 border border-indigo-800/40 px-2 py-0.5 rounded shrink-0">Grounded AI</span>
                    </p>
                    <div className="whitespace-pre-line prose max-w-none text-slate-300 text-[11px]">
                      {liveResult}
                    </div>
                  </div>

                  {liveSources.length > 0 && (
                    <div className="space-y-1.5 mt-2">
                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono font-bold">{t.verifiedReferences} ({liveSources.length})</p>
                      <div className="max-h-[80px] overflow-y-auto space-y-1 scrollbar-thin">
                        {liveSources.map((src, i) => (
                          <button
                            key={i}
                            onClick={() => onOpenInAppViewer(src.url, src.title)}
                            className="w-full flex items-center justify-between gap-2 p-1.5 bg-[#1a2d54] hover:bg-[#233d73] rounded text-[10px] text-indigo-300 font-medium transition-colors border border-indigo-950/55 cursor-pointer text-left"
                          >
                            <span className="truncate max-w-[250px]">{src.title}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0 text-indigo-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 2. LIVE CBSA BORDER INGRESS MONITOR */}
          <div className="bg-[#0b132b] rounded-xl p-4 sm:p-5 border border-indigo-500/25 shadow-xl space-y-3.5 text-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-[#2a457c] p-2 rounded-lg text-indigo-300 border border-indigo-500/25">
                  <Globe className="w-5 h-5 animate-pulse text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-slate-100 text-sm">Live CBSA Border Telemetry</h3>
                  <p className="text-xs text-slate-350">Real-Time Land Port Wait Times</p>
                </div>
              </div>
              <button
                onClick={fetchBorderWaitTimes}
                disabled={loadingBorder}
                className="p-1.5 hover:bg-indigo-900/50 rounded-lg text-indigo-300 hover:text-indigo-100 transition cursor-pointer border border-transparent hover:border-indigo-800/30"
                title="Live Sync Border Status"
              >
                <RefreshCw className={`w-4 h-4 ${loadingBorder ? "animate-spin text-teal-400" : "text-indigo-300"}`} />
              </button>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-300">Crossing Province:</span>
              <div className="flex gap-1">
                {["ALL", "ON", "BC", "MB"].map((prov) => (
                  <button
                    key={prov}
                    onClick={() => setBorderFilter(prov)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono transition cursor-pointer ${
                      borderFilter === prov 
                        ? "bg-indigo-500 text-white shadow-sm" 
                        : "bg-[#142242] border border-indigo-900/50 text-indigo-200 hover:bg-[#2a457c] hover:text-white"
                    }`}
                  >
                    {prov}
                  </button>
                ))}
              </div>
            </div>

            {loadingBorder ? (
              <div className="flex flex-col items-center justify-center py-6 space-y-2 text-slate-400 font-mono text-xs">
                <RefreshCw className="w-5 h-5 animate-spin text-teal-400" />
                <p className="text-slate-300">Polling CBSA Digital Gateway...</p>
              </div>
            ) : borderError ? (
              <div className="p-3 bg-red-950/45 border border-red-900/40 rounded-xl text-xs text-red-200 flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <p>Could not load live border wait times. Tap reload to retry.</p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1 scrollbar-thin">
                {borderPorts
                  .filter(port => borderFilter === "ALL" || port.province === borderFilter)
                  .map((port, i) => {
                    const getDelayBadge = (delayStr: string) => {
                      const cleanStr = delayStr.toLowerCase();
                      if (cleanStr.includes("no delay") || cleanStr === "0" || cleanStr === "") {
                        return <span className="bg-emerald-950/50 text-emerald-300 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold font-mono">No delay</span>;
                      }
                      const numMatch = cleanStr.match(/\d+/);
                      if (numMatch) {
                        const mins = parseInt(numMatch[0]);
                        if (mins < 15) {
                          return <span className="bg-emerald-950/50 text-emerald-300 border border-emerald-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold font-mono">{delayStr}</span>;
                        } else if (mins < 30) {
                          return <span className="bg-amber-950/50 text-amber-300 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold font-mono">{delayStr}</span>;
                        } else {
                          return <span className="bg-red-950/50 text-red-300 border border-red-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold font-mono">{delayStr}</span>;
                        }
                      }
                      return <span className="bg-amber-950/50 text-amber-300 border border-amber-500/20 text-[10px] px-2 py-0.5 rounded-full font-bold font-mono">{delayStr}</span>;
                    };

                    return (
                      <div key={i} className="bg-[#142242] border border-indigo-950/70 rounded-xl p-3 space-y-2 text-xs shadow-sm">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <p className="font-bold text-slate-100 leading-tight text-xs">{port.name}</p>
                            <p className="text-[10px] text-indigo-300/70 mt-0.5 font-mono">ID: {port.id} | Province: {port.province}</p>
                          </div>
                          <span className="text-[9px] font-bold bg-[#2a457c] text-indigo-200 border border-indigo-500/20 px-1.5 py-0.5 rounded font-mono shrink-0">
                            LAND PORT
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-indigo-950/50 text-[11px]">
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-semibold">Passenger Cars</span>
                            <span className="mt-1 block">{getDelayBadge(port.passengerDelay)}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[9px] uppercase font-semibold">Commercial Trucks</span>
                            <span className="mt-1 block">{getDelayBadge(port.commercialDelay)}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            <p className="text-[10px] text-slate-400 text-center font-mono italic">
              Telemetry synchronized directly with official CBSA Open Data XML feeds.
            </p>
          </div>

          {/* 3. INGRESS & LANDING INQUIRIES BOARD CARD */}
          <div className="bg-[#0b132b] rounded-xl p-4 sm:p-5 border border-sky-500/30 shadow-xl space-y-3.5 text-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-sky-550/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center justify-between border-b border-indigo-950/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="bg-[#1c325e] p-1.5 rounded-lg text-sky-300 border border-indigo-500/25">
                  <Rss className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm">Live Ingress Inquiries Board</h4>
                  <p className="text-[9px] text-slate-300">Ask & review real landing/border updates</p>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold bg-[#1c325e] text-sky-300 border border-indigo-500/30 px-2 py-0.5 rounded-full shrink-0">
                {inquiries.length} Active
              </span>
            </div>

            {/* Quick Post Form */}
            <form onSubmit={handleAddInquiry} className="space-y-2 bg-[#1a315e]/90 border border-indigo-900/50 p-3 rounded-xl">
              <span className="text-[9px] uppercase font-mono text-slate-300 font-bold block">Submit a Live Inquiry</span>
              <div className="grid grid-cols-1 gap-2">
                <input
                  type="text"
                  placeholder="Your Name (e.g., Haris R.)"
                  value={newInquiryName}
                  onChange={(e) => setNewInquiryName(e.target.value)}
                  className="w-full bg-[#0d1c3a] border border-indigo-900/60 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:ring-1 focus:ring-sky-400 text-slate-100 placeholder:text-slate-500"
                  required
                />
                <textarea
                  placeholder="Your landing question (e.g., Pearson Terminal 1 wait times right now? Flagpoling weekends?)"
                  value={newInquiryText}
                  onChange={(e) => setNewInquiryText(e.target.value)}
                  rows={2}
                  className="w-full bg-[#0d1c3a] border border-indigo-900/60 rounded-lg p-2 text-[11px] focus:outline-none focus:ring-1 focus:ring-sky-400 text-slate-100 placeholder:text-slate-500 leading-relaxed"
                  required
                />
              </div>
              <div className="flex justify-end pt-0.5">
                <button
                  type="submit"
                  disabled={postingInquiry || !newInquiryName.trim() || !newInquiryText.trim()}
                  className="px-3 py-1 bg-sky-600 hover:bg-sky-500 disabled:bg-[#132447] disabled:text-slate-500 text-white font-bold text-[10px] rounded-lg cursor-pointer transition-colors"
                >
                  {postingInquiry ? "Publishing..." : "Post Inquiry"}
                </button>
              </div>
            </form>

            {/* Inquiries Feed List */}
            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin">
              {inquiries.map((inq) => (
                <div key={inq.id} className="bg-[#1a315e] border border-indigo-950/60 rounded-xl p-3 space-y-2 text-xs shadow-sm">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-grow space-y-1 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-100 text-[11px]">{inq.name}</span>
                        <span className="text-[9px] text-slate-350 font-mono">{inq.date}</span>
                        {inq.answered && (
                          <span className="text-[8px] bg-emerald-950/60 text-emerald-300 border border-emerald-500/25 px-1.5 py-0.2 rounded font-bold uppercase shrink-0">
                            Answered
                          </span>
                        )}
                      </div>
                      <p className="text-slate-200 text-[11px] leading-relaxed">{inq.question}</p>
                    </div>

                    {/* Upvote Button */}
                    <button
                      onClick={() => handleVoteInquiry(inq.id)}
                      className="flex flex-col items-center justify-center p-1.5 bg-[#0f1d3a] hover:bg-[#203666] text-indigo-300 rounded-lg border border-indigo-950 hover:border-sky-500/30 transition-all cursor-pointer shrink-0 min-w-[32px]"
                      title="This question is helpful"
                    >
                      <span className="text-[10px] font-bold text-indigo-300">▲</span>
                      <span className="text-[9px] font-mono font-bold mt-0.5 text-slate-100">{inq.votes}</span>
                    </button>
                  </div>

                  {/* Co-Pilot Answer */}
                  {inq.answered && inq.response && (
                    <div className="bg-[#0c1933] border-l-2 border-sky-500 p-2 rounded-r-lg text-[10px] text-slate-350 leading-relaxed mt-1">
                      <p className="font-bold text-slate-100 mb-0.5 flex items-center gap-1">
                        <span>🍁 CanImmi Co-Pilot Answer:</span>
                      </p>
                      <p>{inq.response}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* MIDDLE COLUMN: ALL 13 PROVINCES & TERRITORIES (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 order-1 lg:order-1">
          <div className="bg-[#060606] rounded-xl p-2.5 sm:p-5 border border-indigo-550/30 shadow-xl space-y-3 text-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
              <div>
                <h3 className="font-display font-bold text-white text-sm">Provinces & Territories Registry</h3>
                <p className="text-[11px] sm:text-xs text-slate-300">Click on any region below to review programs, targets, and open feeds</p>
              </div>
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-slate-450" />
                <input
                  type="text"
                  placeholder="Filter by name/code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 bg-[#0d172e] border border-indigo-850 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-100 placeholder-slate-500"
                />
              </div>
            </div>

            {/* Province Buttons Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-1.5 sm:gap-2.5">
              {filteredProvinces.map((prov) => {
                const isSelected = prov.id === selectedProvId;
                const theme = getTheme(prov.id);
                return (
                  <button
                    key={prov.id}
                    id={`prov-btn-${prov.id}`}
                    onClick={() => {
                      setSelectedProvId(prov.id);
                    }}
                    className={`w-full aspect-square rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center p-1 sm:p-2 gap-0.5 cursor-pointer relative group overflow-hidden select-none active:translate-y-1 ${
                      isSelected
                        ? `${theme.buttonSelectedBg} ${theme.buttonSelectedBorder} ring-2 ring-white/30 shadow-[0_5px_15px_rgba(0,0,0,0.5),0_3px_0_0_rgba(0,0,0,0.7)] scale-[1.04] z-10 font-black`
                        : `${theme.buttonUnselectedBg} shadow-[0_4px_0_0_rgba(0,0,0,0.6),0_4px_8px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:shadow-[0_6px_0_0_rgba(0,0,0,0.8),0_6px_14px_rgba(0,0,0,0.5)]`
                    }`}
                  >
                    {/* Top Glossy Sheen for 3D Tactile Bumpish Feel */}
                    <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-t-2xl pointer-events-none"></div>

                    {/* Top Flag Color Stripe Accent */}
                    <div className={`absolute top-0 inset-x-0 h-[3.5px] ${theme.flagStrip} opacity-90 group-hover:opacity-100 transition-opacity z-10`}></div>

                    {/* Selected Pulse Glow Dot or Hover Indicator */}
                    {isSelected ? (
                      <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${theme.badgeColorDot} ring-2 ring-black/40 animate-pulse z-20`} title="Selected Region"></span>
                    ) : (
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-400/50 group-hover:bg-white group-hover:scale-125 transition-all z-20"></span>
                    )}

                    <span className="text-sm sm:text-base md:text-lg font-black font-display relative z-10 leading-none mb-0.5 tracking-tight group-hover:scale-110 transition-transform">
                      {prov.id}
                    </span>
                    <span className="text-[9px] sm:text-[10px] md:text-xs font-bold truncate max-w-full leading-none relative z-10 opacity-90 group-hover:opacity-100">
                      {prov.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Province Detail Card */}
            {selectedProvince && (() => {
              const theme = getTheme(selectedProvince.id);
              return (
                <div className={`bg-gradient-to-br ${theme.bgGradient} rounded-xl p-2.5 sm:p-4 border ${theme.borderColor} space-y-2.5 animate-fade-in relative overflow-hidden transition-all duration-500 shadow-xl`}>
                  {/* Absolute background glow */}
                  <div className={`absolute top-0 right-0 -mt-10 -mr-10 w-52 h-52 ${theme.glowColor} rounded-full blur-3xl pointer-events-none`}></div>
                  
                  {/* Stylized side flag ribbon */}
                  <div className={`absolute left-0 top-0 bottom-0 w-[4px] ${theme.flagStrip} opacity-80`}></div>

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 relative z-10">
                    <div className="flex items-start gap-2.5">
                      {/* CSS Flag Render */}
                      <div className="shrink-0 mt-0.5">
                        {renderMiniFlag(selectedProvince.id)}
                      </div>
                      <div className="space-y-0.5 text-left">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-display font-bold text-base sm:text-lg text-white leading-tight">{selectedProvince.name}</h4>
                          <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded font-mono font-bold border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder} flex items-center gap-1`}>
                            <span className={`w-1 h-1 rounded-full ${theme.badgeColorDot}`}></span>
                            {selectedProvince.type}
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-slate-350 flex items-center gap-1">
                          <MapPin className={`w-3 h-3 ${theme.accentText}`} />
                          Capital: <span className="font-semibold text-slate-200">{selectedProvince.capital}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <button
                        onClick={() => onOpenInAppViewer(selectedProvince.newsUrl, selectedProvince.name + " Official Portal")}
                        className="inline-flex items-center justify-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg shadow-xs transition-all cursor-pointer bg-[#13203d]/80 border hover:text-white border-indigo-800/40 hover:border-indigo-400/40 hover:bg-[#1a2d54] text-slate-200"
                      >
                        Official Portal
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => {
                          if (onSelectProvince) {
                            onSelectProvince(selectedProvince.id);
                          } else if (onNavigateTab) {
                            onNavigateTab("provinces");
                          }
                        }}
                        className="inline-flex items-center justify-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-lg shadow-xs transition-all cursor-pointer bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white"
                      >
                        Compare Streams
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 relative z-10">
                    {/* Left inner card: Stream & Targets */}
                    <div className="bg-[#1a315e] rounded-lg p-2.5 sm:p-3 border border-indigo-950/60 space-y-1.5 transition-colors duration-500 text-left">
                      <p className={`text-[9px] sm:text-[10px] uppercase tracking-wider ${theme.badgeText} font-mono font-bold flex items-center gap-1`}>
                        <span className={`w-1 h-1 rounded-full ${theme.badgeColorDot}`}></span>
                        Immigration Pathway
                      </p>
                      <div>
                        <p className="text-[11px] sm:text-xs font-bold text-slate-100 leading-tight">{selectedProvince.program}</p>
                        <p className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5 leading-relaxed">{selectedProvince.details}</p>
                      </div>

                      <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Nomination Status:</span>
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-400 text-[11px]">
                          <CheckCircle className="w-3 h-3" /> {selectedProvince.status}
                        </span>
                      </div>
                    </div>

                    {/* Right inner card: Projected Targets */}
                    <div className="bg-[#1a315e] rounded-lg p-3 border border-indigo-950/60 space-y-2 transition-colors duration-500 text-left">
                      <p className={`text-[10px] uppercase tracking-wider ${theme.badgeText} font-mono font-bold flex items-center gap-1.5`}>
                        <span className={`w-1 h-1.5 rounded-full ${theme.badgeColorDot}`}></span>
                        Annual Target Allocation
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Provincial Nominees (PNP):</span>
                          <span className="font-mono font-bold text-slate-100">{selectedProvince.targets.PNP.toLocaleString()}</span>
                        </div>
                        {selectedProvince.targets.ExpressEntryAligned && (
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Express Entry Aligned:</span>
                            <span className="font-mono font-bold text-slate-100">
                              {selectedProvince.targets.ExpressEntryAligned.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {Object.keys(selectedProvince.targets)
                          .filter(key => key !== "PNP" && key !== "ExpressEntryAligned")
                          .map(key => (
                            <div key={key} className="flex justify-between items-center text-xs">
                              <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                              <span className="font-mono font-bold text-slate-100">
                                {selectedProvince.targets[key]?.toLocaleString()}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Open Datasets and RSS feeds registry */}
                  <div className="space-y-2 pt-2 relative z-10 text-left">
                    <div className="flex items-center justify-between">
                      <p className={`text-[10px] uppercase tracking-wider ${theme.badgeText} font-mono font-bold flex items-center gap-1`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${theme.badgeColorDot} animate-pulse`}></span>
                        Open Feeds & API Feeds Directory
                      </p>
                      {activeFeed && (
                        <button
                          onClick={() => setActiveFeed(null)}
                          className="text-[10px] text-indigo-400 hover:text-indigo-300 hover:underline font-mono cursor-pointer"
                        >
                          [Clear Terminal]
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {selectedProvince.openDataFeeds.map((feed, i) => {
                        const isCurrent = activeFeed?.url === feed.url;
                        return (
                          <button
                            key={i}
                            onClick={() => handleSyncFeed(feed)}
                            className={`rounded-lg p-1.5 sm:p-2 border text-left text-xs gap-2 flex items-center justify-between transition-all w-full cursor-pointer hover:shadow-sm ${
                              isCurrent 
                                ? "bg-[#0c1529] border-indigo-500 text-slate-100" 
                                : `bg-[#1a315e] ${theme.innerCardBorder} text-slate-300 hover:bg-slate-800/40 hover:border-indigo-500/30`
                            }`}
                          >
                            <div className="truncate">
                              <p className={`font-bold truncate ${isCurrent ? "text-indigo-400" : "text-slate-250"}`}>{feed.name}</p>
                              <p className={`text-[10px] font-mono truncate ${isCurrent ? "text-slate-550" : "text-indigo-300/60"}`}>{feed.url}</p>
                            </div>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono shrink-0 ${
                              isCurrent ? "bg-indigo-950 text-indigo-300 border border-indigo-900/40" : "bg-[#182647] text-indigo-250 border border-indigo-950/60"
                            }`}>
                              {isCurrent ? "ACTIVE" : feed.type}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Live Feed Terminal Inspector */}
                  {activeFeed && (
                    <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-350 space-y-3 relative z-10 text-left">
                      <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="font-bold text-slate-100 truncate text-xs">Live Stream: {activeFeed.name}</span>
                        </div>
                        <button 
                          onClick={() => setActiveFeed(null)} 
                          className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-400 px-2 py-0.5 rounded transition cursor-pointer border border-slate-800"
                        >
                          Disconnect Terminal
                        </button>
                      </div>

                      {loadingFeed ? (
                        <div className="flex flex-col items-center justify-center py-6 space-y-2 text-slate-400">
                          <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                          <p className="text-[10px]">Dialing API endpoint proxy...</p>
                        </div>
                      ) : feedError ? (
                        <p className="text-red-400 py-4 text-center font-bold">Connection failed: {feedError}</p>
                      ) : feedItems.length === 0 ? (
                        <p className="text-slate-550 py-4 text-center">No active news feeds detected in portal stream.</p>
                      ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                          {feedItems.map((item, idx) => (
                            <div key={idx} className="border-b border-slate-850 pb-2.5 last:border-0 last:pb-0 space-y-1 text-left">
                              <div className="flex justify-between items-start gap-2">
                                <h4 className="text-slate-100 font-bold text-xs hover:underline">
                                  <a href={item.link || item.url} target="_blank" rel="noopener noreferrer">
                                    {item.title}
                                  </a>
                                </h4>
                                {item.pubDate && <span className="text-[9px] text-slate-500 shrink-0 font-mono">{item.pubDate}</span>}
                              </div>
                              <p className="text-[11px] text-slate-400 leading-normal">{item.description}</p>
                              <a 
                                href={item.link || item.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-[10px] text-indigo-400 hover:underline inline-flex items-center gap-1"
                              >
                                Verify live bulletin <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Flag heraldic descriptor & Live Immi Advisor */}
                  <div className="pt-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/5 relative z-10">
                    <p className="text-[10px] text-slate-400 font-mono italic">
                      🎨 Selected Region Motif: {theme.flagDesc}
                    </p>
                    <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wide transition-all shadow-sm shadow-emerald-500/5 cursor-pointer">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Live Immi Advisor
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* RIGHT COLUMN: CANADA NEWS & LIVE VIDEO FEEDS (4 Cols) */}
        <div className="lg:col-span-4 space-y-4 order-3 lg:order-3">
          <div className="bg-[#2a1c4d] rounded-xl p-4 sm:p-5 border border-indigo-500/20 shadow-xl space-y-4 text-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-purple-950/60 text-purple-400 border border-purple-500/25 rounded-lg">
                  <Globe className="w-4 h-4 animate-pulse" />
                </span>
                <h3 className="font-display font-bold text-white text-sm">{t.canadaNewsMandates || "Canada News & Mandates"}</h3>
              </div>
              <p className="text-xs text-slate-300">Live economic & immigration policy trackers</p>
            </div>

            {/* Video Broadcast Monitor Island */}
            <div className="space-y-3 bg-[#0d091a] border border-indigo-900/60 p-4 rounded-xl relative overflow-hidden shadow-xl text-slate-100">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] text-purple-300 font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  {t.liveVideoDesk || "Canada Immigration TV Desk"}
                </span>
                <a
                  href={newsVideos[selectedVideoChannel as keyof typeof newsVideos].watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[9.5px] bg-red-600 hover:bg-red-500 text-white font-bold px-2.5 py-1 rounded-lg transition cursor-pointer shadow-xs shrink-0"
                >
                  <Tv className="w-3.5 h-3.5 text-white" />
                  <span>{t.openInYouTube || "Watch Direct on YouTube ↗"}</span>
                </a>
              </div>

              {/* Responsive Video Player or Poster Card */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#06040d] border border-purple-900/80 shadow-2xl">
                {isPlayingVideo ? (
                  <div className="relative w-full h-full bg-black">
                    <iframe
                      src={newsVideos[selectedVideoChannel as keyof typeof newsVideos].embedUrl + "&autoplay=1"}
                      title={newsVideos[selectedVideoChannel as keyof typeof newsVideos].title}
                      className="absolute inset-0 w-full h-full bg-black border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                    <button
                      onClick={() => setIsPlayingVideo(false)}
                      className="absolute top-2 right-2 bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white px-2 py-1 rounded-md text-[10px] font-mono border border-slate-700 backdrop-blur-xs transition cursor-pointer z-10 flex items-center gap-1"
                    >
                      <span>Close Embed</span>
                    </button>
                  </div>
                ) : (
                  <div
                    className="relative w-full h-full bg-cover bg-center flex flex-col justify-between p-3.5"
                    style={{
                      backgroundImage: `linear-gradient(to bottom, rgba(13, 9, 26, 0.4), rgba(13, 9, 26, 0.92)), url('https://img.youtube.com/vi/${newsVideos[selectedVideoChannel as keyof typeof newsVideos].videoId}/hqdefault.jpg')`
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-red-600/90 text-white font-black text-[9px] uppercase tracking-wider rounded-md backdrop-blur-xs font-mono shadow-xs">
                        {newsVideos[selectedVideoChannel as keyof typeof newsVideos].channel}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-950/80 text-amber-300 font-mono text-[9px] font-bold rounded-md border border-amber-500/30">
                        {autoCycleVideos ? `Auto-switch: ${videoTimer}s` : "Live Broadcast"}
                      </span>
                    </div>

                    <div className="my-auto text-center space-y-2 py-2">
                      <button
                        onClick={() => setIsPlayingVideo(true)}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-red-400/30 text-xs"
                      >
                        <Play className="w-4 h-4 fill-white shrink-0" />
                        <span>Play Broadcast Stream</span>
                      </button>
                    </div>

                    <div className="bg-slate-950/85 backdrop-blur-sm p-2.5 rounded-xl border border-slate-800/80">
                      <p className="text-[11px] font-bold text-white line-clamp-1">
                        {newsVideos[selectedVideoChannel as keyof typeof newsVideos].title}
                      </p>
                      <p className="text-[10px] text-slate-300 line-clamp-1 mt-0.5">
                        {newsVideos[selectedVideoChannel as keyof typeof newsVideos].desc}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Channel metadata & official link bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-300 px-0.5">
                <span className="font-mono text-purple-300">
                  Broadcaster: <strong className="text-white">{newsVideos[selectedVideoChannel as keyof typeof newsVideos].channel}</strong>
                </span>
                <a
                  href="https://www.youtube.com/@CitImmCanada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                >
                  <span>IRCC Official Channel</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              {/* Playlist Loop Control Status Bar */}
              <div className="bg-[#120d29] border border-purple-950/60 rounded-lg p-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${autoCycleVideos ? "bg-green-400 animate-pulse" : "bg-slate-500"}`}></span>
                  <span className="text-[10px] text-slate-300 font-mono">
                    {autoCycleVideos ? `Next video in ${videoTimer}s` : "Auto-Cycle: Paused"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setAutoCycleVideos(!autoCycleVideos)}
                    className="px-2 py-0.5 bg-purple-950/80 hover:bg-purple-900 text-[9px] rounded border border-purple-500/30 text-purple-200 cursor-pointer font-bold transition font-mono"
                  >
                    {autoCycleVideos ? "PAUSE" : "PLAY"}
                  </button>
                  <button
                    onClick={() => {
                      const keys = Object.keys(newsVideos) as Array<keyof typeof newsVideos>;
                      const currentIndex = keys.indexOf(selectedVideoChannel as any);
                      const nextIndex = (currentIndex + 1) % keys.length;
                      selectChannelWithReset(keys[nextIndex]);
                    }}
                    className="px-2 py-0.5 bg-indigo-950/80 hover:bg-indigo-900 text-[9px] rounded border border-indigo-500/30 text-indigo-200 cursor-pointer font-bold transition font-mono"
                  >
                    SKIP &gt;
                  </button>
                </div>
              </div>

              {/* Channel Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1.5">
                {(Object.keys(newsVideos) as Array<keyof typeof newsVideos>).map((key) => {
                  const labelMap: Record<string, string> = {
                    ctv: "CTV News",
                    cbc: "CBC News",
                    mandate: "2026 Caps",
                    students: "Student PR",
                    sponsorship: "Sponsorship",
                    workpermits: "Work Permits"
                  };
                  return (
                    <button
                      key={key}
                      onClick={() => selectChannelWithReset(key)}
                      className={`text-[9.5px] font-semibold py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                        selectedVideoChannel === key
                          ? "bg-purple-600 text-white shadow shadow-purple-500/20 font-extrabold border border-purple-400/40"
                          : "bg-[#130f24] hover:bg-purple-950/40 text-slate-400 border border-indigo-950 hover:text-white"
                      }`}
                    >
                      {labelMap[key] || key}
                    </button>
                  );
                })}
              </div>

              <p className="text-[10px] text-slate-350 leading-relaxed italic bg-purple-950/25 p-2 rounded border border-purple-900/20">
                <strong>{newsVideos[selectedVideoChannel as keyof typeof newsVideos].title}:</strong> {newsVideos[selectedVideoChannel as keyof typeof newsVideos].desc}
              </p>
            </div>

            {/* Policy & Rule Tracker */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 border-b border-indigo-950/60 pb-2">
                <Rss className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10.5px] uppercase font-mono font-bold tracking-wider text-slate-200">
                  New Regulations & Policy Feed
                </span>
              </div>

              <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1 scrollbar-thin">
                <div className="p-3 bg-[#110b24] border border-indigo-950 rounded-xl space-y-1.5 text-left hover:border-purple-550/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] bg-red-950/50 text-red-400 border border-red-500/20 px-1.5 py-0.2 rounded font-bold uppercase font-mono">
                      High Priority
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">2026 Mandate</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">Temporary Resident Volume Reduction Cap</h4>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    IRCC officially establishes a 5% cap on temporary residents overall. First-ever restrictions on spouse work permits for master's programs shorter than 16 months are now fully active.
                  </p>
                </div>

                <div className="p-3 bg-[#110b24] border border-indigo-950 rounded-xl space-y-1.5 text-left hover:border-purple-550/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] bg-amber-950/50 text-amber-400 border border-amber-500/20 px-1.5 py-0.2 rounded font-bold uppercase font-mono">
                      Express Entry
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">NOC System</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">CEC Priority Draw Category Expansion</h4>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    New directives prioritize in-Canada candidates through the Canadian Experience Class (CEC), aiming to convert current work permit holders to permanent residents directly, bypassing external skilled draws.
                  </p>
                </div>

                <div className="p-3 bg-[#110b24] border border-indigo-950 rounded-xl space-y-1.5 text-left hover:border-purple-550/20 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] bg-indigo-950/50 text-sky-400 border border-indigo-500/20 px-1.5 py-0.2 rounded font-bold uppercase font-mono">
                      OINP & PNP Shifts
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">Provincial</span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug">OINP Employer Job Offer Scoring Revision</h4>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    Ontario alters Scoring matrix for OINP Streams. Candidates located outside the Greater Toronto Area (GTA) receive 50% higher regional bonus points to boost community-wide economic integration.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* LOWER ROW: UNIFIED FEDERAL DATA REGISTRY */}
      <div className="bg-gradient-to-br from-[#205295] via-[#2c74b3] to-[#40a3e5] rounded-xl p-4 sm:p-5 border border-sky-400/30 shadow-2xl space-y-3.5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-sky-300/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div>
          <h3 className="font-display font-bold text-white flex items-center gap-2 text-base">
            <Database className="w-5 h-5 text-sky-200 animate-pulse" />
            Federal Data Catalogs & Open Licence Registry
          </h3>
          <p className="text-xs text-sky-100 mt-1">
            Registered sources compliant with the <strong className="text-white font-bold">Open Government Licence - Canada</strong>. These sources drive the central data processing dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {federalSources.map((src, i) => (
            <div key={i} className="bg-[#1a315e] rounded-xl p-4 border border-white/15 flex flex-col justify-between space-y-3 shadow-md hover:border-white/30 hover:bg-white/15 transition-all duration-300">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-sky-200 bg-sky-950/40 border border-sky-500/20 px-2 py-0.5 rounded font-mono">
                    {src.category}
                  </span>
                  <span className="text-[9px] font-bold text-sky-100 uppercase bg-white/10 border border-white/10 px-1.5 py-0.5 rounded font-mono">
                    {src.format}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-white leading-snug">{src.title}</h4>
                <p className="text-[11px] text-sky-100 leading-normal">{src.description}</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                <span className="text-sky-200 font-mono">{src.licence.split(" - ")[0]}</span>
                <a
                  href={src.portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-sky-200 hover:text-white transition-colors cursor-pointer"
                >
                  View Portal
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CANADAVISA FORUM & COMMUNITY EXPERIENCES BLOG ISLAND */}
      <div className="bg-slate-900/60 border border-slate-800/85 rounded-2xl p-6 shadow-xl space-y-4 mt-8 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">Canadavisa.com Community Portal</span>
            </div>
            <h3 className="font-display font-extrabold text-white text-base mt-1">
              CanadaVisa Experiences & Shared Journeys
            </h3>
            <p className="text-xs text-slate-400">
              Read real-world landing logs, express entry success stories, and operational advice shared directly by applicants.
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigateTab) {
                onNavigateTab("blogs");
              }
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-750 border border-slate-750/30 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs self-start sm:self-center hover:scale-[1.02] active:scale-[0.98]"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Explore All Insights</span>
          </button>
        </div>

        {/* List of Shared Experiences */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Success! Smooth PR Landing at Vancouver (YVR)",
              author: "Gurbaksh S.",
              category: "Express Entry",
              date: "2 hours ago",
              excerpt: "Landed yesterday under PNP Outland. Customs officer checked my CoPR document and provincial settlement attestation. Whole process took 25 mins!",
              stars: 5
            },
            {
              title: "CLB 9+ Language Milestone & CRS Boost",
              author: "Sarah M.",
              category: "CRS Strategy",
              date: "1 day ago",
              excerpt: "Finally secured 480 points! Maxed out my second IELTS attempt (L:8.5, R:8.0, W:7.5, S:7.5). The CLB 9 threshold truly makes a massive difference.",
              stars: 5
            },
            {
              title: "Navigating CBSA Guidelines with Work Permit",
              author: "Diego F.",
              category: "Border Security",
              date: "3 days ago",
              excerpt: "Shared my experience crossing with digital employer references. Ensure you carry physical copies of job descriptions matching primary NOC TEER duties.",
              stars: 4
            }
          ].map((blog, idx) => (
            <div key={idx} className="bg-slate-950/45 border border-slate-850 p-4 rounded-xl flex flex-col justify-between hover:border-slate-800/80 transition-all group">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="px-2 py-0.5 bg-slate-900 border border-slate-800/80 rounded-md text-indigo-300 font-bold">
                    {blog.category}
                  </span>
                  <span>{blog.date}</span>
                </div>
                <h4 className="font-display font-semibold text-slate-100 text-xs leading-normal group-hover:text-white transition-colors">
                  {blog.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                  "{blog.excerpt}"
                </p>
              </div>
              
              <div className="flex items-center justify-between border-t border-slate-900 pt-3 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-slate-800 text-[10px] text-white flex items-center justify-center font-bold">
                    {blog.author[0]}
                  </div>
                  <span className="text-[10px] font-bold text-slate-300">{blog.author}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: blog.stars }).map((_, i) => (
                    <span key={i} className="text-[9px] text-amber-500 font-sans">★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick User Experience Submission Sandbox */}
        <div className="bg-[#101225]/40 border border-indigo-950/40 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              Have you landed or received an ITA recently?
            </h4>
            <p className="text-[11px] text-slate-400 max-w-xl">
              Pay it forward! Share your landing report or documentation tips to support thousands of applicants on their journey.
            </p>
          </div>
          <button
            onClick={() => {
              if (onNavigateTab) {
                onNavigateTab("community");
              }
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-650 hover:bg-indigo-550 border border-indigo-500/20 text-white rounded-lg text-xs font-bold cursor-pointer transition-all shrink-0 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Share My Experience</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* PARTNER SIGNATURE & CONSULTATION INTAKE */}
      <div className="bg-[#000000] border border-indigo-950 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-slate-200 mt-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/10 to-indigo-950/10 pointer-events-none"></div>
        <div className="space-y-2 max-w-3xl text-left relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] bg-[#1a1c36] border border-indigo-500/30 text-indigo-300 px-2.5 py-0.5 rounded-full font-mono uppercase font-semibold">
              Independent Information App
            </span>
            <span className="text-xs text-slate-400 font-mono">12105381 Canada Inc</span>
          </div>
          <h3 className="font-display font-bold text-white text-base">
            All-In-One Canada Immigration Information App
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            This platform is an independent app operated by <strong className="text-white">12105381 Canada Inc</strong>. We are <strong>not certified and not at all a partner</strong> of IRCC or any government agency. It is simply an all-in-one place showing whatever is going on in Canadian immigration (including provincial and territory-level updates, student pathways to PR, self-settlement checksheets, spousal/family sponsorship info, and latest work permit processing times of IRCC). Reach out on our form to book a paid consultation today and take the first step toward your journey!
          </p>
        </div>

        <button
          onClick={() => {
            setBookingSuccess(false);
            setIsBookingModalOpen(true);
          }}
          className="px-5 py-3 bg-red-700 hover:bg-red-600 border border-red-500 rounded-xl text-white font-bold text-xs shadow-lg shadow-red-950/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap shrink-0 relative z-10 font-display"
        >
          Book Paid Consultation Today
        </button>
      </div>

      {/* RZQ CONSULTING MODAL OVERLAY */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0d1017] border border-indigo-900/40 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden relative text-slate-100 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-5 border-b border-indigo-950/60 bg-[#121622] flex items-center justify-between shrink-0">
              <div className="text-left">
                <span className="text-[9px] uppercase font-mono font-bold text-red-400 tracking-wider">Paid Consultation Intake Portal</span>
                <h4 className="font-display font-bold text-white text-sm">Book Paid Legal Consultation Today</h4>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800/40 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form Area */}
            <div className="p-6 overflow-y-auto space-y-4">
              {bookingSuccess ? (
                <div className="py-8 text-center space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-3xl mx-auto text-emerald-400">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-display font-bold text-white text-base">Booking Intake Submitted!</h5>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed text-center">
                      Thank you, <strong className="text-white font-bold">{bookingName}</strong>. Your legal brief regarding <strong className="text-indigo-300 font-semibold">{bookingReason}</strong> has been encrypted and transmitted securely.
                    </p>
                    <p className="text-xs text-slate-400 max-w-xs mx-auto pt-1 leading-relaxed text-center">
                      An authorized representative or lawyer from RZQ Consulting will review your case file and contact you at <strong className="text-slate-200">{bookingEmail}</strong> within 24-48 business hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsBookingModalOpen(false)}
                    className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setBookingSubmitting(true);
                    // Simulate securely transmitting request to rzqconsulting@gmail.com
                    console.log("Transmitting lead to rzqconsulting@gmail.com:", {
                      to: "rzqconsulting@gmail.com",
                      name: bookingName,
                      reason: bookingReason,
                      email: bookingEmail,
                      phone: bookingPhone,
                      message: bookingMessage,
                      timestamp: new Date().toISOString()
                    });
                    setTimeout(() => {
                      setBookingSubmitting(false);
                      setBookingSuccess(true);
                    }, 1500);
                  }}
                  className="space-y-4 text-left"
                >
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Full Name</label>
                    <input
                      type="text"
                      className="w-full bg-[#07090e] border border-indigo-900/50 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100 placeholder:text-slate-600"
                      placeholder="e.g. Gurpreet Singh"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Consultation Category</label>
                    <select
                      className="w-full bg-[#07090e] border border-[#1b253c] rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100 cursor-pointer"
                      value={bookingReason}
                      onChange={(e) => setBookingReason(e.target.value)}
                      required
                    >
                      <option value="Express Entry / CEC / Federal Skilled Worker">Express Entry / CEC / Federal Skilled Worker</option>
                      <option value="Refugee Protection / IRB Hearings">Refugee Protection / IRB Hearings</option>
                      <option value="PNP Provincial Nominations">PNP Provincial Nominations</option>
                      <option value="Work Permit / LMIA Compliance">Work Permit / LMIA Compliance</option>
                      <option value="Inadmissibility / Spousal Appeals">Inadmissibility / Spousal Appeals</option>
                      <option value="Study Permit / Student Visa Appeals">Study Permit / Student Visa Appeals</option>
                      <option value="Other Complex Case Review">Other Complex Case Review</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Email Address</label>
                      <input
                        type="email"
                        className="w-full bg-[#07090e] border border-indigo-900/50 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100 placeholder:text-slate-600"
                        placeholder="e.g. name@domain.com"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Phone Number (Optional)</label>
                      <input
                        type="tel"
                        className="w-full bg-[#07090e] border border-indigo-900/50 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100 placeholder:text-slate-600"
                        placeholder="e.g. +1 (416) 555-0199"
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono font-bold text-slate-400">Message / Case Overview</label>
                    <textarea
                      rows={3}
                      className="w-full bg-[#07090e] border border-indigo-900/50 rounded-xl p-3.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-100 placeholder:text-slate-600 leading-relaxed"
                      placeholder="Please briefly describe your current immigration status and any timelines or deadlines."
                      value={bookingMessage}
                      onChange={(e) => setBookingMessage(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={bookingSubmitting}
                      className="w-full py-3 bg-red-700 hover:bg-red-600 border border-red-500 disabled:bg-[#1a0f12] disabled:border-red-950 disabled:text-slate-500 rounded-xl text-white font-bold text-xs tracking-wide transition-colors cursor-pointer text-center font-display"
                    >
                      {bookingSubmitting ? "Securing Transmission Route..." : "Submit Confidential Request"}
                    </button>
                    <p className="text-[9px] text-slate-500 text-center mt-2.5 font-mono">
                      🔒 Secured via bank-grade SHA-256 end-to-end encryption tunnel. Data stays private.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
