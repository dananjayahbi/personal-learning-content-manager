'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  BookOpen, 
  Edit, 
  Eye, 
  Clock,
  FileText,
  ArrowRight,
  Trash2
} from 'lucide-react'
import Link from 'next/link'

interface LearningProject {
  id: string
  title: string
  description?: string
  status: string
  priority: string
  publishStatus: string
  category?: string
  progress: number
  estimatedHours?: number
  actualHours: number
  createdAt: string
  _count?: {
    sections: number
  }
}

export default function DraftsPage() {
  const [drafts, setDrafts] = useState<LearningProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDrafts()
  }, [])

  const fetchDrafts = async () => {
    try {
      const response = await fetch('/api/learning-projects?publishStatus=draft')
      if (response.ok) {
        const data = await response.json()
        setDrafts(data)
      }
    } catch (error) {
      console.error('Failed to fetch drafts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePublish = async (projectId: string, projectTitle: string) => {
    if (!confirm(`Are you sure you want to publish "${projectTitle}"? It will be moved from drafts to published projects.`)) {
      return
    }

    try {
      const response = await fetch(`/api/learning-projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publishStatus: 'published' })
      })

      if (response.ok) {
        // Remove from drafts list
        setDrafts(drafts.filter(draft => draft.id !== projectId))
        alert(`"${projectTitle}" has been published successfully!`)
      } else {
        alert('Failed to publish project. Please try again.')
      }
    } catch (error) {
      console.error('Failed to publish project:', error)
      alert('Failed to publish project. Please try again.')
    }
  }

  const handleDelete = async (projectId: string, projectTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${projectTitle}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/learning-projects/${projectId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setDrafts(drafts.filter(draft => draft.id !== projectId))
      } else {
        alert('Failed to delete draft. Please try again.')
      }
    } catch (error) {
      console.error('Failed to delete project:', error)
      alert('Failed to delete draft. Please try again.')
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="p-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Drafts</h1>
              <p className="text-gray-600 mt-1">
                Manage your unpublished learning projects. Complete them and publish when ready.
              </p>
            </div>
            <Link href="/projects/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Drafts Content */}
        {drafts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-gray-700">No drafts yet</h2>
            <p className="text-gray-500 mb-4 text-center max-w-md">
              Create your first learning project and save it as a draft. You can continue working on it and publish when ready.
            </p>
            <Link href="/projects/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Draft
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drafts.map((draft) => (
              <Card key={draft.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-6 text-gray-900">
                        {draft.title}
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {draft.description || 'No description'}
                      </CardDescription>
                    </div>
                    <Badge className="ml-2 bg-orange-100 text-orange-800 border-orange-200">
                      Draft
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Project Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{draft._count?.sections || 0} sections</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{draft.actualHours}h logged</span>
                      </div>
                    </div>

                    {/* Priority and Category */}
                    <div className="flex items-center justify-between">
                      <Badge className={getPriorityColor(draft.priority)}>
                        {draft.priority}
                      </Badge>
                      {draft.category && (
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {draft.category}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex space-x-2">
                        <Link href={`/projects/${draft.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </Link>
                        <Link href={`/projects/${draft.id}/view`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        </Link>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          onClick={() => handlePublish(draft.id, draft.title)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <ArrowRight className="h-4 w-4 mr-1" />
                          Publish
                        </Button>
                        <Button
                          onClick={() => handleDelete(draft.id, draft.title)}
                          variant="destructive"
                          size="sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
