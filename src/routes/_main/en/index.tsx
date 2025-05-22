import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/en/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className="font-bold text-2xl">A NestJS Logger Decorator Library</h1>
      <div className="flex flex-row justify-center items-center gap-2">
        <Button asChild variant="default">
          <Link from="/en">Documentation</Link>
        </Button>
        <Button asChild variant="secondary">
          <a href="https://github.com/p-sw/nestlogged">Github</a>
        </Button>
      </div>
    </>
  );
}
