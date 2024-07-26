"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "../components/utils";

interface ComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  description?: string;
  labelProp?: string;
  valueProp?: string;
  options?: {
    id: string | undefined;
    name: string | undefined;
    code: string | undefined;
  }[];
}
function ComboSelectField({
  name,
  label,
  searchPlaceholder = "Search...",
  placeholder,
  description,
  labelProp = "name",
  valueProp = "id",
  options = [],
}: ComponentProps) {
  const form = useFormContext();
  const [open, setOpen] = useState(false);
  const alphabets = new Set("abcdefghijklmnopqrstuvwxyz0123456780".split(""));
  const includedKeys = new Set([
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ]);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const getLabel = () => {
          const selected = field.value
            ? options?.find((option) => option.code === field.value)
            : null;
          return selected ? (selected.name as string) : placeholder;
        };
        return (
          <FormItem className="block space-y-1">
            {label ? <FormLabel>{label}</FormLabel> : null}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (includedKeys.has(e.code) || alphabets.has(e.key))
                        setOpen(true);
                    }}
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "h-12 sm:h-11 w-full text-base sm:text-sm justify-between [data-state=open]:ring-2 focus-visible:border-accent-foreground focus:border-accent-foreground",
                      !field.value && "text-muted-foreground font-normal",
                      field.value && "font-medium hover:bg-transparent"
                    )}
                  >
                    {getLabel()}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align={"start"} side={"bottom"} className="p-0">
                <Command label="Command Menu" disablePointerSelection={false}>
                  <CommandInput
                    placeholder={searchPlaceholder}
                    className="h-11"
                  />
                  <CommandList>
                    <CommandEmpty>No options available.</CommandEmpty>
                    <CommandGroup>
                      {options.map((option, index) => (
                        <CommandItem
                          value={option.code}
                          key={index}
                          onSelect={() => {
                            form.setValue(name, option.code);
                            setOpen(false);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              option.code === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {option.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
          </FormItem>
        );
      }}
    />
  );
}

export { ComboSelectField };
