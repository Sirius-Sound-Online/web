# Media Guide for Blog Posts

## Directory Structure

Store your media files in the `/public/` directory:

```
/public/
  ├── images/          # Images
  │   ├── blog/        # Blog post images
  │   └── ...
  ├── audio/           # Audio files
  ├── video/           # Video files (create this)
  └── docs/            # Documents (PDFs, etc.)
```

**Important:** Files in `/public/` are served at the root URL.
- `/public/images/blog/photo.jpg` → accessible as `/images/blog/photo.jpg`

---

## 1. Images (Картинки)

### Method 1: Using the BlogImage Component (Recommended)

The `BlogImage` component provides:
- Optimized Next.js Image loading
- Consistent styling
- Optional captions
- Responsive sizing

```mdx
import BlogImage from "@/components/blog-image";

<BlogImage
  src="/images/blog/my-photo.jpg"
  alt="Description for accessibility"
  caption="Optional caption text"
/>
```

**Supported formats:** JPG, PNG, WebP, SVG, AVIF

### Method 2: Standard Markdown

```mdx
![Alt text](/images/blog/my-photo.jpg)
```

### Method 3: HTML with Custom Styling

```mdx
<img
  src="/images/blog/my-photo.jpg"
  alt="Description"
  className="rounded-lg w-full"
/>
```

### Where to Store Images

```
/public/images/blog/your-image.jpg
/public/images/blog/your-image.png
/public/images/blog/your-image.svg
```

---

## 2. Animations (Анимации)

### Method 1: Animated GIFs

Store GIF files in `/public/images/blog/`:

```mdx
import BlogImage from "@/components/blog-image";

<BlogImage
  src="/images/blog/animation.gif"
  alt="Animation showing the process"
  caption="Animated demonstration"
/>
```

Or with standard Markdown:
```mdx
![Animation](/images/blog/animation.gif)
```

### Method 2: Video as Animation (Better Quality)

Use MP4/WebM instead of GIF for better quality and smaller file size:

```mdx
<video
  autoPlay
  loop
  muted
  playsInline
  className="w-full rounded-3xl border border-white/10"
>
  <source src="/video/animation.mp4" type="video/mp4" />
  <source src="/video/animation.webm" type="video/webm" />
</video>
```

**Where to store:** `/public/video/animation.mp4`

### Method 3: Lottie Animations (JSON)

For vector animations, you can use Lottie:
1. Export animation as JSON from After Effects
2. Store in `/public/animations/`
3. Use a Lottie React component (would need to install package)

---

## 3. Videos (Видео)

### Method 1: YouTube Embed (Recommended for Long Videos)

```mdx
<div className="my-8">
  <iframe
    className="w-full aspect-video rounded-3xl"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Video title"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
</div>
```

Replace `VIDEO_ID` with your YouTube video ID.

### Method 2: Self-Hosted Video

Store video files in `/public/video/`:

```mdx
<video
  controls
  className="w-full rounded-3xl border border-white/10 my-8"
  poster="/images/blog/video-thumbnail.jpg"
>
  <source src="/video/demo.mp4" type="video/mp4" />
  <source src="/video/demo.webm" type="video/webm" />
  Your browser does not support the video tag.
</video>
```

**Supported formats:** MP4, WebM, OGV

**Where to store:** `/public/video/your-video.mp4`

### Method 3: Vimeo Embed

```mdx
<div className="my-8">
  <iframe
    className="w-full aspect-video rounded-3xl"
    src="https://player.vimeo.com/video/VIDEO_ID"
    title="Video title"
    allow="autoplay; fullscreen; picture-in-picture"
    allowFullScreen
  />
</div>
```

---

## 4. Audio (Аудио)

### Method 1: Audio Player

For audio files (already stored in `/public/audio/`):

```mdx
<audio
  controls
  className="w-full my-8"
>
  <source src="/audio/prototype-loop.wav" type="audio/wav" />
  <source src="/audio/prototype-loop.mp3" type="audio/mpeg" />
  Your browser does not support the audio element.
</audio>
```

