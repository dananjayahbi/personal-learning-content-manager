'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Eye } from 'lucide-react'
import Link from 'next/link'

interface LearningProject {
  id: string
  title: string
  description?: string
  createdAt: string
  _count?: {
    sections: number
  }
}

export default function PreviewPage() {
  const [projects, setProjects] = useState<LearningProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/learning-projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Preview Projects</h1>
        <p className="text-muted-foreground">View all your learning projects</p>
      </div>

      {/* Main Content */}
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No learning projects yet</h2>
          <p className="text-muted-foreground mb-4">Create your first learning project to get started</p>
          <Link href="/projects/new">
            <Button>
              Create Your First Project
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-all hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg leading-tight">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description || 'No description available'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <BookOpen className="h-3 w-3 mr-1" />
                      {project._count?.sections || 0} sections
                    </span>
                    <span className="text-xs">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Link href={`/projects/${project.id}/view`}>
                    <Button className="w-full" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Project
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}