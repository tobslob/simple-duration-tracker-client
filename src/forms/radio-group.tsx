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
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";

interface ComponentProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  description?: string;
  labelProp?: string;
  valueProp?: string;
  extraClasses?: string;
  options?: { id: string | number | undefined; name: string | undefined }[];
}

function RadioGroupField({
  name,
  control,
  label,
  description,
  options = [],
  labelProp = "name",
  valueProp = "id",
  extraClasses,
}: ComponentProps<FieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-6">
          <div>
            {label ? (
              <FormLabel className="text-base sm:text-sm">{label}</FormLabel>
            ) : null}
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
          </div>
          <FormControl
            className={cn(
              !field.value && "text-muted-foreground font-normal",
              field.value && "font-medium"
            )}
          >
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn("grid gap-3", extraClasses)}
            >
              {options.map((option) => {
                const optionValue = option[valueProp];
                const optionLabel = option[labelProp];
                return (
                  <FormItem
                    key={optionValue}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={optionValue} />
                    </FormControl>
                    <FormLabel className="text-base sm:text-sm font-normal">
                      {optionLabel}
                    </FormLabel>
                  </FormItem>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export { RadioGroupField };
