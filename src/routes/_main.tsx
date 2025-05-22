import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_main")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="w-full grow flex flex-col justify-center items-center gap-8">
      <Outlet />
    </main>
  );
}
