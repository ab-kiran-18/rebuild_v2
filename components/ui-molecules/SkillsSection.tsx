"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui-atoms/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui-atoms/form"
import { Input } from "@/components/ui-atoms/input"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui-atoms/badge"
import { X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { addSkill, removeSkill, updateSkills } from "@/lib/slices/skillsSlice"

const formSchema = z.object({
  skill: z.string().min(2, "Skill name is required"),
})

export default function SkillsSection() {
  const { toast } = useToast()
  const dispatch = useDispatch()
  const skills = useSelector((state: RootState) => state.skills)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch(addSkill(values.skill))
    form.reset()
    toast({
      title: "Skill added",
      description: `${values.skill} has been added to your skills.`,
    })
  }

  function removeSkillHandler(skillToRemove: string) {
    dispatch(removeSkill(skillToRemove))
    toast({
      title: "Skill removed",
      description: `${skillToRemove} has been removed from your skills.`,
    })
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="skill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add a Skill</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. JavaScript, Project Management, SEO" {...field} />
                </FormControl>
                <FormDescription>Enter a skill and press Add to include it in your resume.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Skill</Button>
        </form>
      </Form>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-sm py-1 px-2">
            {skill}
            <button onClick={() => removeSkillHandler(skill)} className="ml-2 text-gray-500 hover:text-gray-700">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
