/*@jsxRuntime automatic*/
/*@jsxImportSource react*/
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
  return <><_components.p>{"이 문서는 NestLogged 패키지에 대해 다룹니다."}</_components.p>{"\n"}<_components.p>{"NestLogged는 NestJS를 위한 간단한 데코레이터를 제공하며, 여러 복잡한 로깅을 간단하게 적용할 수 있도록 도와줍니다."}</_components.p>{"\n"}<_components.h1>{"챕터"}</_components.h1>{"\n"}<_components.ul>{"\n"}<_components.li><_components.a href="/ko/docs/tutorial">{"튜토리얼"}</_components.a>{" - 이 문서에서는 NestLogged에 대해 아무것도 모른다는 전제 하에 처음부터 끝까지 NestLogged의 모든 "}<_components.strong>{"기능 사용법"}</_components.strong>{"을 설명합니다. NestLogged를 처음 접하는 분에게 추천합니다."}</_components.li>{"\n"}<_components.li><_components.a href="/ko/docs/deep-dive">{"깊이 살펴보기"}</_components.a>{" - 이 문서에서는 NestLogged의 기능에 대해 잘 안다는 전제 하에 NestLogged의 내부에서 어떻게 동작하는지를 살펴봅니다. NestLogged를 어느 정도 사용해 본 분에게 추천합니다. 이 문서는 패키지 내부의 버그를 디버깅하고, 이 프로젝트에 기여하기 위해 코드를 이해하는 데 도움을 줄 수 있습니다."}</_components.li>{"\n"}</_components.ul></>;
}
export default function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
