import { compile } from "@mdx-js/mdx";
import withSlug from "rehype-slug";
import withToc from "@stefanprobst/rehype-extract-toc";
import withTocExport from "@stefanprobst/rehype-extract-toc/mdx";
import { matchesGlob, join } from "path";
import { readFile, readdir, writeFile } from "fs/promises";
import remarkCodeMeta from "./plugins/remark-code-meta.js";

async function main() {
  const files = (await readdir("src/documentations", { recursive: true }))
    .filter((fn) => matchesGlob(fn, "**/*.mdx"))
    .map((fn) => join("src/documentations", fn));

  await Promise.all(
    files.map(async (fn) => {
      const compiled = await compile(await readFile(fn), {
        jsx: true,
        remarkPlugins: [remarkCodeMeta],
        rehypePlugins: [withSlug, withToc, withTocExport],
      });
      await writeFile(
        fn.split(".").slice(0, -1).join(".") + ".jsx",
        compiled.value,
      );
    }),
  );

  console.log("done.");
}

await main();
