'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable'
import { ArrowLeft, Plus, Save, Trash2, Edit } from 'lucide-react'
import { MDXEditor } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import Link from 'next/link'

interface Section {
  id: string
  title: string
  content?: string
  order: number
}

interface LearningProject {
  id: string
  title: string
  description?: string
  sections: Section[]
}

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<LearningProject | null>(null)
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [newSectionTitle, setNewSectionTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchProject()
  }, [params.id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/learning-projects/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
        if (data.sections.length > 0) {
          setSelectedSection(data.sections[0])
          setEditingSection(data.sections[0])
        }
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSection = async () => {
    if (!newSectionTitle.trim() || !project) return

    try {
      const response = await fetch(`/api/learning-projects/${project.id}/sections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newSectionTitle,
          content: ''
        })
      })

      if (response.ok) {
        const newSection = await response.json()
        setProject({
          ...project,
          sections: [...project.sections, newSection]
        })
        setSelectedSection(newSection)
        setEditingSection(newSection)
        setNewSectionTitle('')
      }
    } catch (error) {
      console.error('Failed to add section:', error)
    }
  }

  const handleUpdateSection = async () => {
    if (!editingSection || !project) return

    setSaving(true)
    try {
      const response = await fetch(`/api/sections/${editingSection.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(editingSection)
      })

      if (response.ok) {
        const updatedSection = await response.json()
        setProject({
          ...project,
          sections: project.sections.map(s => 
            s.id === updatedSection.id ? updatedSection : s
          )
        })
        setSelectedSection(updatedSection)
      }
    } catch (error) {
      console.error('Failed to update section:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSection = async (sectionId: string) => {
    if (!project) return

    try {
      const response = await fetch(`/api/sections/${sectionId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const updatedSections = project.sections.filter(s => s.id !== sectionId)
        setProject({
          ...project,
          sections: updatedSections
        })
        
        if (selectedSection?.id === sectionId) {
          setSelectedSection(updatedSections.length > 0 ? updatedSections[0] : null)
          setEditingSection(updatedSections.length > 0 ? updatedSections[0] : null)
        }
      }
    } catch (error) {
      console.error('Failed to delete section:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div>Project not found</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
              <p className="text-muted-foreground">{project.title}</p>
            </div>
          </div>
          <Link href={`/projects/${project.id}/view`}>
            <Button variant="outline">
              Preview
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-200px)]">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Sections Outline */}
          <ResizablePanel defaultSize={30} minSize={20}>
            <div className="pr-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Project Outline</CardTitle>
                  <CardDescription>Manage your learning sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add New Section */}
                  <div className="flex space-x-2">
                    <Input
                      placeholder="New section title..."
                      value={newSectionTitle}
                      onChange={(e) => setNewSectionTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSection()}
                    />
                    <Button
                      onClick={handleAddSection}
                      disabled={!newSectionTitle.trim()}
                      size="sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sections List */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {project.sections.map((section) => (
                      <div
                        key={section.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          selectedSection?.id === section.id
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => {
                          setSelectedSection(section)
                          setEditingSection(section)
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium truncate">{section.title}</span>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteSection(section.id)
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {project.sections.length === 0 && (
                      <p className="text-muted-foreground text-sm text-center py-4">
                        No sections yet. Add your first section above.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Markdown Editor */}
          <ResizablePanel defaultSize={70}>
            <div className="pl-4">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>
                      {editingSection ? `Editing: ${editingSection.title}` : 'Select a section to edit'}
                    </span>
                    <Button
                      onClick={handleUpdateSection}
                      disabled={!editingSection || saving}
                      size="sm"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {saving ? 'Saving...' : 'Save'}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {editingSection ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="section-title">Section Title</Label>
                        <Input
                          id="section-title"
                          value={editingSection.title}
                          onChange={(e) => setEditingSection({
                            ...editingSection,
                            title: e.target.value
                          })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Content</Label>
                        <div className="mt-1 border rounded-md overflow-hidden">
                          <MDXEditor
                            markdown={editingSection.content || ''}
                            onChange={(value) => setEditingSection({
                              ...editingSection,
                              content: value
                            })}
                            height={400}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      <p>Select a section from the outline to start editing</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}