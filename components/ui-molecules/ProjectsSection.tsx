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
import { addProject, updateProject, removeProject } from "@/lib/slices/projectsSlice"

const formSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  technologies: z.string().min(2, "Technologies used are required"),
  link: z.string().url("Please enter a valid URL").or(z.literal("")),
})

export default function ProjectsSection() {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const projects = useSelector((state: RootState) => state.projects)
  const [editingId, setEditingId] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      technologies: "",
      link: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      technologies: values.technologies.split(",").map((tech) => tech.trim()),
    }

    if (editingId) {
      dispatch(updateProject({ id: editingId, ...formattedValues }))
      setEditingId(null)
      toast({
        title: "Project updated",
        description: "Your project information has been updated.",
      })
    } else {
      dispatch(addProject({ id: Date.now().toString(), ...formattedValues }))
      toast({
        title: "Project added",
        description: "Your project information has been saved.",
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Project" {...field} />
                </FormControl>
                <FormDescription>The name of your project.</FormDescription>
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
                  <Textarea placeholder="Describe your project..." className="resize-none" {...field} />
                </FormControl>
                <FormDescription>A brief description of your project and its key features.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="technologies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Technologies Used</FormLabel>
                <FormControl>
                  <Input placeholder="React, Node.js, MongoDB" {...field} />
                </FormControl>
                <FormDescription>List the main technologies used in your project, separated by commas.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Link</FormLabel>
                <FormControl>
                  <Input placeholder="https://myproject.com" {...field} />
                </FormControl>
                <FormDescription>A link to your project (if available).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{editingId ? "Update" : "Add"} Project</Button>
        </form>
      </Form>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {project.name}
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      form.reset({ ...project, technologies: project.technologies.join(", ") })
                      setEditingId(project.id)
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" onClick={() => dispatch(removeProject(project.id))}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
              <p className="mt-2">
                <strong>Technologies:</strong> {project.technologies.join(", ")}
              </p>
              {project.link && (
                <p className="mt-2">
                  <strong>Link:</strong>{" "}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {project.link}
                  </a>
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
