"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ImageUpload";

type Tab =
  | "projects"
  | "blog"
  | "services"
  | "testimonials"
  | "faqs"
  | "hero"
  | "about"
  | "experience";

interface ContentItem {
  id: number;
  title?: string;
  name?: string;
  question?: string;
  [key: string]: any;
}

export default function AdminPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form data varies by content type
  const [formData, setFormData] = useState<any>({});

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "projects", label: "Projects", icon: "🎨" },
    { id: "blog", label: "Blog Posts", icon: "📝" },
    { id: "services", label: "Services", icon: "⚙️" },
    { id: "testimonials", label: "Testimonials", icon: "⭐" },
    { id: "faqs", label: "FAQs", icon: "❓" },
    { id: "hero", label: "Hero Section", icon: "🌟" },
    { id: "about", label: "About Section", icon: "👤" },
    { id: "experience", label: "Experience", icon: "💼" },
  ];

  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const getApiEndpoint = () => {
    const endpoints: Record<Tab, string> = {
      projects: `${API_BASE}/api/projects`,
      blog: `${API_BASE}/api/blog`,
      services: `${API_BASE}/api/services`,
      testimonials: `${API_BASE}/api/testimonials`,
      faqs: `${API_BASE}/api/faqs`,
      hero: `${API_BASE}/api/hero`,
      about: `${API_BASE}/api/about`,
      experience: `${API_BASE}/api/experience`,
    };
    return endpoints[activeTab];
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(getApiEndpoint());
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      setItems(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: `Failed to fetch ${activeTab}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(`Delete this ${activeTab.slice(0, -1)}?`)) return;

    try {
      const response = await fetch(`${getApiEndpoint()}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");

      toast({ title: "Success", description: "Deleted successfully!" });
      fetchItems();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to delete",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: ContentItem) => {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({});
    setEditingId(null);
    setShowForm(false);
  };

  const getDisplayName = (item: ContentItem): string => {
    return item.title || item.name || item.question || `Item ${item.id}`;
  };

  // Clean form data based on content type - only send relevant fields
  const cleanFormData = (data: any, tab: Tab) => {
    const cleaned: any = {};
    
    switch(tab) {
      case 'projects':
        Object.assign(cleaned, {
          title: data.title,
          description: data.description,
          longDescription: data.longDescription,
          category: data.category,
          tags: data.tags,
          featured: data.featured || false,
          imageUrl: data.imageUrl,
          technologies: data.technologies,
          liveUrl: data.liveUrl,
          githubUrl: data.githubUrl,
        });
        break;
      case 'blog':
        Object.assign(cleaned, {
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          slug: data.slug,
          author: data.author,
          category: data.category,
          tags: data.tags,
          coverImage: data.coverImage,
          published: data.published || false,
        });
        break;
      case 'testimonials':
        Object.assign(cleaned, {
          name: data.name,
          role: data.role,
          company: data.company,
          content: data.content,
          rating: data.rating,
          image: data.image,
          featured: data.featured || false,
        });
        break;
      case 'faqs':
        Object.assign(cleaned, {
          question: data.question,
          answer: data.answer,
          category: data.category,
        });
        break;
      case 'services':
        Object.assign(cleaned, {
          title: data.title,
          description: data.description,
          icon: data.icon,
        });
        break;
      case 'experience':
        Object.assign(cleaned, {
          title: data.title,
          company: data.company,
          period: data.period,
          description: data.description,
        });
        break;
      default:
        return data;
    }
    
    // Remove undefined/null values
    return Object.fromEntries(
      Object.entries(cleaned).filter(([_, v]) => v !== null && v !== undefined && v !== '')
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Portfolio CMS</h1>
          <p className="text-gray-400">Manage all your portfolio content</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-4 border-b border-gray-800">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowForm(false);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {/* Header with Add Button */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
            {!showForm && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({});
                  setShowForm(true);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
              >
                + Add New
              </button>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <a
              href="/"
              className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition text-center"
            >
              <div className="text-2xl mb-2">👁️</div>
              <p className="text-gray-300 text-sm">View Website</p>
            </a>
            <a
              href="http://localhost:3001/api"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-900 border border-gray-800 rounded-lg hover:border-gray-700 transition text-center"
            >
              <div className="text-2xl mb-2">🔌</div>
              <p className="text-gray-300 text-sm">API Docs</p>
            </a>
            <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg text-center">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-gray-300 text-sm">{items.length} Items</p>
            </div>
            <div className="p-4 bg-gray-900 border border-gray-800 rounded-lg text-center">
              <div className="text-2xl mb-2">✨</div>
              <p className="text-gray-300 text-sm">Live Updates</p>
            </div>
          </div>

          {/* Form Section */}
          {showForm && (
            <div className="mb-8 p-6 bg-gray-900 border border-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  {editingId ? `Edit ${activeTab.slice(0, -1)}` : `Add New ${activeTab.slice(0, -1)}`}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>
              
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const method = editingId ? "PUT" : "POST";
                    const url = editingId
                      ? `${getApiEndpoint()}/${editingId}`
                      : getApiEndpoint();

                    // Set smart defaults for new items
                    let submitData = cleanFormData(formData, activeTab);
                    if (!editingId) {
                      if (activeTab === "blog") submitData.published = true;
                      if (activeTab === "testimonials") submitData.featured = true;
                    }

                    // Debug logging
                    console.log(`[${method}] Submitting to ${url}:`, submitData);

                    const response = await fetch(url, {
                      method,
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(submitData),
                    });

                    if (!response.ok) {
                      const errorData = await response.json();
                      console.error(`[${method}] Error response:`, errorData);
                      throw new Error(errorData.error || `Failed to save (${response.status})`);
                    }

                    const result = await response.json();
                    
                    toast({
                      title: "Success",
                      description: `${editingId ? "Updated" : "Created"} successfully! ID: ${result.id}`,
                    });
                    resetForm();
                    // Refresh data
                    setTimeout(() => fetchItems(), 500);
                  } catch (error) {
                    console.error("[Form Submission Error]", error);
                    toast({
                      title: "Error",
                      description: error instanceof Error ? error.message : "Failed to save",
                      variant: "destructive",
                    });
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title {activeTab !== "faqs" && activeTab !== "testimonials" && "*"}
                  </label>
                  <input
                    type="text"
                    value={formData.title || formData.name || formData.question || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ...(activeTab === "faqs"
                          ? { question: e.target.value }
                          : activeTab === "testimonials"
                          ? { name: e.target.value }
                          : { title: e.target.value }),
                      })
                    }
                    placeholder={
                      activeTab === "faqs"
                        ? "Question"
                        : activeTab === "testimonials"
                        ? "Name"
                        : "Title"
                    }
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description || formData.answer || formData.content || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ...(activeTab === "faqs"
                          ? { answer: e.target.value }
                          : activeTab === "testimonials" || activeTab === "blog"
                          ? { content: e.target.value }
                          : { description: e.target.value }),
                      })
                    }
                    placeholder="Description"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                {activeTab === "projects" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category
                        </label>
                        <input
                          type="text"
                          value={formData.category || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          placeholder="e.g., Web Design"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <ImageUpload
                      value={formData.imageUrl || ""}
                      onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                      label="Project Image"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Technologies (comma-separated)
                      </label>
                      <input
                        type="text"
                        value={(formData.technologies || []).join(", ")}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            technologies: e.target.value
                              .split(",")
                              .map((t) => t.trim())
                              .filter(Boolean),
                          })
                        }
                        placeholder="React, TypeScript, Tailwind CSS"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          GitHub URL
                        </label>
                        <input
                          type="url"
                          value={formData.githubUrl || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, githubUrl: e.target.value })
                          }
                          placeholder="https://github.com/..."
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Live URL
                        </label>
                        <input
                          type="url"
                          value={formData.liveUrl || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, liveUrl: e.target.value })
                          }
                          placeholder="https://..."
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={formData.featured || false}
                        onChange={(e) =>
                          setFormData({ ...formData, featured: e.target.checked })
                        }
                        className="rounded"
                      />
                      <label htmlFor="featured" className="text-sm text-gray-300">
                        Featured Project
                      </label>
                    </div>
                  </>
                )}

                    <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                  >
                    {editingId ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>

                {activeTab === "blog" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Slug
                        </label>
                        <input
                          type="text"
                          value={formData.slug || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, slug: e.target.value })
                          }
                          placeholder="my-blog-post"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Author
                        </label>
                        <input
                          type="text"
                          value={formData.author || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, author: e.target.value })
                          }
                          placeholder="Author name"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Excerpt
                      </label>
                      <textarea
                        value={formData.excerpt || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, excerpt: e.target.value })
                        }
                        placeholder="Brief summary of the blog post"
                        rows={2}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category
                        </label>
                        <input
                          type="text"
                          value={formData.category || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          placeholder="e.g., Tutorial"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={(formData.tags || []).join(", ")}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean),
                            })
                          }
                          placeholder="design, tutorial, web"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                   <ImageUpload
                     value={formData.coverImage || ""}
                     onChange={(url) => setFormData({ ...formData, coverImage: url })}
                     label="Blog Cover Image"
                   />
                   <div className="flex items-center gap-2">
                     <input
                       type="checkbox"
                       id="published"
                       checked={formData.published || false}
                       onChange={(e) =>
                         setFormData({ ...formData, published: e.target.checked })
                       }
                       className="rounded"
                     />
                     <label htmlFor="published" className="text-sm text-gray-300">
                       Publish this blog post
                     </label>
                   </div>
                  </>
                )}

                {activeTab === "testimonials" && (
                  <>
                   <ImageUpload
                     value={formData.image || ""}
                     onChange={(url) => setFormData({ ...formData, image: url })}
                     label="Testimonial Avatar"
                   />
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Role
                        </label>
                        <input
                          type="text"
                          value={formData.role || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                          placeholder="e.g., Designer"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={formData.company || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          placeholder="Company name"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Rating (1-5)
                      </label>
                      <select
                        value={formData.rating || 5}
                        onChange={(e) =>
                          setFormData({ ...formData, rating: parseInt(e.target.value) })
                        }
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      >
                        {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num} ⭐</option>)}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featured-testimonial"
                        checked={formData.featured || false}
                        onChange={(e) =>
                          setFormData({ ...formData, featured: e.target.checked })
                        }
                        className="rounded"
                      />
                      <label htmlFor="featured-testimonial" className="text-sm text-gray-300">
                        Feature this testimonial
                      </label>
                    </div>
                  </>
                )}

                {activeTab === "faqs" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category
                      </label>
                      <input
                        type="text"
                        value={formData.category || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        placeholder="e.g., Services"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </>
                )}

                {activeTab === "services" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Short Description
                      </label>
                      <input
                        type="text"
                        value={formData.shortDesc || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, shortDesc: e.target.value })
                        }
                        placeholder="Brief overview"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Description
                      </label>
                      <textarea
                        value={formData.fullDescription || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, fullDescription: e.target.value })
                        }
                        placeholder="Detailed service description"
                        rows={4}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                   <ImageUpload
                     value={formData.image || ""}
                     onChange={(url) => setFormData({ ...formData, image: url })}
                     label="Service Featured Image"
                   />
                  </>
                )}

                {activeTab === "experience" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={formData.company || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          placeholder="Company name"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Start Date
                        </label>
                        <input
                          type="text"
                          value={formData.startDate || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, startDate: e.target.value })
                          }
                          placeholder="e.g., 2020-01"
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        End Date (leave empty if current)
                      </label>
                      <input
                        type="text"
                        value={formData.endDate || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, endDate: e.target.value })
                        }
                        placeholder="e.g., 2023-12"
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                  >
                    {editingId ? "Update" : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Items List */}
          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No {activeTab} yet. Create your first one!
            </div>
          ) : (
            <div className="grid gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900 rounded-lg p-4 border border-gray-800 flex justify-between items-center hover:border-gray-700 transition"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                      {getDisplayName(item)}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {Object.entries(item)
                        .slice(1, 3)
                        .map(([key, value]) =>
                          value && typeof value === "string"
                            ? `${key}: ${value.substring(0, 50)}...`
                            : null
                        )
                        .filter(Boolean)
                        .join(" • ") || "No additional info"}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Note */}
          <div className="mt-8 p-4 bg-gray-900 border border-gray-800 rounded-lg text-sm text-gray-400">
            <p>
              💡 <strong>Pro Tip:</strong> Use curl commands or Postman for
              advanced editing. See ACCESS_YOUR_CONTENT.md for examples.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
