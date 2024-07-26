"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "../utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export function DatePicker({
  initialDate = new Date(),
  formatStr = "PPP",
}: {
  id?: string | undefined;
  initialDate?: Date;
  formatStr?: string;
}): React.ReactNode {
  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] h-12 sm:h-11 justify-start text-left font-normal focus:border-accent-foreground",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, formatStr) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode={"single"}
          onSelect={(day: Date | undefined) => {
            setDate(day);
          }}
          selected={date}
        />
      </PopoverContent>
    </Popover>
  );
}
