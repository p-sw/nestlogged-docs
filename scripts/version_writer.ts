import { readdir, lstat, writeFile, rm, mkdir } from "node:fs/promises";
import { join, parse } from "node:path";
import test from "node:test";

const DOCUMENTATION_PATH = "src/documentations";
const VERSION_LIST_PATH = "src/routes/_docs/-docs-components/versionList.ts";
const DOC_BASE = "src/routes/_docs/$LANG.docs";
const languages = ["en", "ko"];

const LANG_INDEX_TEMPLATE = `import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { versionList } from "../-docs-components/versionList";

export const Route = createFileRoute("/_docs/$LANG/docs/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/$LANG/docs" });

  useEffect(() => {
    navigate({ to: versionList.at(-1)!.replaceAll(".", "_") });
  });

  return null;
}
`;

interface LANG_INDEX_TEMPLATE_SLOT {
  LANG: string;
}

const VERSION_INDEX_TEMPLATE = `import { createFileRoute } from "@tanstack/react-router";
import { VersionLayout } from "../-docs-components/Layout";

export const Route = createFileRoute("/_docs/$LANG/docs/$VERSION_PATH")({
  component: RouteComponent,
});

const navmap = {
$NAVMAP
};

function RouteComponent() {
  return <VersionLayout lang="$LANG" navmap={navmap} version="$VERSION_PATH" />;
}
`;
interface VERSION_INDEX_TEMPLATE_SLOT {
  VERSION_PATH: string;
  NAVMAP: string;
  LANG: string;
}

const VERSION_DOC_TEMPLATE = `import { createFileRoute } from "@tanstack/react-router";
import $IMPORT, { tableOfContents } from "@/documentations/$VERSION/$LANG/$DOCUMENT";
import { DocLayout } from "../../-docs-components/Layout";

export const Route = createFileRoute("/_docs/$LANG/docs/$PATH_VERSION/$ROUTE_DOCUMENT")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DocLayout toc={tableOfContents} mdx={$IMPORT} />;
}
`;

interface VERSION_DOC_TEMPLATE_SLOT {
  IMPORT: string;
  VERSION: string;
  LANG: string;
  DOCUMENT: string;
  ROUTE_DOCUMENT: string;
  PATH_VERSION: string;
}

async function templateSolver<T extends {}>(template: string, slots: T) {
  let t = template;
  for (const [name, value] of Object.entries(slots)) {
    t = t.replaceAll("$" + name, value as string);
  }
  return t;
}

async function getVersions() {
  const versions = await Promise.all(
    (await readdir(DOCUMENTATION_PATH)).filter(
      async (v) => !(await lstat(join(DOCUMENTATION_PATH, v))).isFile,
    ),
  );

  console.log(
    `Found ${versions.length} versions: ${versions.map((v) => "* " + v).join("\n")}`,
  );
  return versions;
}

function formatDocumentToTitle(document: string) {
  return document
    .split("-")
    .map((v) => v[0].toUpperCase() + v.slice(1))
    .join(" ");
}

async function getDocuments(version: string, language: string) {
  const documents = (await readdir(join(DOCUMENTATION_PATH, version, language)))
    .filter((v) => v.split(".").at(-1) === "mdx")
    .map((v) => parse(v).name);

  console.log(
    `Found ${documents.length} documents:\n* ${version}(${language})\n${documents.map((v) => "\t* " + formatDocumentToTitle(v)).join("\n")}`,
  );

  return documents;
}

async function buildDocVersion(version: string) {
  for (const lang of languages) {
    const LANG_DOC_BASE = DOC_BASE.replace("$LANG", lang);
    const VERSION_PATH = version.replaceAll(".", "_");
    const VERSION_INDEX_PATH = join(LANG_DOC_BASE, VERSION_PATH + ".tsx");
    const VERSION_DIR_PATH = join(LANG_DOC_BASE, VERSION_PATH);
    await rm(LANG_DOC_BASE, {
      force: true,
      recursive: true,
    });
    await mkdir(LANG_DOC_BASE);

    const documents = await getDocuments(version, lang);
    await writeFile(
      VERSION_INDEX_PATH,
      await templateSolver<VERSION_INDEX_TEMPLATE_SLOT>(
        VERSION_INDEX_TEMPLATE,
        {
          VERSION_PATH,
          LANG: lang,
          NAVMAP: documents
            .map(
              (document) =>
                "  " +
                (document.includes("-")
                  ? `"${formatDocumentToTitle(document)}"`
                  : formatDocumentToTitle(document)) +
                ': "' +
                document +
                '"',
            )
            .join(",\n"),
        },
      ),
    );

    await mkdir(VERSION_DIR_PATH);
    for (const document of documents) {
      await writeFile(
        join(VERSION_DIR_PATH, document + ".tsx"),
        await templateSolver<VERSION_DOC_TEMPLATE_SLOT>(VERSION_DOC_TEMPLATE, {
          DOCUMENT: document,
          ROUTE_DOCUMENT: document === "index" ? "" : document,
          IMPORT: formatDocumentToTitle(document).replaceAll(" ", ""),
          LANG: lang,
          PATH_VERSION: VERSION_PATH,
          VERSION: version,
        }),
      );
    }
  }
}

async function main() {
  const versions = await getVersions();

  await writeFile(
    VERSION_LIST_PATH,
    `export const versionList = [${versions.map((v) => '"' + v + '"').join(", ")}] as const;
export type Version = typeof versionList[number];
export const versionPath = [${versions.map((v) => '"' + v.replaceAll(".", "_") + '"').join(", ")}] as const;
export type VersionPath = typeof versionPath[number];`,
  );

  for (const version of versions) {
    await buildDocVersion(version);
  }
}

void main();
