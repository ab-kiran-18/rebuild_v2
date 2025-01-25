"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui-atoms/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui-atoms/form"
import { Input } from "@/components/ui-atoms/input"
import { Textarea } from "@/components/ui-atoms/textarea"
import { useToast } from "@/hooks/use-toast"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { updateAbout } from "@/lib/slices/aboutSlice"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Please enter your address.",
  }),
  summary: z.string().min(50, {
    message: "Summary should be at least 50 characters long.",
  }),
})

export default function AboutSection() {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const about = useSelector((state: RootState) => state.about)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: about,
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(updateAbout(values))
    toast({
      title: "About section updated",
      description: "Your personal information has been saved.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>Your full name as you want it to appear on your resume.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johndoe@example.com" {...field} />
              </FormControl>
              <FormDescription>Your primary email address for contact.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} />
              </FormControl>
              <FormDescription>Your primary phone number for contact.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="City, State, Country" {...field} />
              </FormControl>
              <FormDescription>Your current location (city and state/country).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a brief summary of your professional background and key skills..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>A concise overview of your professional background and key skills.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save About Section</Button>
      </form>
    </Form>
  )
}
