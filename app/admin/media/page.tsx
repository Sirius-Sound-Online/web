import { PageHeader } from "@/components/admin/page-header";
import { MediaLibrary } from "@/components/admin/media-library";
import { getMediaFiles } from "@/lib/admin/file-operations";

export default async function MediaPage() {
  const [images, videos, audio, blogImages] = await Promise.all([
    getMediaFiles("images"),
    getMediaFiles("video"),
    getMediaFiles("audio"),
    getMediaFiles("blog"),
  ]);

  return (
    <div>
      <PageHeader
        title="Media Library"
        subtitle="Upload and manage images, videos, and audio files"
      />

      <MediaLibrary
        initialImages={images}
        initialVideos={videos}
        initialAudio={audio}
        initialBlogImages={blogImages}
      />
    </div>
  );
}
