"use client";

import { useEffect } from "react";

const DISQUS_SHORTNAME = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME ?? "sirius-sound";

type Props = {
  slug: string;
  title: string;
};

export function DisqusComments({ slug, title }: Props) {
  useEffect(() => {
    // Reset Disqus if it's already loaded
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function (this: any) {
          this.page.identifier = slug;
          this.page.url = `${window.location.origin}/blog/${slug}`;
          this.page.title = title;
        },
      });
    } else {
      // Load Disqus for the first time
      window.disqus_config = function (this: any) {
        this.page.url = `${window.location.origin}/blog/${slug}`;
        this.page.identifier = slug;
        this.page.title = title;
      };

      const script = document.createElement("script");
      script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
      script.setAttribute("data-timestamp", String(+new Date()));
      (document.head || document.body).appendChild(script);
    }
  }, [slug, title]);

  return (
    <div className="mt-12 rounded-3xl border border-white/10 bg-[#0B0E12] p-6">
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
}

// Type declaration for window.DISQUS
declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config: () => void }) => void;
    };
    disqus_config?: () => void;
  }
}
