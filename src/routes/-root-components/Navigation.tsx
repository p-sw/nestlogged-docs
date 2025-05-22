import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import MdiGithub from "~icons/mdi/github";
import ThemeSwitcher from "./ThemeSwitcher";
import LanguageSelector from "./LanguageSelector";

function Links() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Link to="/">
        <span className="font-bold">NestLogged</span>
      </Link>
    </div>
  );
}

function Icons() {
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Button variant="ghost">
        <a href="https://github.com/p-sw/nestlogged">
          <MdiGithub />
        </a>
      </Button>
      <ThemeSwitcher />
      <LanguageSelector />
    </div>
  );
}

export default function Navigation() {
  return (
    <nav className="w-screen max-w-full sticky top-0 z-20 bg-background backdrop-blur-lg border-b border-border h-12 px-4 p-2">
      <div className="mx-auto w-full h-full max-w-4xl flex flex-row justify-between items-center gap-4">
        <Links />
        <Icons />
      </div>
    </nav>
  );
}
