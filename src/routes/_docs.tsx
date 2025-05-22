import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_docs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="prose prose-slate dark:prose-invert">
      <Outlet />
    </main>
  );
}
