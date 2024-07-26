"use client";

import { Textarea } from "../components/ui/textarea";
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
import * as React from "react";

interface ComponentProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  description?: string;
}

const TextAreaField = ({
  name,
  control,
  label,
  placeholder,
  description,
}: ComponentProps<FieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl
            className={cn(
              !field.value && "text-muted-foreground font-normal",
              field.value && "font-medium"
            )}
          >
            <Textarea {...field} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
        </FormItem>
      )}
    />
  );
};

export { TextAreaField };
