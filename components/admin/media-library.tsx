"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MediaFile, formatFileSize } from "@/lib/admin/file-operations";

type Props = {
  initialImages: MediaFile[];
  initialVideos: MediaFile[];
  initialAudio: MediaFile[];
};

type Category = "images" | "video" | "audio";

export function MediaLibrary({ initialImages, initialVideos, initialAudio }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Category>("images");
  const [uploading, setUploading] = useState(false);

  const data = {
    images: initialImages,
    video: initialVideos,
    audio: initialAudio,
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("category", activeTab);

        const response = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }
      }

      router.refresh();
    } catch (error) {
      alert("Error uploading files");
      console.error(error);
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const handleDelete = async (fileName: string) => {
    if (!confirm(`Are you sure you want to delete ${fileName}?`)) {
      return;
    }

    try {
      const response = await fetch(
        `/api/admin/media?category=${activeTab}&fileName=${fileName}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      router.refresh();
    } catch (error) {
      alert("Error deleting file");
      console.error(error);
    }
  };

  const handleCopyPath = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("Path copied to clipboard!");
  };

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 flex gap-2 rounded-2xl border border-white/10 bg-[#0C0F13] p-2">
        <button
          onClick={() => setActiveTab("images")}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
            activeTab === "images"
              ? "bg-accent/20 text-accent"
              : "text-white/60 hover:text-white"
          }`}
        >
          Images ({data.images.length})
        </button>
        <button
          onClick={() => setActiveTab("video")}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
            activeTab === "video"
              ? "bg-accent/20 text-accent"
              : "text-white/60 hover:text-white"
          }`}
        >
          Videos ({data.video.length})
        </button>
        <button
          onClick={() => setActiveTab("audio")}
          className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium transition ${
            activeTab === "audio"
              ? "bg-accent/20 text-accent"
              : "text-white/60 hover:text-white"
          }`}
        >
          Audio ({data.audio.length})
        </button>
      </div>

      {/* Upload */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Upload {activeTab === "images" ? "Images" : activeTab === "video" ? "Videos" : "Audio"}
        </h3>

        <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-8 transition hover:border-accent hover:bg-accent/5">
          <span className="text-4xl">
            {activeTab === "images" ? "🖼️" : activeTab === "video" ? "🎥" : "🎵"}
          </span>
          <span className="text-sm font-medium text-white">
            Click to upload or drag and drop
          </span>
          <span className="text-xs text-white/50">
            {activeTab === "images" && "JPG, PNG, WebP, SVG (max 10MB)"}
            {activeTab === "video" && "MP4, WebM, MOV (max 100MB)"}
            {activeTab === "audio" && "MP3, WAV, OGG (max 50MB)"}
          </span>
          <input
            type="file"
            multiple
            accept={
              activeTab === "images"
                ? "image/*"
                : activeTab === "video"
                ? "video/*"
                : "audio/*"
            }
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>

        {uploading && (
          <div className="mt-4 text-center text-sm text-accent">
            Uploading...
          </div>
        )}
      </div>

      {/* Files Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data[activeTab].map((file) => (
          <div
            key={file.name}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C0F13] transition hover:border-accent/50"
          >
            {/* Preview */}
            <div className="aspect-video bg-black/40">
              {activeTab === "images" && (
                <Image
                  src={file.url}
                  alt={file.name}
                  width={400}
                  height={300}
                  className="h-full w-full object-cover"
                />
              )}
              {activeTab === "video" && (
                <video
                  src={file.url}
                  className="h-full w-full object-cover"
                  controls={false}
                />
              )}
              {activeTab === "audio" && (
                <div className="flex h-full items-center justify-center text-4xl">
                  🎵
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="truncate text-sm font-medium text-white">{file.name}</p>
              <p className="text-xs text-white/50">{formatFileSize(file.size)}</p>
            </div>

            {/* Actions */}
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/80 opacity-0 transition group-hover:opacity-100">
              <button
                onClick={() => handleCopyPath(file.url)}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-black transition hover:bg-accent-600"
              >
                Copy Path
              </button>
              <button
                onClick={() => handleDelete(file.name)}
                className="rounded-lg border border-red-500/50 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {data[activeTab].length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-12 text-center">
          <p className="text-white/50">
            No {activeTab} uploaded yet. Upload your first file above.
          </p>
        </div>
      )}
    </div>
  );
}
