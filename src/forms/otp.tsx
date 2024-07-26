"use client";

import { Fragment } from "react";
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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface ComponentProps<T extends FieldValues> {
  name: string;
  control: Control<T>;
  label?: string;
  pattern?: string;
  description?: string;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  groupSize?: number;
}

const OtpField = ({
  name,
  control,
  label,
  maxLength = 4,
  groupSize = 2,
  placeholder = "*",
  pattern = REGEXP_ONLY_DIGITS,
  description,
  className,
}: ComponentProps<FieldValues>) => {
  const slots = Array.from(Array(maxLength).keys());
  const slotGroups = Array.from(
    { length: Math.ceil(slots.length / groupSize) },
    (_, index) => slots.slice(index * groupSize, index * groupSize + groupSize)
  );

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
            <InputOTP maxLength={maxLength} pattern={pattern} {...field}>
              {slotGroups.map((slotGroup, idx) => {
                return (
                  <Fragment key={idx}>
                    <InputOTPGroup>
                      {slotGroup.map((index) => (
                        <InputOTPSlot
                          className={cn(
                            field.value && "font-semibold",
                            className
                          )}
                          aria-placeholder={placeholder}
                          key={index}
                          index={index}
                        />
                      ))}
                    </InputOTPGroup>
                    {idx < slotGroups.length - 1 ? <InputOTPSeparator /> : null}
                  </Fragment>
                );
              })}
            </InputOTP>
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

export { OtpField };
