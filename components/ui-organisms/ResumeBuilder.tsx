"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui-atoms/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui-atoms/tabs"
import AboutSection from "../ui-molecules/AboutSection"
import EducationSection from "../ui-molecules/EducationSection"
import ExperienceSection from "../ui-molecules/ExperienceSection"
import ProjectsSection from "../ui-molecules/ProjectsSection"
import SkillsSection from "../ui-molecules/SkillsSection"
import ResumePreview from "./ResumePreview"

const sections = [
  { id: "about", label: "About", component: AboutSection },
  { id: "education", label: "Education", component: EducationSection },
  { id: "experience", label: "Work Experience", component: ExperienceSection },
  { id: "projects", label: "Projects", component: ProjectsSection },
  { id: "skills", label: "Skills", component: SkillsSection },
]

export default function ResumeBuilder() {
  const [activeSection, setActiveSection] = useState("about")

  return (
    <div className="flex gap-8">
      <Card className="w-1/2">
        <CardContent>
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="grid w-full grid-cols-5">
              {sections.map((section) => (
                <TabsTrigger key={section.id} value={section.id}>
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {sections.map((section) => (
              <TabsContent key={section.id} value={section.id}>
                <section.component />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      <Card className="w-1/2">
        <CardContent>
          <ResumePreview />
        </CardContent>
      </Card>
    </div>
  )
}
