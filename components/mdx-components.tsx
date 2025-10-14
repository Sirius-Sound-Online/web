import type { MDXComponents } from "mdx/types";
import BlogImage from "@/components/blog-image";
import FormbricksSurvey from "@/components/formbricks-survey";

export const mdxComponents: MDXComponents = {
  BlogImage,
  FormbricksSurvey,
  h2: (props) => <h2 className="mt-10 text-2xl font-semibold text-white" {...props} />,
  p: (props) => <p className="mt-4 text-base leading-7 text-zinc-300" {...props} />,
  ul: (props) => <ul className="mt-4 space-y-2 text-base text-zinc-300" {...props} />,
  li: (props) => <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent" {...props} />,
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
};
