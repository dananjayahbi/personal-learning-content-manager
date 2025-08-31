'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from '@/components/ui/resizable'
import { ArrowLeft, BookOpen, FileText, Edit } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import Link from 'next/link'
import 'highlight.js/styles/github.css'
import 'katex/dist/katex.min.css'

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

  useEffect(() => {
    if (selectedSection?.content && process.env.NODE_ENV === 'development') {
      console.log('Selected section content:', selectedSection.content);
    }
  }, [selectedSection]);

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
                Back
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
                  <CardContent className="h-[calc(100vh-350px)] overflow-y-auto p-6">
                    {selectedSection ? (
                      selectedSection.content ? (
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
                            components={{
                              h1: ({ children }) => (
                                <h1 className="text-3xl font-bold mb-6 mt-8 first:mt-0 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2">{children}</h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-2xl font-semibold mb-4 mt-6 first:mt-0 text-gray-800 dark:text-gray-200">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-xl font-medium mb-3 mt-5 first:mt-0 text-gray-700 dark:text-gray-300">{children}</h3>
                              ),
                              h4: ({ children }) => (
                                <h4 className="text-lg font-medium mb-2 mt-4 first:mt-0 text-gray-700 dark:text-gray-300">{children}</h4>
                              ),
                              h5: ({ children }) => (
                                <h5 className="text-base font-medium mb-2 mt-3 first:mt-0 text-gray-700 dark:text-gray-300">{children}</h5>
                              ),
                              h6: ({ children }) => (
                                <h6 className="text-sm font-medium mb-2 mt-3 first:mt-0 text-gray-700 dark:text-gray-300">{children}</h6>
                              ),
                              p: ({ children }) => (
                                <p className="mb-4 leading-relaxed text-gray-600 dark:text-gray-400 text-base">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="mb-6 ml-6 space-y-2 list-disc marker:text-blue-500">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="mb-6 ml-6 space-y-2 list-decimal marker:text-blue-500">{children}</ol>
                              ),
                              li: ({ children }) => (
                                <li className="pl-2 text-gray-600 dark:text-gray-400">{children}</li>
                              ),
                              code: ({ children, className }) => {
                                const isInline = !className;
                                return isInline ? (
                                  <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm font-mono border">{children}</code>
                                ) : (
                                  <code className={className}>{children}</code>
                                );
                              },
                              pre: ({ children }) => (
                                <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-lg overflow-x-auto mb-6 text-sm">{children}</pre>
                              ),
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950 pl-6 pr-4 py-3 italic my-6 text-gray-700 dark:text-gray-300 rounded-r-lg">{children}</blockquote>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
                              ),
                              table: ({ children }) => (
                                <div className="overflow-x-auto my-6">
                                  <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">{children}</table>
                                </div>
                              ),
                              thead: ({ children }) => (
                                <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
                              ),
                              tbody: ({ children }) => (
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>
                              ),
                              tr: ({ children }) => (
                                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800">{children}</tr>
                              ),
                              th: ({ children }) => (
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">{children}</th>
                              ),
                              td: ({ children }) => (
                                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">{children}</td>
                              ),
                              a: ({ children, href }) => (
                                <a href={href} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-300 hover:decoration-blue-500 transition-colors">{children}</a>
                              ),
                              hr: () => (
                                <hr className="my-8 border-gray-200 dark:border-gray-700" />
                              ),
                              // Support for GitHub Flavored Markdown
                              del: ({ children }) => (
                                <del className="line-through text-gray-500 dark:text-gray-400">{children}</del>
                              ),
                              input: ({ checked, type }) => {
                                if (type === 'checkbox') {
                                  return (
                                    <input 
                                      type="checkbox" 
                                      checked={checked} 
                                      readOnly 
                                      className="mr-2 accent-blue-500" 
                                    />
                                  );
                                }
                                return <input type={type} />;
                              }
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