"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"

export default function ResumePreview() {
  const { about, education, experience, projects, skills } = useSelector((state: RootState) => state)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Resume Preview</h2>

      <section>
        <h3 className="text-xl font-semibold">About</h3>
        <p>{about.name}</p>
        <p>
          {about.email} | {about.phone}
        </p>
        <p>{about.address}</p>
        <p>{about.summary}</p>
      </section>

      <section>
        <h3 className="text-xl font-semibold">Education</h3>
        {education.map((edu) => (
          <div key={edu.id}>
            <p>
              <strong>{edu.institution}</strong>
            </p>
            <p>
              {edu.degree} in {edu.fieldOfStudy}
            </p>
            <p>
              {edu.startDate} - {edu.endDate}
            </p>
            <p>{edu.location}</p>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-semibold">Experience</h3>
        {experience.map((exp) => (
          <div key={exp.id}>
            <p>
              <strong>{exp.position}</strong> at {exp.company}
            </p>
            <p>
              {exp.startDate} - {exp.endDate}
            </p>
            <p>{exp.location}</p>
            <ul className="list-disc list-inside">
              {exp.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-semibold">Projects</h3>
        {projects.map((project) => (
          <div key={project.id}>
            <p>
              <strong>{project.name}</strong>
            </p>
            <p>{project.description}</p>
            <p>Technologies: {project.technologies.join(", ")}</p>
            {project.link && (
              <p>
                Link:{" "}
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.link}
                </a>
              </p>
            )}
          </div>
        ))}
      </section>

      <section>
        <h3 className="text-xl font-semibold">Skills</h3>
        <p>{skills.join(", ")}</p>
      </section>
    </div>
  )
}
