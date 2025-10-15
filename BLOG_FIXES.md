# Blog Post Issues - Fixed

## Summary of Issues and Solutions

### Issue 1: Audio Files Don't Play ❌ → ✅

**Problem**: Audio player showed up but files returned 404 errors
- `/audio/hybrid-core-sample.mp3` - 404
- `/video/demo.mp4` - 404
- `/images/video-poster.jpg` - 404

**Solution**: Updated blog post to clarify these are **examples** showing how to use media components:
- Added clear notes explaining these are placeholders
- Provided instructions on how to add real media files:
  ```
  - Place video files in `/public/video/` directory
  - Place audio files in `/public/audio/` directory
  - Reference them like: `<audio controls src="/audio/your-file.mp3" />`
  ```

---

### Issue 2: Formbricks Survey Shows "Loading survey..." ⏳ → ✅

**Problem**: Survey component displayed "Loading survey..." indefinitely

**Root Cause**: The `surveyId="clwxyz123"` is a **placeholder**, not a real survey ID

**Solution**: Added clear explanation in the blog post:
```markdown
### User Feedback Survey

Below is a Formbricks survey component. To see it working:
1. Create a survey in your Formbricks account
2. Get the survey ID
3. Replace `surveyId="clwxyz123"` with your actual survey ID

**Note**: The survey shows "Loading survey..." because the `surveyId` is a
placeholder. In production, you would use a real survey ID from your
Formbricks dashboard.
```

**How to create a real survey**:
1. Go to https://app.formbricks.com (or your Formbricks instance)
2. Create a new survey
3. Get the survey ID from the embed code
4. Replace `clwxyz123` with your actual survey ID

---

### Issue 3: GitHub Login Required for Comments 🔐 → ✅ (By Design)

**Problem**: User logged in with **Google** on the site, but comments require **GitHub** login

**Root Cause**: This is **by design**! Here's why:

**Your site has TWO separate authentication systems:**

1. **Site Authentication (NextAuth)**:
   - Providers: Google, GitHub, Email
   - Used for: Account management, waitlist, user profile
   - Session stored in: SQLite database via Prisma
   - Your current login: Google ✅

2. **Giscus Comments (GitHub Discussions)**:
   - Provider: **GitHub only**
   - Used for: Blog post comments
   - Session stored in: GitHub (via OAuth)
   - Comments location: GitHub repository Discussions tab
   - Your login required: GitHub ⚠️

**Why separate?**
- Giscus is powered by **GitHub Discussions** - a GitHub feature
- Comments are stored in your GitHub repository, not your database
- Benefits:
  - Comments are version-controlled
  - Public and transparent
  - No database storage needed
  - Leverages GitHub's spam protection
  - Developers can comment with their GitHub identity

**Solution**: Added clear explanation in blog post:
```markdown
**Note about commenting**: Comments use **Giscus**, which is powered by
GitHub Discussions. This means:
- You need a GitHub account to comment (separate from site login)
- Comments are stored in the GitHub repository's Discussions
- This keeps all discussions public and version-controlled
- Even if you're logged into the site with Google/email, you'll need to
  authenticate with GitHub to comment
```

---

## What Works Now ✅

1. **Blog Post Loads**: No more `process is not defined` errors
2. **Media Examples**: Clear documentation showing how to add images, videos, audio
3. **YouTube Videos**: Working embed example (Rick Astley video)
4. **Survey Component**: Shows with proper explanation that it's a placeholder
5. **Comments Section**: Loads with clear explanation about GitHub requirement
6. **Styling**: All MDX elements properly styled (h2, h3, lists, audio, etc.)

---

## Next Steps (Optional)

### To Add Real Media Files:

1. **Audio files**:
   ```bash
   mkdir -p public/audio
   # Add your .mp3 files here
   ```
   Then use: `<audio controls src="/audio/your-file.mp3" />`

2. **Video files**:
   ```bash
   mkdir -p public/video
   # Add your .mp4 files here
   ```
   Then use: `<BlogVideo src="/video/your-file.mp4" />`

### To Add Real Formbricks Survey:

1. Create survey at https://app.formbricks.com
2. Get survey ID (looks like: `cm3f8j9k0000...`)
3. Replace in MDX: `<FormbricksSurvey surveyId="your-real-id" mode="inline" />`

### To Comment on Blog Posts:

1. Make sure you have a GitHub account
2. Click "Sign in with GitHub" in the Giscus comment section
3. Authorize the Giscus app
4. Your comments will appear in the repository's Discussions tab

---

## Technical Details

### Files Modified:
- `content/blog/introducing-hybrid-core.mdx` - Updated with explanations
- `components/formbricks-survey.tsx` - Fixed process.env access
- `components/giscus-comments.tsx` - Fixed process.env access
- `components/mdx-components.tsx` - Added h3, ol, audio styling

### Key Fixes:
- Moved `process.env` to module-level constants (prevents browser errors)
- Removed import statements from MDX (prevents bundling issues)
- Added comprehensive media examples
- Added clear user-facing explanations for all components
