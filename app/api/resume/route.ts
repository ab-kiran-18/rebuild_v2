import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase()
    const resumeData = await request.json()

    const result = await db.collection("resumes").insertOne(resumeData)

    return NextResponse.json({ id: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error saving resume" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const resume = await db.collection("resumes").findOne({ _id: new ObjectId(id) })

    if (!resume) {
      return NextResponse.json({ error: "Resume not found" }, { status: 404 })
    }

    return NextResponse.json(resume)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error retrieving resume" }, { status: 500 })
  }
}
