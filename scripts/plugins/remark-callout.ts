import { visit } from "unist-util-visit";
import { fromHtml } from "hast-util-from-html";
import type { Node } from "unist";
import type { Element } from "hast";

interface ParentNode extends Node {
  children?: ParentNode[];
  value?: string;
}

interface RemarkPlugin {
  (tree: Node): void;
}

const calloutTypes = {
  Note: ["note"],
  Abstract: ["summary", "tldr", "abstract"],
  Info: ["info"],
  Todo: ["todo"],
  Tip: ["tip", "hint", "important"],
  Success: ["success", "check", "done"],
  Question: ["question", "help", "faq"],
  Warning: ["warning", "caution", "attention"],
  Failure: ["failure", "fail", "missing"],
  Danger: ["danger", "error"],
  Bug: ["bug"],
  Example: ["example"],
  Quote: ["quote", "cite"],
} as const;
type _calloutTypes = typeof calloutTypes;
type CalloutType = _calloutTypes[keyof _calloutTypes][number];
type CalloutUnique = keyof _calloutTypes;

const calloutIcons: Record<CalloutUnique, string> = {
  Note: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-note" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4"/></svg>`,
  Abstract: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-abstract" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01"/></g></svg>`,
  Info: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-info" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></g></svg>`,
  Todo: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-todo" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12l2 2l4-4"/></g></svg>`,
  Tip: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-tip" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3c-1.072-2.143-.224-4.054 2-6c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5"/></svg>`,
  Success: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-success" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/></svg>`,
  Question: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-question" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01"/></g></svg>`,
  Warning: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-warning" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01"/></svg>`,
  Failure: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-failure" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/></svg>`,
  Danger: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-danger" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
  Bug: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-bug" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m8 2l1.88 1.88m4.24 0L16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6m0 0v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5m3 8H2m1 8c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4m-.8 4c2.1.1 3.8 1.9 3.8 4"/></g></svg>`,
  Example: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-example" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h.01M3 18h.01M3 6h.01M8 12h13M8 18h13M8 6h13"/></svg>`,
  Quote: `<svg xmlns="http://www.w3.org/2000/svg" class="lucide-quote" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2zM5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1a6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg>`,
};

function isSupportedType(type: string): type is CalloutType {
  return (Object.values(calloutTypes) as unknown as string[][])
    .map((types) => types.includes(type))
    .some((v) => v);
}

function getTitleByType(type: CalloutType): CalloutUnique {
  return (
    Object.entries(calloutTypes) as unknown as [CalloutUnique, CalloutType[]][]
  ).filter(([_, types]) => types.includes(type))[0][0];
}

function parseType(text: string): [string | null, string] {
  const match = /^\[!([a-z]+)\](\s(.*)|$)/.exec(text);
  if (!match) return [null, text];

  return [match[1], match[3] ?? ""];
}

function hastToMdastRaw(hast: Element): ParentNode {
  const root: ParentNode = {
    type: "paragraph",
    data: {
      hName: hast.tagName,
      hProperties: hast.properties,
    },
  };
  if (hast.children)
    root.children = hast.children
      .filter((cElm) => cElm.type === "element")
      .map((cElm) => hastToMdastRaw(cElm));
  return root;
}

export default function remarkQuoteCallout(): RemarkPlugin {
  function visitor(node: ParentNode) {
    if (!node.children) return;
    const p = node.children[0];
    if (!p.children) return;

    const [type, text] = parseType(p.children[0].value!);
    if (!type) return;

    let calloutType: CalloutType = type as CalloutType;
    if (!isSupportedType(type)) calloutType = "note";

    const title = getTitleByType(calloutType);
    const svg = calloutIcons[title];

    node.data = {
      hProperties: {
        className: `remark-callout remark-callout__${type}`,
      },
    };
    const headerNode: ParentNode = {
      type: "paragraph",
      data: {
        hName: "header",
        hProperties: {
          className: "remark-callout-header",
        },
      },
      children: [
        hastToMdastRaw(
          ((fromHtml(svg).children[0] as Element).children[1] as Element)
            .children[0] as Element,
        ),
        {
          type: "text",
          value: title,
        },
      ],
    };
    node.children.splice(0, 0, headerNode);

    p.children[0].value = text;
  }
  return function transformer(tree: Node): void {
    visit<ParentNode, "blockquote">(tree as ParentNode, "blockquote", visitor);
  };
}
