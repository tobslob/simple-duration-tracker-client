"use client";

import type { Control, FieldValues } from "react-hook-form";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "../components/ui/select";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../components/ui/form";
import { cn } from "../components/utils";

interface ComponentProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  labelProp?: string;
  valueProp?: string;
  options?: { id: string | number | undefined; name: string | undefined }[];
}

function SelectField({
  name,
  control,
  label,
  placeholder,
  description,
  labelProp = "name",
  valueProp = "id",
  options = [],
}: ComponentProps<FieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : null}
          <Select defaultValue={field.value} onValueChange={field.onChange}>
            <FormControl
              className={cn(
                !field.value && "text-muted-foreground font-normal",
                field.value && "font-medium"
              )}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option, idx) => {
                const itemLabel = (option as Record<string, any>)[labelProp];
                const itemValue = (option as Record<string, any>)[valueProp];
                return (
                  <SelectItem key={idx} value={itemValue}>
                    {itemLabel}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
        </FormItem>
      )}
    />
  );
}

export { SelectField };
