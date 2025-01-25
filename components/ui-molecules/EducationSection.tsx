"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui-atoms/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui-atoms/form"
import { Input } from "@/components/ui-atoms/input"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui-atoms/card"
import { Trash2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { addEducation, updateEducation, removeEducation } from "@/lib/slices/educationSlice"

const formSchema = z.object({
  institution: z.string().min(2, "Institution name is required"),
  degree: z.string().min(2, "Degree is required"),
  fieldOfStudy: z.string().min(2, "Field of study is required"),
  startDate: z.string().min(2, "Start date is required"),
  endDate: z.string().min(2, "End date is required"),
  location: z.string().min(2, "Location is required"),
})

export default function EducationSection() {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const education = useSelector((state: RootState) => state.education)
  const [editingId, setEditingId] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      location: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editingId) {
      dispatch(updateEducation({ id: editingId, ...values }))
      setEditingId(null)
      toast({
        title: "Education updated",
        description: "Your education information has been updated.",
      })
    } else {
      dispatch(addEducation({ id: Date.now().toString(), ...values }))
      toast({
        title: "Education added",
        description: "Your education information has been saved.",
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
            name="institution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Institution</FormLabel>
                <FormControl>
                  <Input placeholder="University of Example" {...field} />
                </FormControl>
                <FormDescription>The name of the school or university you attended.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="degree"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree</FormLabel>
                <FormControl>
                  <Input placeholder="Bachelor of Science" {...field} />
                </FormControl>
                <FormDescription>The type of degree you received.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fieldOfStudy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field of Study</FormLabel>
                <FormControl>
                  <Input placeholder="Computer Science" {...field} />
                </FormControl>
                <FormDescription>Your major or area of study.</FormDescription>
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
                <FormDescription>When you started your studies.</FormDescription>
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
                <FormDescription>When you completed or expect to complete your studies.</FormDescription>
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
                <FormDescription>Where the institution is located.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{editingId ? "Update" : "Add"} Education</Button>
        </form>
      </Form>

      <div className="space-y-4">
        {education.map((edu) => (
          <Card key={edu.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {edu.institution}
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      form.reset(edu)
                      setEditingId(edu.id)
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" onClick={() => dispatch(removeEducation(edu.id))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                {edu.degree} in {edu.fieldOfStudy}
              </p>
              <p>
                {edu.startDate} - {edu.endDate}
              </p>
              <p>{edu.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
