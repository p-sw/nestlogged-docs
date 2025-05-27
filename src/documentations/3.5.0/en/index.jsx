/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
export const tableOfContents = [{
  "depth": 1,
  "value": "Chapters",
  "id": "chapters"
}];
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h1: "h1",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return <><_components.p>{"This documentation covers the NestLogged package."}</_components.p>{"\n"}<_components.p>{"NestLogged provides simple decorators for NestJS, helping you implement complex logging patterns with ease."}</_components.p>{"\n"}<_components.h1 id="chapters">{"Chapters"}</_components.h1>{"\n"}<_components.ul>{"\n"}<_components.li><_components.a href="tutorial">{"Tutorial"}</_components.a>{" - This document explains all the "}<_components.strong>{"features and usage"}</_components.strong>{" of NestLogged, assuming you know nothing about it. Recommended for those who are new to NestLogged."}</_components.li>{"\n"}<_components.li><_components.a href="deep-dive">{"Deep Dive"}</_components.a>{" - This document explores how NestLogged works internally, assuming you're already familiar with its features. Recommended for those who have used NestLogged before. This document can help you debug issues within the package and understand the code to contribute to this project."}</_components.li>{"\n"}</_components.ul></>;
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
