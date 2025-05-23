import MdiTranslate from "~icons/mdi/translate";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";

type Lang = "en" | "ko";
const LANG_REGEX = /\/(en|ko)(\/?.*)/;

function gotolang(lang: Lang): string {
  return window.location.pathname.replace(LANG_REGEX, `/${lang}$2`);
}

export function getLanguage(): Lang {
  return (LANG_REGEX.exec(window.location.pathname) ?? ["/", "en"])[1] as Lang;
}

export default function LanguageSelector() {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MdiTranslate />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Languages</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate({ to: gotolang("en") })}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: gotolang("ko") })}>
          한국어
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
