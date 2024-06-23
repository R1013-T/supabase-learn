"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createItem } from "@/server/actions/item";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1).max(255),
  amount: z.coerce.number().min(1),
});

export type CreateItemData = z.infer<typeof formSchema>;

export default function FormComp() {
  const form = useForm<CreateItemData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
    },
  });

  const onSubmit: SubmitHandler<CreateItemData> = async (data) => {
    try {
      const promise = createItem(data);
      toast.promise(promise, {
        loading: "Creating item...",
        success: "Item created!",
        error: "Failed to create item.",
      });
      await promise;
      form.reset();
    } catch (error) {
      form.setError("root.serverError", {
        type: "server",
        message: (error as Error).message || "An error occurred.",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8 py-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root?.serverError && (
          <div className="text-red-600">
            {form.formState.errors.root.serverError.message}
          </div>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
