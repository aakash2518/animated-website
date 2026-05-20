"use client";

import { useState, useEffect } from "react";
import { 
  Plus, Trash2, LogOut, Loader2, Image as ImageIcon, 
  LayoutDashboard, FileText, Settings, Bell, Search,
  ArrowUpRight, BarChart3, Users, Clock
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  img: string;
  slug: string;
  date: string;
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "Web Development",
    excerpt: "",
    readTime: "5 min read",
    img: "/assets/p1.png",
    slug: "",
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
  });

  useEffect(() => {
    if (isLoggedIn) {
      fetchBlogs();
    }
  }, [isLoggedIn]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "royal123") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setNewBlog({ ...newBlog, img: data.url });
      } else {
        alert("Upload failed");
      }
    } catch {
      alert("Error uploading image");
    }
    setUploading(false);
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const slug = newBlog.slug || newBlog.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    const blogToAdd = { ...newBlog, slug };

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogToAdd),
      });

      if (res.ok) {
        setNewBlog({
          title: "",
          category: "Web Development",
          excerpt: "",
          readTime: "5 min read",
          img: "/assets/p1.png",
          slug: "",
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
        });
        fetchBlogs();
        setActiveTab("blogs");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add blog");
      }
    } catch {
      alert("Error adding blog");
    }
    setSubmitting(false);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch('/api/blogs', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      if (res.ok) {
        fetchBlogs();
      }
    } catch {
      alert("Error deleting blog");
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center px-6 font-sans">
        <div className="w-full max-w-md p-12 bg-zinc-950 border border-white/5 rounded-[40px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-(--gold) to-transparent opacity-50" />
          <h1 className="font-display text-4xl text-white mb-2 text-center">Admin <span className="italic text-(--gold)">Portal</span></h1>
          <p className="text-white/40 text-center text-sm mb-10">Authorized personnel only</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <input
                type="password"
                placeholder="Secure Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-8 py-5 bg-white/3 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:border-(--gold)/50 focus:bg-white/5 outline-none transition-all text-center tracking-[0.5em]"
              />
              {error && <p className="text-red-500 text-[10px] uppercase tracking-widest mt-4 text-center">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-5 bg-white text-black font-mono text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-(--gold) transition-all duration-500 font-bold"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] flex text-white font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-zinc-950/50 backdrop-blur-xl flex-col hidden lg:flex sticky top-0 h-screen">
        <div className="p-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-(--gold) rounded-lg flex items-center justify-center text-black font-bold">R</div>
            <span className="font-display text-lg tracking-tight">Royal<span className="text-(--gold)">Finity</span></span>
          </Link>
        </div>

        <nav className="grow px-6 space-y-2">
          <button 
            onClick={() => setActiveTab("dashboard")}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === "dashboard" ? "bg-white/10 text-(--gold)" : "text-white/40 hover:text-white hover:bg-white/5"}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-mono text-[10px] uppercase tracking-widest">Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab("blogs")}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${activeTab === "blogs" ? "bg-white/10 text-(--gold)" : "text-white/40 hover:text-white hover:bg-white/5"}`}
          >
            <FileText size={20} />
            <span className="font-mono text-[10px] uppercase tracking-widest">Manage Blogs</span>
          </button>
          <button 
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/40 hover:text-white hover:bg-white/5 transition-all`}
          >
            <Settings size={20} />
            <span className="font-mono text-[10px] uppercase tracking-widest">Settings</span>
          </button>
        </nav>

        <div className="p-10">
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-4 text-white/30 hover:text-red-500 transition-colors px-6"
          >
            <LogOut size={18} />
            <span className="font-mono text-[10px] uppercase tracking-widest">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <section className="grow overflow-y-auto">
        {/* Header */}
        <header className="h-24 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-12 sticky top-0 z-50">
          <div className="flex items-center gap-4 bg-white/5 px-6 py-2.5 rounded-full border border-white/5 w-96">
            <Search size={16} className="text-white/20" />
            <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-xs text-white/60 w-full" />
          </div>
          <div className="flex items-center gap-8">
            <button type="button" title="Notifications" aria-label="Notifications" className="relative text-white/40 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-4 pl-8 border-l border-white/10">
              <div className="text-right">
                <p className="text-[10px] font-bold text-white uppercase tracking-tighter">Admin User</p>
                <p className="text-[9px] text-(--gold) uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="w-10 h-10 bg-linear-to-br from-zinc-800 to-zinc-950 border border-white/10 rounded-xl" />
            </div>
          </div>
        </header>

        <div className="p-12">
          {activeTab === "dashboard" && (
            <div className="space-y-12">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="font-display text-5xl tracking-tighter mb-2">Welcome back, <span className="italic text-(--gold)">Chief.</span></h1>
                  <p className="text-white/40 text-sm">Here is what&apos;s happening with your digital empire today.</p>
                </div>
                <button 
                  onClick={() => setActiveTab("blogs")}
                  className="px-8 py-4 bg-white text-black font-mono text-[10px] uppercase tracking-[0.2em] rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform"
                >
                  <Plus size={16} /> New Blog Post
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Views", value: "12,840", trend: "+12.5%", icon: BarChart3 },
                  { label: "Blog Posts", value: blogs.length, trend: "Stable", icon: FileText },
                  { label: "Visitors", value: "2,450", trend: "+5.2%", icon: Users },
                  { label: "Avg. Time", value: "4m 12s", trend: "-2.1%", icon: Clock },
                ].map((stat, i) => (
                  <div key={i} className="p-8 bg-zinc-950 border border-white/5 rounded-[32px] group hover:border-(--gold)/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-white/5 rounded-2xl text-(--gold) group-hover:bg-(--gold) group-hover:text-black transition-all">
                        <stat.icon size={20} />
                      </div>
                      <span className={`text-[10px] font-mono ${stat.trend.startsWith('+') ? 'text-green-500' : stat.trend === 'Stable' ? 'text-blue-500' : 'text-red-500'}`}>
                        {stat.trend}
                      </span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
                    <h3 className="text-3xl font-display">{stat.value}</h3>
                  </div>
                ))}
              </div>

              {/* Recent Content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 p-10 bg-zinc-950 border border-white/5 rounded-[40px]">
                  <div className="flex justify-between items-center mb-10">
                    <h2 className="font-display text-2xl">Latest Activity</h2>
                    <button className="text-[10px] font-mono text-(--gold) uppercase tracking-widest">View All</button>
                  </div>
                  <div className="space-y-6">
                    {blogs.slice(0, 3).map((blog) => (
                      <div key={blog.slug} className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-3xl group hover:bg-white/4 transition-all">
                        <div className="flex items-center gap-6">
                          <Image src={blog.img} width={64} height={64} className="w-16 h-16 rounded-2xl object-cover" alt={blog.title} />
                          <div>
                            <h4 className="text-white font-display text-lg mb-1">{blog.title}</h4>
                            <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest">{blog.category} · {blog.date}</p>
                          </div>
                        </div>
                        <ArrowUpRight size={20} className="text-white/20 group-hover:text-(--gold) transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-4 p-10 bg-(--gold) rounded-[40px] text-black">
                  <h2 className="font-display text-2xl mb-4">Pro Tip.</h2>
                  <p className="text-black/70 text-sm leading-relaxed mb-8">
                    Adding consistent blog posts helps in SEO ranking. Make sure to use high-quality images and engaging titles.
                  </p>
                  <div className="w-full h-px bg-black/10 mb-8" />
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">1</div>
                      <p className="text-[10px] font-bold uppercase tracking-tighter">Research Keywords</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">2</div>
                      <p className="text-[10px] font-bold uppercase tracking-tighter">Write Draft</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "blogs" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Form Section */}
              <div className="lg:col-span-5">
                <div className="p-10 bg-zinc-950 border border-white/5 rounded-[40px] sticky top-36">
                  <h2 className="font-display text-3xl mb-10 flex items-center gap-4">
                    <Plus size={32} className="text-(--gold)" /> Create <span className="italic text-(--gold)">Post</span>
                  </h2>
                  <form onSubmit={handleAddBlog} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 ml-2">Main Title</label>
                      <input
                        required
                        type="text"
                        placeholder="E.g. The Future of Web Design"
                        value={newBlog.title}
                        onChange={(e) => setNewBlog({...newBlog, title: e.target.value})}
                        className="w-full px-8 py-5 bg-white/3 border border-white/10 rounded-2xl text-white outline-none focus:border-(--gold)/50 transition-all placeholder:text-white/10"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 ml-2">Category</label>
                        <select
                          title="Blog category"
                          aria-label="Blog category"
                          value={newBlog.category}
                          onChange={(e) => setNewBlog({...newBlog, category: e.target.value})}
                          className="w-full px-8 py-5 bg-white/3 border border-white/10 rounded-2xl text-white outline-none focus:border-(--gold)/50 appearance-none transition-all cursor-pointer"
                        >
                          {["Web Development", "Mobile Apps", "UI/UX Design", "Digital Marketing", "AI & Automation", "Branding"].map(c => (
                            <option key={c} value={c} className="bg-zinc-950">{c}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 ml-2">Read Time</label>
                        <input
                          type="text"
                          placeholder="8 min read"
                          value={newBlog.readTime}
                          onChange={(e) => setNewBlog({...newBlog, readTime: e.target.value})}
                          className="w-full px-8 py-5 bg-white/3 border border-white/10 rounded-2xl text-white outline-none focus:border-(--gold)/50 transition-all placeholder:text-white/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 ml-2">Image Upload</label>
                      <div className="relative group">
                        <input 
                          type="file" 
                          onChange={handleImageUpload}
                          className="hidden" 
                          id="img-upload" 
                          accept="image/*"
                        />
                        <label 
                          htmlFor="img-upload"
                          className="w-full px-8 py-5 bg-white/3 border border-dashed border-white/10 rounded-2xl flex items-center justify-between cursor-pointer group-hover:border-(--gold)/50 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <ImageIcon size={20} className="text-white/20" />
                            <span className="text-xs text-white/40">{uploading ? "Uploading..." : "Select Image"}</span>
                          </div>
                          {newBlog.img && <Image src={newBlog.img} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" alt="" />}
                        </label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 ml-2">Article Abstract</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Write a brief intro..."
                        value={newBlog.excerpt}
                        onChange={(e) => setNewBlog({...newBlog, excerpt: e.target.value})}
                        className="w-full px-8 py-5 bg-white/3 border border-white/10 rounded-2xl text-white outline-none focus:border-(--gold)/50 transition-all resize-none placeholder:text-white/10"
                      />
                    </div>

                    <button
                      disabled={submitting || uploading}
                      type="submit"
                      className="w-full py-6 bg-white text-black font-mono text-[10px] uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-3 hover:bg-(--gold) transition-all duration-500 disabled:opacity-50 font-bold"
                    >
                      {submitting ? <Loader2 className="animate-spin" size={20} /> : "Publish to Site"}
                    </button>
                  </form>
                </div>
              </div>

              {/* List Section */}
              <div className="lg:col-span-7">
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4 px-4">
                    <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/20">Existing Posts ({blogs.length})</p>
                  </div>
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-40 text-white/10">
                      <Loader2 className="animate-spin mb-4" size={40} />
                      <p className="font-mono text-[10px] uppercase tracking-widest">Retrieving articles...</p>
                    </div>
                  ) : blogs.length === 0 ? (
                    <div className="py-40 text-center bg-white/1 border border-dashed border-white/5 rounded-[40px]">
                      <p className="text-white/20 text-[10px] uppercase tracking-widest font-mono">No articles found</p>
                    </div>
                  ) : (
                    blogs.map((blog) => (
                      <div 
                        key={blog.slug}
                        className="group flex items-center gap-8 p-8 bg-zinc-950/50 border border-white/5 rounded-[40px] hover:border-white/10 hover:bg-zinc-950 transition-all"
                      >
                        <div className="relative w-32 h-32 rounded-3xl overflow-hidden bg-white/5 shrink-0 shadow-2xl">
                          <Image src={blog.img} alt={blog.title} fill className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>
                        <div className="grow min-w-0">
                          <div className="flex items-center gap-4 mb-3">
                            <span className="px-3 py-1 bg-white/5 rounded-full font-mono text-[8px] uppercase tracking-[0.2em] text-(--gold)">{blog.category}</span>
                            <span className="text-white/10 font-mono text-[8px] uppercase tracking-[0.2em]">{blog.date}</span>
                          </div>
                          <h3 className="text-white font-display text-2xl truncate mb-3">{blog.title}</h3>
                          <p className="text-white/40 text-xs line-clamp-2 max-w-lg leading-relaxed">{blog.excerpt}</p>
                        </div>
                        <button
                          onClick={() => handleDelete(blog.slug)}
                          className="w-14 h-14 flex items-center justify-center text-white/10 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all shrink-0"
                          aria-label="Delete post"
                        >
                          <Trash2 size={24} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
