"use client";

import type { Control, FieldValues } from "react-hook-form";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../components/ui/form";
import { cn } from "../components/utils";
import { Switch } from "../components/ui/switch";

interface ComponentProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  description?: string;
}

function SwitchField({
  name,
  control,
  label,
  description,
}: ComponentProps<FieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-center justify-between space-x-4">
          <div className="space-y-1.5 leading-none">
            {label ? (
              <FormLabel className="text-base">{label}</FormLabel>
            ) : null}
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <FormMessage />
          </div>
          <FormControl
            className={cn(
              !field.value && "text-muted-foreground font-normal",
              field.value && "font-medium"
            )}
          >
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export { SwitchField };
