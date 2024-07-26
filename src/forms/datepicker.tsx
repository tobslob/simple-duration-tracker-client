"use client";

import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../components/ui/form";
import { Control, FieldValues } from "react-hook-form";
import { cn } from "../components/utils";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import * as React from "react";

interface ComponentProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  initialDate?: Date;
  formatStr?: string;
}

interface RangeComponentProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  numberOfMonths?: number;
  initialRange?: { from: Date; to: Date };
  formatStr?: string;
}

const DateField = ({
  name,
  control,
  label,
  formatStr = "PPP",
  placeholder = "Pick a date",
  description,
}: ComponentProps<FieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full h-12 sm:h-10 justify-start text-left font-normal focus:border-accent-foreground",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, formatStr)
                    ) : (
                      <span>{placeholder}</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode={"single"}
                  onSelect={field.onChange}
                  selected={field.value}
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

const DateRangeField = ({
  name,
  control,
  label,
  formatStr = "PPP",
  placeholder = "Pick a date",
  description,
  numberOfMonths = 2,
}: RangeComponentProps<FieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[300px] h-12 sm:h-10 justify-start text-left font-normal focus:border-accent-foreground",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value?.from ? (
                      field.value?.to ? (
                        <>
                          {`${format(field.value.from, formatStr)} - ${format(
                            field.value.to,
                            formatStr
                          )}`}
                        </>
                      ) : (
                        format(field.value.from, formatStr)
                      )
                    ) : (
                      <span>{placeholder}</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-auto p-0">
                <Calendar
                  defaultMonth={field.value?.from}
                  initialFocus
                  mode={"range"}
                  numberOfMonths={numberOfMonths}
                  onSelect={field.onChange}
                  selected={field.value}
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage />
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
        </FormItem>
      )}
    />
  );
};

export { DateRangeField, DateField };
