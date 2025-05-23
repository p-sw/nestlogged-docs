import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export const versions = ["3.5"];
function gotovers(vers: string): string {
  return window.location.pathname.replace(
    /(\/[^/]{2}\/docs\/)([_\d]+)(\/.*)/,
    `/$1${vers}$3`,
  );
}

export default function VersionSelector() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(versions.at(-1));
  const navigate = useNavigate();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full mb-4"
        >
          {value}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" side="bottom" align="start">
        <Command>
          <CommandInput placeholder="Search version..." />
          <CommandList>
            <CommandEmpty>No versions found.</CommandEmpty>
            <CommandGroup>
              {versions.map((version) => (
                <CommandItem
                  key={version}
                  value={version}
                  onSelect={() => {
                    setValue(version);
                    setOpen(false);
                    navigate({ to: gotovers(version) });
                  }}
                >
                  {version}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
