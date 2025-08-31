import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const project = await db.learningProject.findUnique({
      where: { id: params.id },
      include: {
        sections: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching learning project:', error)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description } = await request.json()

    const project = await db.learningProject.update({
      where: { id: params.id },
      data: {
        title,
        description: description || null
      },
      include: {
        sections: {
          orderBy: {
            order: 'asc'
          }
        }
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating learning project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.learningProject.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting learning project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}