**Supported formats:** MP3, WAV, OGG, AAC

**Where to store:** `/public/audio/your-audio.mp3`

### Method 2: With Custom Styling

```mdx
<div className="my-8 rounded-3xl border border-white/10 bg-black/40 p-6">
  <p className="text-sm text-zinc-400 mb-3">Audio Sample: Hybrid Pickup Tone</p>
  <audio controls className="w-full">
    <source src="/audio/sample.mp3" type="audio/mpeg" />
  </audio>
</div>
```

---

## 5. Documents (Документы)

### PDFs and Downloads

```mdx
Download our [technical whitepaper](/docs/sirius-whitepaper-v0.pdf) (PDF, 2.5MB)
```

**Where to store:** `/public/docs/your-document.pdf`

---

## 6. Image Galleries

### Side-by-Side Images

```mdx
<div className="grid grid-cols-2 gap-4 my-8">
  <img src="/images/blog/before.jpg" alt="Before" className="rounded-lg" />
  <img src="/images/blog/after.jpg" alt="After" className="rounded-lg" />
</div>
```

### Three Column Grid

```mdx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
  <img src="/images/blog/1.jpg" alt="Image 1" className="rounded-lg" />
  <img src="/images/blog/2.jpg" alt="Image 2" className="rounded-lg" />
  <img src="/images/blog/3.jpg" alt="Image 3" className="rounded-lg" />
</div>
```

---

## File Size Recommendations

| Media Type | Max Recommended Size | Best Format |
|------------|---------------------|-------------|
| Blog images | < 500 KB | JPG, WebP |
| Thumbnails | < 100 KB | JPG, WebP |
| GIF animations | < 2 MB | GIF or MP4 |
| Self-hosted video | < 10 MB | MP4 (H.264) |
| Audio samples | < 5 MB | MP3 |
| SVG icons | < 50 KB | SVG |

**Tip:** Use tools like:
- **Images:** [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
- **Video:** [HandBrake](https://handbrake.fr/), FFmpeg
- **GIF → Video:** [FFmpeg](https://ffmpeg.org/) to convert GIF to MP4

---

## Complete Example

Here's a blog post with all media types:

```mdx
---
title: "Complete Media Demo"
excerpt: "Showing all media types"
date: 2024-10-14
author: "Your Name"
---

import BlogImage from "@/components/blog-image";

## Images

<BlogImage
  src="/images/blog/hero.jpg"
  alt="Hero image"
  caption="This is a caption"
/>

## Animation

![Loading animation](/images/blog/loading.gif)

## Video

<video controls className="w-full rounded-3xl my-8">
  <source src="/video/demo.mp4" type="video/mp4" />
</video>

## YouTube

<div className="my-8">
  <iframe
    className="w-full aspect-video rounded-3xl"
    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    allowFullScreen
  />
</div>

## Audio

<audio controls className="w-full my-8">
  <source src="/audio/sample.mp3" type="audio/mpeg" />
</audio>

## Download

Download the [PDF guide](/docs/guide.pdf)
```

---

## Tips & Best Practices

1. **Optimize images** before uploading (use WebP format when possible)
2. **Use descriptive alt text** for accessibility
3. **Prefer YouTube/Vimeo** for long videos (saves bandwidth)
4. **Use GIFs sparingly** (they're large - consider MP4 instead)
5. **Always provide fallback formats** for audio/video
6. **Test on mobile** to ensure media loads properly
7. **Use lazy loading** (Next.js Image does this automatically)

---

## Quick Reference: File Paths

```
Blog image:     /public/images/blog/name.jpg    → /images/blog/name.jpg
Video:          /public/video/name.mp4          → /video/name.mp4
Audio:          /public/audio/name.mp3          → /audio/name.mp3
Document:       /public/docs/name.pdf           → /docs/name.pdf
```

Remember: The `/public/` folder maps to the root `/` in your URLs!
