import fs from "fs/promises";
import path from "path";
import { ALLOWED_IMAGE_TYPES, ALLOWED_VIDEO_TYPES, ALLOWED_AUDIO_TYPES, MAX_FILE_SIZES } from "./constants";

/**
 * File operations utilities for admin
 * Handles blog post and media file management
 */

// ============================================
// BLOG POST OPERATIONS
// ============================================

export type BlogPostMetadata = {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags?: string[];
  ogImage?: string;
  featureType?: string;
  heroImage?: string;
  pollId?: string;
};

export async function saveBlogPost(slug: string, frontmatter: BlogPostMetadata, content: string) {
  const contentDir = path.join(process.cwd(), "content", "blog");

  // Ensure directory exists
  await fs.mkdir(contentDir, { recursive: true });

  // Generate frontmatter
  const frontmatterString = [
    "---",
    `title: "${frontmatter.title}"`,
    `excerpt: "${frontmatter.excerpt}"`,
    `date: ${frontmatter.date}`,
    `author: "${frontmatter.author}"`,
    frontmatter.tags && frontmatter.tags.length > 0
      ? `tags:\n${frontmatter.tags.map((tag) => `  - ${tag}`).join("\n")}`
      : null,
    frontmatter.featureType ? `featureType: "${frontmatter.featureType}"` : null,
    frontmatter.heroImage ? `heroImage: "${frontmatter.heroImage}"` : null,
    frontmatter.ogImage ? `ogImage: "${frontmatter.ogImage}"` : null,
    frontmatter.pollId ? `pollId: "${frontmatter.pollId}"` : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  const fullContent = `${frontmatterString}\n\n${content}`;
  const filePath = path.join(contentDir, `${slug}.mdx`);

  await fs.writeFile(filePath, fullContent, "utf-8");

  return filePath;
}

export async function getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);

  try {
    const content = await fs.readFile(filePath, "utf-8");

    // Parse frontmatter
    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
      throw new Error("Invalid MDX format");
    }

    const [, frontmatterRaw, body] = match;

    // Simple frontmatter parsing
    const frontmatter: any = {};
    const lines = frontmatterRaw.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      if (line.startsWith("tags:")) {
        const tags: string[] = [];
        i++;
        while (i < lines.length && lines[i].startsWith("  - ")) {
          tags.push(lines[i].replace("  - ", "").trim());
          i++;
        }
        frontmatter.tags = tags;
        i--;
        continue;
      }

      const [key, ...valueParts] = line.split(":");
      const value = valueParts.join(":").trim().replace(/^["']|["']$/g, "");
      frontmatter[key] = value;
    }

    return {
      frontmatter: frontmatter as BlogPostMetadata,
      content: body.trim(),
    };
  } catch (error) {
    if ((error as any).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function getAllBlogPostSlugs() {
  const contentDir = path.join(process.cwd(), "content", "blog");

  try {
    const files = await fs.readdir(contentDir);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(".mdx", ""));
  } catch (error) {
    return [];
  }
}

export async function deleteBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
  await fs.unlink(filePath);
}

// ============================================
// MEDIA FILE OPERATIONS
// ============================================

export type MediaFile = {
  name: string;
  path: string;
  size: number;
  type: string;
  url: string;
  createdAt: Date;
};

export type MediaCategory = "images" | "video" | "audio";

export async function getMediaFiles(category: MediaCategory): Promise<MediaFile[]> {
  const publicDir = path.join(process.cwd(), "public", category);

  try {
    await fs.mkdir(publicDir, { recursive: true });
    const files = await fs.readdir(publicDir);

    const mediaFiles = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(publicDir, file);
        const stats = await fs.stat(filePath);

        return {
          name: file,
          path: filePath,
          size: stats.size,
          type: getFileType(file),
          url: `/${category}/${file}`,
          createdAt: stats.birthtime,
        };
      })
    );

    return mediaFiles.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    return [];
  }
}

export async function saveMediaFile(
  category: MediaCategory,
  fileName: string,
  buffer: Buffer
): Promise<MediaFile> {
  const publicDir = path.join(process.cwd(), "public", category);
  await fs.mkdir(publicDir, { recursive: true });

  // Sanitize filename
  const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = path.join(publicDir, sanitizedName);

  // Check if file already exists
  try {
    await fs.access(filePath);
    throw new Error("File already exists");
  } catch (error) {
    // File doesn't exist, continue
  }

  await fs.writeFile(filePath, buffer);

  const stats = await fs.stat(filePath);

  return {
    name: sanitizedName,
    path: filePath,
    size: stats.size,
    type: getFileType(sanitizedName),
    url: `/${category}/${sanitizedName}`,
    createdAt: stats.birthtime,
  };
}

export async function deleteMediaFile(category: MediaCategory, fileName: string) {
  const filePath = path.join(process.cwd(), "public", category, fileName);
  await fs.unlink(filePath);
}

// ============================================
// VALIDATION
// ============================================

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as any)) {
    return `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`;
  }

  if (file.size > MAX_FILE_SIZES.image) {
    return `File too large. Max size: ${MAX_FILE_SIZES.image / 1024 / 1024}MB`;
  }

  return null;
}

export function validateVideoFile(file: File): string | null {
  if (!ALLOWED_VIDEO_TYPES.includes(file.type as any)) {
    return `Invalid file type. Allowed: ${ALLOWED_VIDEO_TYPES.join(", ")}`;
  }

  if (file.size > MAX_FILE_SIZES.video) {
    return `File too large. Max size: ${MAX_FILE_SIZES.video / 1024 / 1024}MB`;
  }

  return null;
}

export function validateAudioFile(file: File): string | null {
  if (!ALLOWED_AUDIO_TYPES.includes(file.type as any)) {
    return `Invalid file type. Allowed: ${ALLOWED_AUDIO_TYPES.join(", ")}`;
  }

  if (file.size > MAX_FILE_SIZES.audio) {
    return `File too large. Max size: ${MAX_FILE_SIZES.audio / 1024 / 1024}MB`;
  }

  return null;
}

// ============================================
// HELPERS
// ============================================

function getFileType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  const typeMap: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",
  };

  return typeMap[ext] || "application/octet-stream";
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
