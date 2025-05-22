import { createFileRoute } from "@tanstack/react-router";
import DeepDive from "@/documentations/3.5.0/ko/deep-dive";

export const Route = createFileRoute("/_docs/ko/docs/3_5_0/deep-dive")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DeepDive />;
}
