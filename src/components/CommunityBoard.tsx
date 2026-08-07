import React, { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Calendar, MapPin, User, Tag, Send, AlertCircle, PlusCircle, CheckCircle2, Bookmark, Award, HelpCircle } from "lucide-react";

interface CommunityPost {
  id: string;
  name: string;
  avatarColor: string;
  originCountry: string;
  targetProvince: string;
  targetCity?: string;
  crsScore: number;
  stream: string;
  milestone: "PR Approved" | "Received ITA" | "Settled & Employed" | "Work Permit Issued" | "Awaiting Nomination";
  experienceDate: string;
  timelineDetails: string; // Narrative
  upvotes: number;
  comments: Array<{
    id: string;
    author: string;
    text: string;
    date: string;
  }>;
}

const SEED_POSTS: CommunityPost[] = [
  {
    id: "post-ranjit-calgary",
    name: "Ranjit Singh",
    avatarColor: "bg-red-600 text-white",
    originCountry: "India",
    targetProvince: "Alberta",
    targetCity: "Brooks",
    crsScore: 412,
    stream: "AAIP Rural Renewal Stream",
    milestone: "Settled & Employed",
    experienceDate: "July 10, 2026",
    timelineDetails: "My CRS score was stuck at 412 because of my age, and I was losing hope. I learned about the Alberta Rural Renewal stream and researched communities. I applied for a Welder role in Brooks, AB. The employer was incredibly supportive. They walked me through the community endorsement process. The Welcoming Committee in Brooks met me at the Calgary airport, helped me buy winter clothes, and found a clean 2-bedroom rental apartment for my family. If you have lower CRS scores but solid skilled trades experience, do not give up—look into AAIP Rural Renewal!",
    upvotes: 45,
    comments: [
      { id: "c1", author: "Arnav G.", text: "This is super inspiring Ranjit! Did the employer require a trade certification prior to arrival?", date: "July 11, 2026" },
      { id: "c2", author: "Ranjit Singh", text: "Arnav, they accepted my international experience first, and I am scheduled to challenge the Alberta Journeyman exam next month!", date: "July 12, 2026" }
    ]
  },
  {
    id: "post-amara-morden",
    name: "Amara Okoye",
    avatarColor: "bg-emerald-600 text-white",
    originCountry: "Nigeria",
    targetProvince: "Manitoba",
    targetCity: "Morden",
    crsScore: 395,
    stream: "Manitoba Morden Community Initiative",
    milestone: "PR Approved",
    experienceDate: "June 25, 2026",
    timelineDetails: "Morden is an absolute gem of a town! Since I had no relatives or prior experience in Canada, the standard MPNP stream was difficult. However, Morden recruited me as an Early Childhood Educator directly. The selection team was extremely thorough but warm. They provided a Letter of Support that bypassed federal CRS bottlenecks. I received my Provincial Nomination, which added +600 points to my profile, and my PR was finalized in under 7 months. My advice: verify if your occupation is on Morden's specific demand list, and make sure you have CLB 5+.",
    upvotes: 38,
    comments: [
      { id: "c3", author: "Siddharth M.", text: "Congratulations Amara! How long did the community evaluation take?", date: "June 26, 2026" },
      { id: "c4", author: "Amara Okoye", text: "It took about 3 months from my initial Expression of Interest to the final endorsement interview.", date: "June 27, 2026" }
    ]
  },
  {
    id: "post-lucas-vancouver",
    name: "Lucas Barbosa",
    avatarColor: "bg-indigo-600 text-white",
    originCountry: "Brazil",
    targetProvince: "British Columbia",
    targetCity: "Vancouver",
    crsScore: 498,
    stream: "BCPNP Tech Pathway",
    milestone: "Work Permit Issued",
    experienceDate: "May 18, 2026",
    timelineDetails: "I worked as a Software Developer in São Paulo. My CRS score was 498, which wasn't quite enough for general Express Entry draws in early 2026. However, my company in Vancouver offered me a role and sponsored me under the BCPNP Tech stream. BCPNP processed my nomination in just 12 days! They gave me a work permit support letter, and I relocated to Vancouver in under 2 months. Be prepared for high rent in Vancouver, but the job opportunities here are endless if you are in software, cloud, or web engineering.",
    upvotes: 29,
    comments: []
  }
];

