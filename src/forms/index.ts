import {
  useController,
  useFieldArray,
  useForm,
  useFormState,
  useWatch,
} from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, buttonVariants } from "@/components";
import { InputField } from "./input";
import { SelectField } from "./select";
import { ComboSelectField } from "./combo";
import { CheckboxField, MultipleCheckboxField } from "./checkbox";
import { TextAreaField } from "./textarea";
import { SwitchField } from "./switch";
import { RadioGroupField } from "./radio-group";
import { DateField, DateRangeField } from "./datepicker";
import { OtpField } from "./otp";
import WizardForm from "./wizard";

import type { WizardMapProps, WizardPageProps, WizardProps } from "./types";

export {
  useForm,
  useFieldArray,
  useWatch,
  useFormState,
  useController,
  Form,
  zodResolver,
  z,
  Button,
  buttonVariants,
  // Field components
  InputField,
  TextAreaField,
  SelectField,
  ComboSelectField,
  CheckboxField,
  MultipleCheckboxField,
  SwitchField,
  RadioGroupField,
  DateField,
  DateRangeField,
  OtpField,
  WizardForm,
  WizardMapProps,
  WizardProps,
  WizardPageProps,
};
