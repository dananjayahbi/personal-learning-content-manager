'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable'
import { ArrowLeft, BookOpen, FileText, Edit } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
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

export default function ViewProjectPage() {
  const params = useParams()
  const [project, setProject] = useState<LearningProject | null>(null)
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)
  const [loading, setLoading] = useState(true)

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
        }
      }
    } catch (error) {
      console.error('Failed to fetch project:', error)
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
            <Link href="/preview">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Preview
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
              {project.description && (
                <p className="text-muted-foreground">{project.description}</p>
              )}
            </div>
          </div>
          <Link href={`/projects/${project.id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit Project
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      {project.sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No sections yet</h2>
          <p className="text-muted-foreground mb-4">This project doesn't have any sections yet. Start by adding some content!</p>
          <Link href={`/projects/${project.id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Add Content
            </Button>
          </Link>
        </div>
      ) : (
        <div className="h-[calc(100vh-200px)]">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Left Panel - Sections Outline */}
            <ResizablePanel defaultSize={30} minSize={20}>
              <div className="pr-4">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Learning Path
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {project.sections.map((section, index) => (
                        <div
                          key={section.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedSection?.id === section.id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => setSelectedSection(section)}
                        >
                          <div className="flex items-start space-x-2">
                            <span className="flex-shrink-0 w-6 h-6 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </span>
                            <div>
                              <h3 className="font-medium text-sm">{section.title}</h3>
                              {section.content && (
                                <p className="text-xs opacity-75 mt-1 line-clamp-2">
                                  {section.content.replace(/[#*`]/g, '').substring(0, 100)}...
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Right Panel - Content Display */}
            <ResizablePanel defaultSize={70}>
              <div className="pl-4">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {selectedSection ? selectedSection.title : 'Select a section'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedSection ? (
                      selectedSection.content ? (
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown
                            components={{
                              h1: ({ children }) => (
                                <h1 className="text-2xl font-bold mb-4 mt-6 first:mt-0">{children}</h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-xl font-semibold mb-3 mt-5 first:mt-0">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-lg font-medium mb-2 mt-4 first:mt-0">{children}</h3>
                              ),
                              p: ({ children }) => (
                                <p className="mb-4 leading-relaxed">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="mb-4 ml-6 space-y-1 list-disc">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="mb-4 ml-6 space-y-1 list-decimal">{children}</ol>
                              ),
                              li: ({ children }) => (
                                <li className="pl-1">{children}</li>
                              ),
                              code: ({ children }) => (
                                <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>
                              ),
                              pre: ({ children }) => (
                                <pre className="bg-muted p-3 rounded-lg overflow-x-auto mb-4">{children}</pre>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">{children}</blockquote>
                              )
                            }}
                          >
                            {selectedSection.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-64 text-muted-foreground">
                          <div className="text-center">
                            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No content available for this section</p>
                            <Link href={`/projects/${project.id}/edit`}>
                              <Button className="mt-4" size="sm">
                                Add Content
                              </Button>
                            </Link>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center h-64 text-muted-foreground">
                        <p>Select a section from the learning path to view its content</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      )}
    </div>
  )
}