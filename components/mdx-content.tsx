"use client";

import { useMDXComponent } from "next-contentlayer/hooks";
import { mdxComponents } from "@/components/mdx-components";

type Props = {
  code: string;
};

export function MDXContent({ code }: Props) {
  const Component = useMDXComponent(code);
  return <Component components={mdxComponents} />;
}
