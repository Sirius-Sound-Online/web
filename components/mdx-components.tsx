import type { MDXComponents } from "mdx/types";
import BlogImage from "@/components/blog-image";
import BlogVideo from "@/components/blog-video";
import FormbricksSurvey from "@/components/formbricks-survey";
import { DisqusComments } from "@/components/disqus-comments";

export const mdxComponents: MDXComponents = {
  BlogImage,
  BlogVideo,
  FormbricksSurvey,
  DisqusComments,
  h2: (props) => <h2 className="mt-10 text-2xl font-semibold text-white" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-semibold text-white" {...props} />,
  p: (props) => <p className="mt-4 text-base leading-7 text-zinc-300" {...props} />,
  ul: (props) => <ul className="mt-4 space-y-2 text-base text-zinc-300" {...props} />,
  ol: (props) => <ol className="mt-4 space-y-2 text-base text-zinc-300 list-decimal list-inside" {...props} />,
  li: (props) => <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent" {...props} />,
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  audio: (props) => <audio className="my-6 w-full rounded-2xl border border-white/10" {...props} />,
};
