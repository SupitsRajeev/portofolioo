"use client";

import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image URL" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value || "");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [inputMode, setInputMode] = useState<"url" | "upload">("url");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await response.json();
      setPreview(data.url);
      onChange(data.url);
      setError(null);
      
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload failed";
      setError(message);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onChange(url);
    setError(null);
  };

  const handleClear = () => {
    setPreview("");
    onChange("");
    setError(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-300">{label}</label>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setInputMode("url")}
          className={`px-3 py-1 text-sm rounded transition ${
            inputMode === "url"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Paste URL
        </button>
        <button
          type="button"
          onClick={() => setInputMode("upload")}
          className={`px-3 py-1 text-sm rounded transition ${
            inputMode === "upload"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Upload File
        </button>
      </div>

      {/* URL Input */}
      {inputMode === "url" && (
        <input
          type="url"
          value={preview}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
      )}

      {/* File Upload */}
      {inputMode === "upload" && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full px-4 py-3 border-2 border-dashed border-gray-700 rounded-lg hover:border-blue-500 transition flex items-center justify-center gap-2 text-gray-300 hover:text-white disabled:opacity-50"
          >
            <Upload size={18} />
            {uploading ? "Uploading..." : "Click to upload or drag & drop"}
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-sm text-red-400 bg-red-950 bg-opacity-30 p-2 rounded">
          {error}
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover"
            onError={(e) => {
              console.error("Image load error:", e);
              setError("Failed to load image");
            }}
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 rounded-full transition"
            title="Clear image"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Status */}
      {preview && !error && (
        <div className="text-xs text-green-400 flex items-center gap-1">
          <ImageIcon size={14} />
          Image ready to use
        </div>
      )}
    </div>
  );
}
