import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sections = await db.section.findMany({
      where: { projectId: params.id },
      orderBy: {
        order: 'asc'
      }
    })

    return NextResponse.json(sections)
  } catch (error) {
    console.error('Error fetching sections:', error)
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, content } = await request.json()

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Get the current highest order for this project
    const lastSection = await db.section.findFirst({
      where: { projectId: params.id },
      orderBy: { order: 'desc' }
    })

    const newOrder = lastSection ? lastSection.order + 1 : 0

    const section = await db.section.create({
      data: {
        title,
        content: content || null,
        order: newOrder,
        projectId: params.id
      }
    })

    return NextResponse.json(section, { status: 201 })
  } catch (error) {
    console.error('Error creating section:', error)
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 })
  }
}