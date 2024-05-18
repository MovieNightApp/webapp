import { resetPassword } from "@/api/user";
import AppTitle from "@/components/app-title";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z.object({
  t: z.string(),
});

export const Route = createFileRoute("/app/reset-password")({
  validateSearch: resetPasswordSchema,
  component: ResetPassword,
});

const FormSchema = z
  .object({
    confirmationToken: z.string(),
    newPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.*\-!$%^&*()_+|~=`{}[\]:";'<>?,./]{8,}$/,
        "Password must consist of minimum eight characters, at least one uppercase letter, one lowercase letter and one number."
      ),
    confirmPassword: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d.*\-!$%^&*()_+|~=`{}[\]:";'<>?,./]{8,}$/,
        "Password must consist of minimum eight characters, at least one uppercase letter, one lowercase letter and one number."
      ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function ResetPassword() {
  const { t: confirmationToken } = Route.useSearch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirmationToken,
      newPassword: "",
      confirmPassword: "",
    },
  });

  const submitReset = useMutation({
    mutationFn: resetPassword,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    submitReset.mutate(data);
  }

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-slate-50 p-4">
      <div className="max-w-96 w-full flex flex-col gap-4 items-center">
        <AppTitle />
        <h2 className="text-2xl">Password Reset</h2>
        {!submitReset.isSuccess ? (
          <div className="text-center flex flex-col">
            <span>Successfully reset password</span>
            <span>Head back to the app to login!</span>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="New Password *"
                        autoComplete="new-password"
                        required
                      />
                    </FormControl>
                    <FormDescription>
                      Password must consist of minimum eight characters, at
                      least one uppercase letter, one lowercase letter and one
                      number.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm Password *"
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit">Reset Password</Button>
              <div className="my-1" />
              {submitReset.isError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error resetting password</AlertTitle>
                  <AlertDescription>
                    {submitReset.failureReason?.message}
                  </AlertDescription>
                </Alert>
              )}
            </form>
          </Form>
        )}
      </div>
    </main>
  );
}
