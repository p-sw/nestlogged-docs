import type { Lang } from "@/routes/-root-components/LanguageSelector";
import { Link, Outlet } from "@tanstack/react-router";
import type { Toc } from "@stefanprobst/rehype-extract-toc";
import { createContext, use, type ReactNode } from "react";
import type { MDXProps } from "mdx/types";
import { A } from "./MDXOverrider";
import VersionSelector from "./VersionSelector";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

interface LayoutContextContent {
  lang: Lang;
  version: "3_5";
}
const LayoutContext = createContext<LayoutContextContent>({
  lang: "en",
  version: "3_5",
});

const translations: Record<string, Record<Lang, string>> = {
  pages: {
    en: "Pages",
    ko: "페이지",
  },
};

interface VersionLayoutProps extends LayoutContextContent {
  navmap: Record<string, string>;
}
export function VersionLayout({ lang, version, navmap }: VersionLayoutProps) {
  return (
    <div className="flex flex-row w-full">
      <Drawer direction="top">
        <DrawerTrigger asChild>
          <Button
            variant="default"
            className="lg:hidden block fixed top-16 left-4"
          >
            <Menu />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col justify-center items-center p-4 gap-4">
          <VersionSelector />
          {Object.entries(navmap).map(([name, to]) => (
            <Button asChild variant="link" key={name}>
              <Link from={`/${lang}/docs/${version}`} to={to}>
                {name}
              </Link>
            </Button>
          ))}
        </DrawerContent>
      </Drawer>
      <aside className="hidden lg:block w-64 sticky top-12 h-[calc(100vh-var(--spacing)*12)] p-4 border-r border-border overflow-y-auto flex-none">
        <VersionSelector />
        <h2 className="text-xl font-semibold mb-2">
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
      <LayoutContext value={{ lang, version }}>
        <Outlet />
      </LayoutContext>
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
  const ctx = use(LayoutContext);

  return (
    <>
      <main className="min-w-0 max-w-none w-full prose prose-slate prose-pre:0 dark:prose-invert p-8">
        <MDX components={{ a: A(`/${ctx.lang}/docs/${ctx.version}`) }} />
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
