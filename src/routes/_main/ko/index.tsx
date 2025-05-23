import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/ko/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <h1 className="font-bold text-2xl">NestJS 로깅 데코레이터 라이브러리</h1>
      <div className="flex flex-row justify-center items-center gap-2">
        <Button asChild variant="default">
          <Link from="/ko" to="docs">
            문서
          </Link>
        </Button>
        <Button asChild variant="secondary">
          <a href="https://github.com/p-sw/nestlogged">깃허브</a>
        </Button>
      </div>
    </>
  );
}