interface CommunityBoardProps {
  currentUser?: {
    name?: string;
    phone?: string;
    crsScore?: number;
    isLoggedIn: boolean;
  };
}

export default function CommunityBoard({ currentUser }: CommunityBoardProps) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "my-stream" | "pr" | "employed">("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formCountry, setFormCountry] = useState("India");
  const [formProvince, setFormProvince] = useState("Alberta");
  const [formCity, setFormCity] = useState("");
  const [formCrs, setFormCrs] = useState(450);
  const [formStream, setFormStream] = useState("AAIP Rural Renewal Stream");
  const [formMilestone, setFormMilestone] = useState<CommunityPost["milestone"]>("Settled & Employed");
  const [formNarrative, setFormNarrative] = useState("");
  const [formError, setFormError] = useState("");

  // Comment Form Fields
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");

  // Load posts from local storage or fall back to seed data
  useEffect(() => {
    const cached = localStorage.getItem("canimmi_community_posts");
    if (cached) {
      try {
        setPosts(JSON.parse(cached));
      } catch (e) {
        setPosts(SEED_POSTS);
      }
    } else {
      setPosts(SEED_POSTS);
      localStorage.setItem("canimmi_community_posts", JSON.stringify(SEED_POSTS));
    }
  }, []);

  // Sync posts to localStorage
  const savePosts = (updatedPosts: CommunityPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem("canimmi_community_posts", JSON.stringify(updatedPosts));
  };

  // Pre-fill form details if user logged in
  useEffect(() => {
    if (currentUser?.isLoggedIn) {
      setFormName(currentUser.name || "Applicant");
      if (currentUser.crsScore) setFormCrs(currentUser.crsScore);
    } else {
      setFormName("");
    }
  }, [currentUser]);

  const handleUpvote = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, upvotes: p.upvotes + 1 };
      }
      return p;
    });
    savePosts(updated);
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    const authorName = currentUser?.isLoggedIn && currentUser.name ? currentUser.name : "Guest Applicant";
    const newComment = {
      id: "comment-" + Date.now(),
      author: authorName,
      text: commentInput.trim(),
      date: new Date().toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })
    };

    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    });

    savePosts(updated);
    setCommentInput("");
    setActiveCommentPostId(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formNarrative.trim()) {
      setFormError("Please fill out your display name and share your experience details.");
      return;
    }

    const randomColors = [
      "bg-red-600 text-white",
      "bg-amber-600 text-white",
      "bg-indigo-600 text-white",
      "bg-emerald-600 text-white",
      "bg-rose-600 text-white",
      "bg-teal-600 text-white"
    ];
    const randomAvatar = randomColors[Math.floor(Math.random() * randomColors.length)];

    const newPost: CommunityPost = {
      id: "post-" + Date.now(),
      name: formName.trim(),
      avatarColor: randomAvatar,
      originCountry: formCountry,
      targetProvince: formProvince,
      targetCity: formCity.trim() || undefined,
      crsScore: Number(formCrs) || 400,
      stream: formStream,
      milestone: formMilestone,
      experienceDate: new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" }),
      timelineDetails: formNarrative.trim(),
      upvotes: 1,
      comments: []
    };

    const updated = [newPost, ...posts];
    savePosts(updated);

    // Reset Form Fields
    setFormNarrative("");
    setFormCity("");
    setFormError("");
    setShowAddForm(false);
  };

  // Filter & Search Logic
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.stream.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.timelineDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.originCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.targetCity && post.targetCity.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "my-stream" && currentUser?.isLoggedIn && post.crsScore <= (currentUser?.crsScore || 500)) ||
      (activeTab === "pr" && post.milestone === "PR Approved") ||
      (activeTab === "employed" && post.milestone === "Settled & Employed");

    return matchesSearch && matchesTab;
  });

  return (
    <div id="community-experience-board" className="space-y-6">
      
      {/* HEADER SECTION */}
      <div className="bg-[#bbbbbb] rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4" style={{ backgroundColor: "#bbbbbb" }}>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-indigo-50 text-indigo-600 rounded-lg">
              <MessageSquare className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">🍁 Community Exchange</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-900 tracking-tight">Newcomer Experience Sharing Hub</h2>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Connect with real applicants. Learn their timelines, language study advice, provincial nominations details, and how they adjusted to Canadian municipal communities.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          {showAddForm ? "View Timeline" : "Share Your Story"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: ACTIVE POST FEED */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* SEARCH & COMMUNITY CONTROLS */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search stories, countries, streams..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-4 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 overflow-x-auto w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shrink-0 cursor-pointer ${
                  activeTab === "all" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Stories
              </button>
              <button
                onClick={() => setActiveTab("my-stream")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shrink-0 cursor-pointer ${
                  activeTab === "my-stream" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Similar CRS Score
              </button>
              <button
                onClick={() => setActiveTab("pr")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shrink-0 cursor-pointer ${
                  activeTab === "pr" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                PR Approved
              </button>
              <button
                onClick={() => setActiveTab("employed")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold shrink-0 cursor-pointer ${
                  activeTab === "employed" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Settled in Canada
              </button>
            </div>
          </div>

          {/* ADD EXPERIENCE FORM VIEW */}
          {showAddForm && (
            <div className="bg-white rounded-2xl border border-indigo-200 p-6 shadow-md space-y-4 animate-fade-in">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="font-display font-bold text-sm text-slate-900">Post Your Immigration Experience</h3>
                    <p className="text-[10px] text-slate-500">Share your timeline to help fellow applicants prepare.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  Cancel
                </button>
              </div>

              {formError && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3 py-2 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Display Name / Handle</label>
                    <input
                      type="text"
                      placeholder="e.g., Ranjit K. or Anonymous"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Country of Origin</label>
                    <select
                      value={formCountry}
                      onChange={(e) => setFormCountry(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                    >
                      <option value="India">India</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Brazil">Brazil</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Philippines">Philippines</option>
                      <option value="China">China</option>
                      <option value="Mexico">Mexico</option>
                      <option value="United Arab Emirates">UAE</option>
                      <option value="Other">Other Country</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Target Province</label>
                    <select
                      value={formProvince}
                      onChange={(e) => setFormProvince(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                    >
                      <option value="Alberta">Alberta</option>
                      <option value="Manitoba">Manitoba</option>
                      <option value="Ontario">Ontario</option>
                      <option value="British Columbia">British Columbia</option>
                      <option value="Saskatchewan">Saskatchewan</option>
                      <option value="Nova Scotia">Nova Scotia</option>
                      <option value="New Brunswick">New Brunswick</option>
                      <option value="Other">Other Territory</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Target Community / City (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g., Brooks, Morden, Calgary"
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Your CRS Score (at landing/draw)</label>
                    <input
                      type="number"
                      min="100"
                      max="1200"
                      value={formCrs}
                      onChange={(e) => setFormCrs(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Current Milestone Status</label>
                    <select
                      value={formMilestone}
                      onChange={(e) => setFormMilestone(e.target.value as any)}
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 font-sans"
                    >
                      <option value="Settled & Employed">🏡 Settled & Employed in Canada</option>
                      <option value="PR Approved">🎉 Permanent Residency Approved</option>
                      <option value="Received ITA">📩 Received ITA (Invitation to Apply)</option>
                      <option value="Work Permit Issued">🛠️ Work Permit Issued</option>
                      <option value="Awaiting Nomination">⏳ Awaiting Nomination / In Pool</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Specific Immigration Stream Used</label>
                  <input
                    type="text"
                    placeholder="e.g., AAIP Rural Renewal, Express Entry (STEM), MPNP Morden"
                    value={formStream}
                    onChange={(e) => setFormStream(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                    required
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Your Journey Story & Practical Tips</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your process: How did you get the job/endorsement? How was your first week settling? Any language tips or warnings for finding housing?"
                    value={formNarrative}
                    onChange={(e) => setFormNarrative(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 leading-normal"
                    required
                  ></textarea>
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold cursor-pointer hover:bg-slate-50 text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold cursor-pointer hover:bg-indigo-700 text-center shadow-xs"
                  >
                    Submit Journey Story
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* MAIN POST FEED CARDS */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="bg-white p-8 text-center rounded-xl border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-bold">No experiences match your parameters.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveTab("all"); }}
                  className="mt-2 text-xs text-indigo-600 font-bold hover:underline"
                >
                  Clear search filters
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                  
                  {/* Top Row: User Avatar and Milestone */}
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${post.avatarColor} flex items-center justify-center font-display font-bold text-sm shadow-xs border border-slate-200`}>
                        {post.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-display font-bold text-sm text-slate-900">{post.name}</h4>
                          <span className="text-[10px] text-slate-400">from {post.originCountry}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-medium">
                          <span className="flex items-center gap-0.5 text-rose-600 font-bold">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {post.targetCity ? `${post.targetCity}, ` : ""}{post.targetProvince}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-indigo-600 font-bold">CRS: {post.crsScore}</span>
                        </div>
                      </div>
                    </div>

                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                      post.milestone === "PR Approved" || post.milestone === "Settled & Employed"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-indigo-50 border-indigo-200 text-indigo-700"
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      {post.milestone}
                    </span>
                  </div>

                  {/* Program Stream Tag */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-mono text-slate-600 font-bold">
                    <Tag className="w-3 h-3 text-indigo-500" />
                    <span>Stream: {post.stream}</span>
                  </div>

                  {/* Body Content */}
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium whitespace-pre-wrap">
                    {post.timelineDetails}
                  </p>

                  {/* Engagement Bar */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
                    <div className="flex items-center gap-4 text-[11px] font-bold text-slate-500">
                      <button
                        onClick={() => handleUpvote(post.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Upvote Helpful ({post.upvotes})</span>
                      </button>

                      <button
                        onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Reply / Comments ({post.comments.length})</span>
                      </button>
                    </div>

                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Posted: {post.experienceDate}
                    </span>
                  </div>

                  {/* COMMENT BOX ACCORDION */}
                  {(activeCommentPostId === post.id || post.comments.length > 0) && (
                    <div className="bg-slate-50/70 border border-slate-150 rounded-xl p-4 space-y-3.5 animate-fade-in text-xs">
                      
                      {/* Existing comments list */}
                      {post.comments.length > 0 && (
                        <div className="space-y-3">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="border-b border-slate-200/50 pb-2.5 last:border-0 last:pb-0">
                              <div className="flex justify-between items-center mb-1 text-[10px]">
                                <span className="font-bold text-slate-800">{comment.author}</span>
                                <span className="text-slate-400 font-mono">{comment.date}</span>
                              </div>
                              <p className="text-slate-600 leading-normal pl-1">{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Comment Form */}
                      {activeCommentPostId === post.id && (
                        <form onSubmit={(e) => handleAddComment(post.id, e)} className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Type a helpful reply, ask a question..."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            className="flex-grow bg-white border border-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                            required
                          />
                          <button
                            type="submit"
                            className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all cursor-pointer shrink-0"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: REASSURANCE & FAQ */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* PROFILE BADGE IF LOGGED IN */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <h3 className="font-display font-bold text-sm text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Your Sharing Identity</span>
            </h3>

            {currentUser?.isLoggedIn ? (
              <div className="space-y-3 text-xs leading-normal">
                <p className="text-slate-600">
                  You are registered under phone <strong>{currentUser.phone}</strong>. Sharing experiences helps build an authentic database for newcomers.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">Handle:</span>
                    <span className="font-bold text-slate-800">{currentUser.name || "Applicant"}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-slate-500">CRS Score:</span>
                    <span className="font-bold text-slate-800 font-mono">{currentUser.crsScore || 450} Points</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs leading-normal">
                <p className="text-slate-500">
                  You are currently browsing the Experience Board as a <strong>Guest User</strong>.
                </p>
                <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50 text-indigo-800">
                  You can post anonymously! When posting, simply supply your chosen handle and country of origin. To link a persistent device session, click <strong>Link Phone</strong> in the top navigation.
                </div>
              </div>
            )}
          </div>

          {/* FAQS & BEST PRACTICES */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-sm text-white border-b border-slate-800 pb-2.5 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>Canada Journey FAQs</span>
            </h3>

            <div className="space-y-3 text-[11px] leading-relaxed">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-200">What is the Rural Renewal Stream?</h4>
                <p className="text-slate-400">
                  A program where small municipalities in Alberta endorse economic immigrants directly based on community retention and local employment rather than standard federal point lists.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-200">How do I verify CanadaVisa info?</h4>
                <p className="text-slate-400">
                  Browse our <strong>CanadaVisa Insights</strong> tab. CanadaVisa.com operates excellent community discussions and publishes direct Ministerial Draw histories.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-200">Is my phone number private?</h4>
                <p className="text-slate-400">
                  Yes, fully! Phone numbers are strictly used as identifiers for browser cache partitioning on your device. No PII is sold, broadcasted, or logged on central servers.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
