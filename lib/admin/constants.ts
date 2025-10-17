/**
 * Admin dashboard navigation items
 */
export const ADMIN_NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: "📊",
  },
  {
    label: "Community",
    href: "/admin/community",
    icon: "👥",
  },
  {
    label: "Waitlist",
    href: "/admin/waitlist",
    icon: "📋",
  },
  {
    label: "Queue",
    href: "/admin/queue",
    icon: "🎯",
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: "💳",
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: "✍️",
  },
  {
    label: "Media",
    href: "/admin/media",
    icon: "🖼️",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: "📈",
  },
  {
    label: "Tone Lab Stats",
    href: "/admin/tone-lab",
    icon: "🎸",
  },
  {
    label: "Revenue",
    href: "/admin/revenue",
    icon: "💰",
  },
  {
    label: "Database",
    href: "/admin/database",
    icon: "🗄️",
  },
] as const;

/**
 * Order status options
 */
export const ORDER_STATUSES = [
  "authorized",
  "captured",
  "cancelled",
  "refunded",
] as const;

/**
 * Waitlist status options
 */
export const WAITLIST_STATUSES = [
  "pending",
  "confirmed",
  "rejected",
] as const;

/**
 * User role options
 */
export const USER_ROLES = [
  "member",
  "admin",
  "moderator",
] as const;

/**
 * Allowed image file types
 */
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg+xml",
] as const;

/**
 * Allowed video file types
 */
export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
] as const;

/**
 * Allowed audio file types
 */
export const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
] as const;

/**
 * Maximum file upload sizes (in bytes)
 */
export const MAX_FILE_SIZES = {
  image: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024, // 100MB
  audio: 50 * 1024 * 1024, // 50MB
} as const;
