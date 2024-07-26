"use client";

import type { Control, FieldValues } from "react-hook-form";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn, Checkbox } from "../components";

interface ComponentProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  description?: string;
}

interface MultiComponentProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  description?: string;
  labelProp?: string;
  valueProp?: string;
  extraClasses?: string;
  options?: { id: string | number | undefined; name: string | undefined }[];
}

function CheckboxField({
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
        <FormItem className="flex item-start space-x-4 space-y-0">
          <FormControl
            className={cn(
              !field.value && "text-muted-foreground font-normal",
              field.value && "font-medium"
            )}
          >
            <Checkbox
              className="mt-1.5"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label ? (
              <FormLabel className="text-base">{label}</FormLabel>
            ) : null}
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

function MultipleCheckboxField({
  name,
  control,
  label,
  description,
  labelProp = "name",
  valueProp = "id",
  options = [],
  extraClasses,
}: MultiComponentProps<FieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem className="space-y-6">
          <div>
            {label ? (
              <FormLabel className="text-base">{label}</FormLabel>
            ) : null}
            {description ? (
              <FormDescription>{description}</FormDescription>
            ) : null}
            <FormMessage />
          </div>
          <div className={cn("grid gap-3", extraClasses)}>
            {options.map((option) => {
              const optionValue = option[valueProp];
              const optionLabel = option[labelProp];
              return (
                <FormField
                  control={control}
                  name={name}
                  key={optionValue}
                  render={({ field }) => {
                    return (
                      <FormItem
                        className="flex flex-row items-start space-x-3 space-y-0"
                        key={optionValue}
                      >
                        <FormControl>
                          <Checkbox
                            className="mt-0.5"
                            checked={field.value?.includes(optionValue)}
                            onCheckedChange={(checked) => {
                              checked
                                ? field.onChange([
                                    ...(field.value || []),
                                    optionValue,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value: any) => value !== optionValue
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-base sm:text-sm font-normal">
                          {optionLabel}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              );
            })}
          </div>
        </FormItem>
      )}
    />
  );
}

export { CheckboxField, MultipleCheckboxField };
