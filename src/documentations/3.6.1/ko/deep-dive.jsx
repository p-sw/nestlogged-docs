/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
export const tableOfContents = [];
function _createMdxContent(props) {
  const _components = {
    p: "p",
    ...props.components
  };
  return <_components.p>{"작성중"}</_components.p>;
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
