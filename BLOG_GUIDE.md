# Blog Post Guide

## How to Add a New Blog Post

Blog posts are stored as MDX files in `/content/blog/` directory. They are automatically processed by Contentlayer and displayed on your site.

### Step 1: Create a New MDX File

Create a file in `/content/blog/` with a descriptive filename:
```
/content/blog/your-post-slug.mdx
```

### Step 2: Add Frontmatter

Every post needs frontmatter (metadata) at the top:

```mdx
---
title: "Your Post Title"
excerpt: "A short description that appears in post listings and meta tags"
date: 2024-10-14
author: "Author Name"
tags:
  - tag1
  - tag2
featureType: "Article"  # Optional: "Article", "Research", "Announcement", etc.
ogImage: "/images/blog/your-image.png"  # Optional: Social media preview image
heroImage: "/images/blog/hero.svg"  # Optional: Hero image at top of post
pollId: "formbricks-id"  # Optional: Formbricks survey ID
---
```

### Step 3: Write Your Content

After the frontmatter, write your post in Markdown/MDX:

```mdx
## Main Heading

Your introduction paragraph here.

### Subheading

- List item 1
- List item 2

**Bold text** and *italic text*

[Link text](https://example.com)
```

### Step 4: Use Components (Optional)

You can import and use React components in your MDX:

```mdx
import BlogImage from "@/components/blog-image";
import FormbricksSurvey from "@/components/formbricks-survey";

<BlogImage
  src="/images/blog/example.jpg"
  alt="Description"
  caption="Optional caption"
/>

<FormbricksSurvey surveyId="your-survey-id" mode="inline" />
```

### Step 5: Save and View

1. Save the file
2. Contentlayer will automatically detect the change
3. Visit `http://localhost:3000/blog` to see your new post
4. Click on it to view the full post at `/blog/your-post-slug`

## Frontmatter Fields Reference

### Required Fields
- `title`: Post title (string)
- `excerpt`: Short description (string)
- `date`: Publication date (YYYY-MM-DD format)
- `author`: Author name (string)

### Optional Fields
- `tags`: Array of tags (string[])
- `ogImage`: Social media preview image URL (string)
- `featureType`: Category badge shown on post (string)
- `heroImage`: Large image at top of post (string)
- `pollId`: Formbricks survey ID to embed (string)

## Examples

Check existing posts in `/content/blog/` for examples:
- `introducing-hybrid-core.mdx` - Research post with images and survey
- `welcome-to-sirius-sound.mdx` - Simple announcement post

## Permissions Model

### Blog Posts (Reading)
- ✅ **Everyone** can read blog posts (no authentication required)
- ✅ Posts are publicly accessible
- ✅ SEO optimized with proper meta tags

### Blog Posts (Writing)
- ✅ **Authors/Admins** create posts by adding MDX files to `/content/blog/`
- ❌ No UI-based CMS (posts are file-based)
- ✅ Use git to version control your posts

### Comments (Giscus)
- ❌ **Visitors** cannot comment (must sign in)
- ✅ **Authenticated users** (signed in with GitHub) can comment via Giscus
- ✅ Comments are stored in GitHub Discussions

## Tips

1. **Images**: Store images in `/public/images/blog/` and reference them as `/images/blog/filename.jpg`
2. **Slugs**: The filename determines the URL slug (e.g., `my-post.mdx` → `/blog/my-post`)
3. **Drafts**: Add files without committing them to git to keep them as drafts
4. **Preview**: The dev server hot-reloads when you save MDX files
5. **Tags**: Use consistent tag names for better organization and filtering
