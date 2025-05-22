import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import Navigation from "./-root-components/Navigation";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
