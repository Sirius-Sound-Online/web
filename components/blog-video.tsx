type Props = {
  src?: string;
  youtube?: string;
  vimeo?: string;
  poster?: string;
  caption?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

export default function BlogVideo({
  src,
  youtube,
  vimeo,
  poster,
  caption,
  autoPlay = false,
  loop = false,
  muted = false,
}: Props) {
  // YouTube embed
  if (youtube) {
    return (
      <figure className="my-8 space-y-4">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full rounded-3xl border border-white/10"
            src={`https://www.youtube.com/embed/${youtube}`}
            title={caption || "Video"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {caption && <figcaption className="text-sm text-zinc-400">{caption}</figcaption>}
      </figure>
    );
  }

  // Vimeo embed
  if (vimeo) {
    return (
      <figure className="my-8 space-y-4">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full rounded-3xl border border-white/10"
            src={`https://player.vimeo.com/video/${vimeo}`}
            title={caption || "Video"}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
        {caption && <figcaption className="text-sm text-zinc-400">{caption}</figcaption>}
      </figure>
    );
  }

  // Self-hosted video
  if (src) {
    return (
      <figure className="my-8 space-y-4">
        <video
          controls={!autoPlay}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          poster={poster}
          className="w-full rounded-3xl border border-white/10 bg-black/40"
        >
          <source src={src} type={`video/${src.split('.').pop()}`} />
          Your browser does not support the video tag.
        </video>
        {caption && <figcaption className="text-sm text-zinc-400">{caption}</figcaption>}
      </figure>
    );
  }

  return null;
}
