"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProjectFormProps {
  projectId: number | null;
  onSaved: () => void;
  onCancel: () => void;
}

interface Project {
  id?: number;
  title: string;
  description: string;
  longDescription?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  imageUrl?: string;
  images?: Array<{ url: string; alt: string }>;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  displayOrder?: number;
}

export default function ProjectForm({
  projectId,
  onSaved,
  onCancel,
}: ProjectFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Project>({
    title: "",
    description: "",
    longDescription: "",
    category: "",
    tags: [],
    featured: false,
    imageUrl: "",
    images: [],
    technologies: [],
    liveUrl: "",
    githubUrl: "",
    displayOrder: 0,
  });
  const [tagInput, setTagInput] = useState("");
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${projectId}`);
      if (!response.ok) throw new Error("Failed to fetch project");
      const data = await response.json();
      setFormData(data);
      setTagInput(data.tags?.join(", ") || "");
      setTechInput(data.technologies?.join(", ") || "");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to fetch project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    });
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      const tags = tagInput.split(",").map((t) => t.trim());
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), ...tags],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((_, i) => i !== index) || [],
    });
  };

  const handleAddTech = () => {
    if (techInput.trim()) {
      const techs = techInput.split(",").map((t) => t.trim());
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), ...techs],
      });
      setTechInput("");
    }
  };

  const handleRemoveTech = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies?.filter((_, i) => i !== index) || [],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = projectId ? `/api/projects/${projectId}` : "/api/projects";
      const method = projectId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save project");

      onSaved();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 rounded-lg p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        {projectId ? "Edit Project" : "Create New Project"}
      </h2>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Your project title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Short Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Brief project description"
          />
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Detailed Description
          </label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="Full project details"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="e.g., Web Development, Design"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Enter tags separated by commas"
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags?.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-blue-600 px-3 py-1 rounded-full text-sm text-white"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="hover:text-gray-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Technologies
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Enter technologies separated by commas"
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddTech}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.technologies?.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 bg-purple-600 px-3 py-1 rounded-full text-sm text-white"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(index)}
                  className="hover:text-gray-300"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Main Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Live URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Live URL
          </label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="https://example.com"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            GitHub URL
          </label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            placeholder="https://github.com/username/repo"
          />
        </div>

        {/* Display Order */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Display Order
          </label>
          <input
            type="number"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={formData.featured || false}
            onChange={handleChange}
            className="w-5 h-5 rounded border-gray-600 bg-gray-700 cursor-pointer"
          />
          <label htmlFor="featured" className="text-sm font-medium text-gray-300 cursor-pointer">
            Featured Project
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-semibold transition"
        >
          {loading ? "Saving..." : "Save Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
