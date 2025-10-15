/**
 * Client-safe media utilities
 * These can be imported by both server and client components
 */

export type MediaFile = {
  name: string;
  path: string;
  size: number;
  type: string;
  url: string;
  createdAt: Date;
};

export type MediaCategory = "images" | "video" | "audio";

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
