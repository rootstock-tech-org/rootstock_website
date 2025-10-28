"use client";

import React, { useEffect, useMemo, useState } from "react";

// Types
export type AdminPost = {
  title: string;
  excerpt: string;
  date: string; // e.g., "Dec 15, 2024"
  readTime: string; // e.g., "5 min"
  category: "Blog" | "Article" | "Research" | "Guide" | "Case Study";
  image?: string; // data URL
  slug: string;
  content?: string;
};

const CATEGORIES: AdminPost["category"][] = [
  "Blog",
  "Article",
  "Research",
  "Guide",
  "Case Study",
];

const STORAGE_KEY = "customPosts";
const AUTH_KEY = "adminAuthed";

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");

  const [posts, setPosts] = useState<AdminPost[]>([]);

  const [form, setForm] = useState<AdminPost>({
    title: "",
    excerpt: "",
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    readTime: "5 min",
    category: "Blog",
    slug: "",
    content: "",
  });

  // Load auth and posts from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wasAuthed = localStorage.getItem(AUTH_KEY) === "true";
    setAuthed(wasAuthed);

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as AdminPost[];
        setPosts(parsed);
      } catch {}
    }
  }, []);

  const [slugError, setSlugError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return form.title.trim().length > 0 && 
           form.excerpt.trim().length > 0 && 
           !slugError;
  }, [form.title, form.excerpt, slugError]);
  
  // Validate slug is unique when it changes
  useEffect(() => {
    if (!form.slug) return;
    
    const slugExists = posts.some(post => 
      post.slug === form.slug
    );
    
    if (slugExists) {
      setSlugError('This URL slug is already in use. Please choose a different one.');
    } else {
      setSlugError(null);
    }
  }, [form.slug, posts]);

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo password. Change it.
    const OK = password === "admin123";
    if (OK) {
      setAuthed(true);
      if (typeof window !== "undefined") localStorage.setItem(AUTH_KEY, "true");
    } else {
      alert("Incorrect password. Hint: change this in /app/admin/page.tsx");
    }
  };

  const onLogout = () => {
    setAuthed(false);
    if (typeof window !== "undefined") localStorage.removeItem(AUTH_KEY);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "title") setForm((prev) => ({ ...prev, slug: slugify(value) }));
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setForm((prev) => ({ ...prev, image: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    
    // Final slug validation before saving
    const finalSlug = form.slug || slugify(form.title);
    const slugExists = posts.some(post => post.slug === finalSlug);
    
    if (slugExists) {
      setSlugError('This URL slug is already in use. Please choose a different one.');
      return;
    }

    const toSave: AdminPost = {
      ...form,
      slug: finalSlug,
    };

    // Persist to shared server file via API
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toSave),
      });
    } catch {}

    const next = [toSave, ...posts];
    setPosts(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }

    // Reset minimal fields
    setForm((prev) => ({
      ...prev,
      title: "",
      slug: "",
      excerpt: "",
      image: undefined,
    }));
  };

  const onDelete = (slug: string) => {
    const next = posts.filter((p) => p.slug !== slug);
    setPosts(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    }
  };

  if (!authed) {
    return (
      <main className="bg-gray-900 min-h-screen flex items-center justify-center px-6">
        <form
          onSubmit={onLogin}
          className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg"
        >
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-white/70 text-sm mb-4">Enter password to manage posts.</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-white/90 text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7AE582]"
            required
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#7AE582] to-[#16BAC5] text-gray-900 font-semibold px-5 py-3 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7AE582]"
          >
            Sign In
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="bg-gray-900 min-h-screen">
      <section className="container mx-auto px-6 pt-10 pb-4 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-white">Admin Dashboard</h1>
        <button onClick={onLogout} className="text-white/80 hover:text-white">Log out</button>
      </section>

      {/* Create Form */}
      <section className="container mx-auto px-6 pb-8">
        <form
          onSubmit={onCreate}
          className="grid md:grid-cols-2 gap-6 rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                className="w-full rounded-xl bg-white/90 text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7AE582]"
                placeholder="Post title"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1">Slug</label>
              <input
                name="slug"
                value={form.slug}
                onChange={onChange}
                className={`w-full rounded-xl bg-white/90 text-gray-900 px-4 py-3 outline-none focus:ring-2 ${slugError ? 'ring-2 ring-red-500' : 'focus:ring-[#7AE582]'}`}
                placeholder="auto-generated-from-title"
              />
              {slugError && (
                <p className="text-red-400 text-xs mt-1">{slugError}</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1">Excerpt</label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={onChange}
                className="w-full min-h-24 rounded-xl bg-white/90 text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7AE582]"
                placeholder="Short summary"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-white/80 mb-1">Date</label>
                <input
                  name="date"
                  value={form.date}
                  onChange={onChange}
                  className="w-full rounded-xl bg-white/90 text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7AE582]"
                />
              </div>
              <div>
                <label className="block text-sm text-white/80 mb-1">Read time</label>
                <input
                  name="readTime"
                  value={form.readTime}
                  onChange={onChange}
                  className="w-full rounded-xl bg-white/90 text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7AE582]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={onChange}
                className="w-full rounded-xl bg-white/90 text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7AE582]"
              >
                {CATEGORIES.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Cover Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="block w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#7AE582] file:text-gray-900 hover:file:bg-[#67d374]"
              />
              {form.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.image} alt="preview" className="mt-3 h-28 w-48 object-cover rounded-xl border border-white/10" />
              )}
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Content (optional)</label>
              <textarea
                name="content"
                value={form.content}
                onChange={onChange}
                className="w-full min-h-24 rounded-xl bg-white/90 text-gray-900 px-4 py-3 outline-none focus:ring-2 focus:ring-[#7AE582]"
                placeholder="Full article content (optional)"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={!canSubmit}
                className="rounded-xl bg-gradient-to-r from-[#7AE582] to-[#16BAC5] text-gray-900 font-semibold px-6 py-3 disabled:opacity-60"
              >
                Publish Post
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* List */}
      <section className="container mx-auto px-6 pb-20">
        <h2 className="text-xl font-bold text-white mb-4">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-white/70">No posts yet. Create your first post above.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <div key={p.slug} className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="relative h-32 bg-white/5">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#16BAC5] to-[#7AE582]" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-[#7AE582] font-semibold uppercase">{p.category}</div>
                  <div className="text-white font-semibold mt-1">{p.title}</div>
                  <div className="text-white/60 text-xs mt-1">{p.date} • {p.readTime}</div>
                  <p className="text-white/80 text-sm mt-2 line-clamp-2">{p.excerpt}</p>
                  <div className="mt-3 flex items-center justify-end">
                    <button onClick={() => onDelete(p.slug)} className="text-red-300 hover:text-red-200 text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
