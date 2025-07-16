import { visit } from "unist-util-visit";
import type { Node, Parent } from "unist";

interface NewNode extends Node {
  lang: string | null;
  meta: string | null;
}
interface ParentNode extends Node {
  children?: ParentNode[];
  value?: string;
}

interface RemarkPlugin {
  (tree: Node): void;
}

function splitter(str: string): string[] | null {
  return str.match(/(?:[^\s"']+|("|')[^"']*("|'))+/g);
}

const languages: Record<string, string> = {
  ts: "TypeScript",
  typescript: "TypeScript",
  log: "Log",
};

export default function remarkCodeMeta(): RemarkPlugin {
  function visitor(node: NewNode, index: number, parent: Parent | undefined) {
    const { lang, meta } = node;
    if (lang !== null) {
      node.data = {
        hProperties: {
          dataLanguage: lang,
        },
      };
    }
    if (!!parent && meta !== null) {
      const splitted = splitter(meta);
      if (!splitted) return;
      const params = splitted
        .filter((s) => s !== "")
        .map((s) => s.trim())
        .reduce(
          (acc, item) => {
            const index = item.indexOf(":");
            const key = item.substring(0, index);
            const value = item
              .substring(index + 1)
              .replace(/"(.+)"/, "$1")
              .replace(/'(.+)'/, "$1");
            if (acc[key] && Array.isArray(acc[key])) acc[key].push(value);
            else if (acc[key]) acc[key] = [acc[key], value];
            else acc[key] = value;
            return acc;
          },
          {} as Record<string, string | string[]>,
        );
      const replacedNode: ParentNode = {
        type: "paragraph",
        data: {
          hName: "div",
          hProperties: {
            className: "remark-code-meta-wrapper",
          },
        },
        children: [],
      };
      const metaBlock: ParentNode = {
        type: "paragraph",
        data: {
          hName: "div",
          hProperties: {
            className: "remark-code-meta-block",
          },
        },
        children: [],
      };
      const originalCodeblock = parent.children[index];
      replacedNode.children!.push(metaBlock, originalCodeblock);
      originalCodeblock.data = {
        ...(originalCodeblock.data ?? {}),
        hProperties: {
          ...((originalCodeblock.data as { hProperties?: any })?.hProperties ??
            {}),
          ICodeMetaParams: params,
        },
      };
      if ("file" in params || "title" in params) {
        const title = params["file"]
          ? Array.isArray(params["file"])
            ? params["file"][0]
            : params["file"]
          : Array.isArray(params["title"])
            ? params["title"][0]
            : params["title"];
        metaBlock.children!.push({
          type: "paragraph",
          data: {
            hName: "div",
            hProperties: {
              className: "remark-code-meta__filename",
            },
          },
          children: [
            {
              type: "text",
              value: title,
            },
          ],
        });
      }
      if (lang) {
        metaBlock.children!.push({
          type: "paragraph",
          data: {
            hName: "div",
            hProperties: {
              className: "remark-code-meta__lang",
            },
          },
          children: [
            {
              type: "text",
              value: languages[lang],
            },
          ],
        });
      }
      parent.children.splice(index, 1, replacedNode);
    }
    node.meta = null;
  }
  return function transformer(tree: Node): void {
    visit<NewNode, "code">(tree as NewNode, "code", visitor);
  };
}
