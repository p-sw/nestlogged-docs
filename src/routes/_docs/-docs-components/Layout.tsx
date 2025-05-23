import type { Lang } from "@/routes/-root-components/LanguageSelector";
import { Link, Outlet } from "@tanstack/react-router";
import type { Toc } from "@stefanprobst/rehype-extract-toc";
import type { ReactNode } from "react";
import type { MDXProps } from "mdx/types";

const translations: Record<string, Record<Lang, string>> = {
  pages: {
    en: "Pages",
    ko: "페이지",
  },
};

interface VersionLayoutProps {
  lang: Lang;
  navmap: Record<string, string>;
  version: "3_5";
}
export function VersionLayout({ lang, version, navmap }: VersionLayoutProps) {
  return (
    <div className="flex flex-row w-full">
      <aside className="w-64 sticky top-12 h-[calc(100vh-var(--spacing)*12)] p-4 border-r border-border overflow-y-auto flex-none">
        <h2 className="text-xl font-semibold mb-4">
          {translations["pages"][lang]}
        </h2>
        <ul>
          {Object.entries(navmap).map(([name, to]) => (
            <li key={name}>
              <Link from={`/${lang}/docs/${version}`} to={to}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <Outlet />
    </div>
  );
}

export function DocLayout({
  toc,
  mdx: MDX,
}: {
  toc: Toc;
  mdx: (props: MDXProps) => ReactNode;
}) {
  return (
    <>
      <main className="min-w-0 max-w-none w-full prose prose-slate dark:prose-invert p-8">
        <MDX />
      </main>

      <aside className="sticky w-fit min-w-48 top-12 h-[calc(100vh-var(--spacing)*12)] p-4 border-l border-border overflow-y-auto hidden xl:block flex-none">
        <h3 className="text-md font-semibold">On this page</h3>
        {toc && toc.length > 0 ? (
          <ul className="mt-2 space-y-1 text-sm list-none p-0">
            {(function renderItems(items: Toc): ReactNode {
              return items.map((item) => (
                <li key={item.id}>
                  <Link to="." hash={item.id} className="block py-0.5">
                    {item.value}
                  </Link>
                  {item.children && item.children.length > 0 && (
                    <ul className="pl-4 mt-1 space-y-1 list-none p-0">
                      {renderItems(item.children)}
                    </ul>
                  )}
                </li>
              ));
            })(toc)}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-slate-500">
            No headings on this page.
          </p>
        )}
      </aside>
    </>
  );
}
