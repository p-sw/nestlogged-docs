import { createFileRoute } from "@tanstack/react-router";
import Tutorial from "@/documentations/3.5.0/ko/tutorial";

export const Route = createFileRoute("/_docs/ko/docs/3_5_0/tutorial")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Tutorial />;
}
