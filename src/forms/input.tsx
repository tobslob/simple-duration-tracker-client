"use client";

import { Input } from "../components";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../components/ui/form";
import { Control, FieldValues, useFormContext } from "react-hook-form";
import { cn } from "../lib/utils";
import * as React from "react";

interface ComponentProps<T extends FieldValues> {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  format?: (val: any) => any;
  readOnly?: boolean;
  disabled?: boolean;
}

const InputField = ({
  name,
  format,
  label,
  type,
  placeholder,
  description,
  className,
  readOnly = undefined,
  disabled = undefined,
}: ComponentProps<FieldValues>) => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const val = format ? format(field.value) : field.value;
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl
              className={cn(
                !field.value && "text-muted-foreground font-normal",
                field.value && "font-medium",
                className
              )}
            >
              <Input
                {...field}
                value={val}
                placeholder={placeholder}
                type={type}
                readOnly={readOnly}
                disabled={disabled}
              />
            </FormControl>
            <FormMessage />
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
          </FormItem>
        );
      }}
    />
  );
};

export { InputField };
