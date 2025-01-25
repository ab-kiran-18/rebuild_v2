import ResumeBuilder from "../components/ui-organisms/ResumeBuilder";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">ATS-Friendly Resume Builder</h1>
      <ResumeBuilder />
    </main>
  )
}
