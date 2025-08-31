import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const project = await db.learningProject.findUnique({
      where: { id },
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { title, description, publishStatus } = await request.json()

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description || null
    if (publishStatus !== undefined) updateData.publishStatus = publishStatus

    const project = await db.learningProject.update({
      where: { id },
      data: updateData,
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.learningProject.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting learning project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}