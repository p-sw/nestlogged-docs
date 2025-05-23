import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

export function A(base: string) {
  return function _A(props: ComponentProps<"a">) {
    if (!props.href) return <a {...props} />;
    if (props.href.startsWith("http")) return <a {...props} />;

    return <Link from={base as ""} to={props.href} {...props} />;
  };
}
