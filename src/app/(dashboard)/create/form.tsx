import * as React from "react";
import {
  Button,
  ComboSelectField,
  Form,
  InputField,
  useForm,
  z,
  zodResolver,
} from "@/forms";
import { SubmitHandler } from "react-hook-form";
import { IUSerProps, createUser } from "@/services/users";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string({ required_error: "Please provide name" }),
  gender: z.string({ required_error: "Please select a gender" }),
  emailAddress: z.string({ required_error: "Please provide the date" }),
  sleepTimeDuration: z.string({
    required_error: "Please provide the sleep time duration",
  }),
  date: z.string({ required_error: "Please provide the date" }),
});

type ValuesType = z.infer<typeof formSchema>;

const genderOptions = [
  { name: "Male", id: "male", code: "male" },
  { name: "Female", id: "female", code: "female" },
  { name: "Others", id: "others", code: "others" },
];

function Component(): React.ReactElement {
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: (variables: IUSerProps) => createUser(variables),
    onSuccess: (res) => {
      toast({
        title: "Success",
        description: "New user created!",
        className: "bg-green-500",
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Unable to create new user at the moment, Please try again",
      });
    },
  });

  const form = useForm<ValuesType>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: "",
      gender: "",
      emailAddress: "",
      sleepTimeDuration: "",
      date: "",
    },
  });

  const onSubmit: SubmitHandler<ValuesType> = (values) => {
    mutate(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="w-full max-w-lg mx-auto py-8 lg:px-0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-1 pb-8">
          <p className="text-2xl sm:text-3xl font-bold">Add User</p>
        </div>
        <div className="space-y-3">
          <InputField name="name" placeholder="Enter your name" label="Name" />
          <InputField
            name="emailAddress"
            placeholder="Enter your email"
            label="Email"
            type="text"
          />
          <ComboSelectField
            name="gender"
            placeholder="Choose your gender"
            label="Gender"
            labelProp="name"
            valueProp="id"
            options={genderOptions}
          />
          <InputField
            name="sleepTimeDuration"
            placeholder="Enter sleep duration"
            label="Sleep Time Duration"
            type="text"
          />
          <InputField
            name="date"
            placeholder="Enter a date (YYYY-MM-DD)"
            label="Date"
            type="text"
            pattern="\d{4}-\d{2}-\d{2}"
          />
          <div className="pt-8">
            <Button
              size="lg"
              className="w-auto sm:w-auto"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting ? "Please wait..." : "Create User"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default Component;
