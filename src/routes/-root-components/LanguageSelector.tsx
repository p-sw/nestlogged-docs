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

function gotolang(lang: "en" | "ko"): string {
  return window.location.pathname.replace(/\/(en|ko)(\/?.*)/, `/${lang}$2`);
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
