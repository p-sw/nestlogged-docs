import { createFileRoute } from "@tanstack/react-router";
import Index from "@/documentations/3.5.0/ko/index";

export const Route = createFileRoute("/_docs/ko/docs/3_5_0/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Index />;
}
