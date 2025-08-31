import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const projects = await db.learningProject.findMany({
      include: {
        _count: {
          select: {
            sections: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching learning projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json()

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    const project = await db.learningProject.create({
      data: {
        title,
        description: description || null
      },
      include: {
        _count: {
          select: {
            sections: true
          }
        }
      }
    })

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating learning project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}