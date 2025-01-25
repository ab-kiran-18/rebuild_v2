"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui-atoms/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui-atoms/form"
import { Input } from "@/components/ui-atoms/input"
import { Textarea } from "@/components/ui-atoms/textarea"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-atoms/card"
import { Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { addExperience, updateExperience, removeExperience } from "@/lib/slices/experienceSlice"

const formSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  position: z.string().min(2, "Position is required"),
  startDate: z.string().min(2, "Start date is required"),
  endDate: z.string().min(2, "End date is required"),
  location: z.string().min(2, "Location is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
})

export default function ExperienceSection() {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const experience = useSelector((state: RootState) => state.experience)
  const [editingId, setEditingId] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      description: values.description.split("\n"),
    }

    if (editingId) {
      dispatch(updateExperience({ id: editingId, ...formattedValues }))
      setEditingId(null)
      toast({
        title: "Experience updated",
        description: "Your work experience has been updated.",
      })
    } else {
      dispatch(addExperience({ id: Date.now().toString(), ...formattedValues }))
      toast({
        title: "Experience added",
        description: "Your work experience has been saved.",
      })
    }
    form.reset()
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormDescription>The name of the company you worked for.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormDescription>Your job title or role.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input placeholder="MM/YYYY" {...field} />
                </FormControl>
                <FormDescription>When you started working in this position.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input placeholder="MM/YYYY or 'Present'" {...field} />
                </FormControl>
                <FormDescription>
                  When you finished working in this position, or 'Present' if it's your current job.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, State/Country" {...field} />
                </FormControl>
                <FormDescription>Where you worked.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your responsibilities and achievements..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  List your key responsibilities and achievements in this role. Use bullet points for clarity.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{editingId ? "Update" : "Add"} Experience</Button>
        </form>
      </Form>

      <div className="space-y-4">
        {experience.map((exp) => (
          <Card key={exp.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {exp.position} at {exp.company}
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      form.reset({ ...exp, description: exp.description.join("\n") })
                      setEditingId(exp.id)
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" onClick={() => dispatch(removeExperience(exp.id))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {exp.startDate} - {exp.endDate}
              </p>
              <p>{exp.location}</p>
              <ul className="list-disc list-inside mt-2">
                {exp.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
