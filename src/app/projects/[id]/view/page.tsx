'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, BookOpen, FileText, Edit, ChevronLeft, Menu } from 'lucide-react'
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Project not found</div>
      </div>
    )
  }

  return (
    <div className="h-screen">
      {/* Handle no sections case */}
      {project.sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
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
        <div className="h-full flex relative">
          {/* Toggle Button */}
          <div className="absolute top-4 left-4 z-20">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="bg-white/95 backdrop-blur-sm hover:bg-white shadow-md border border-gray-200"
            >
              {sidebarCollapsed ? (
                <>
                  <Menu className="h-4 w-4 mr-2" />
                  Show Menu
                </>
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Collapsible Sidebar */}
          <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-0' : 'w-80'} flex-shrink-0 relative z-10`}>
            <div className={`h-full ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <Card className="h-full rounded-none border-r border-l-0 border-t-0 border-b-0">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <Link href="/preview">
                      <Button variant="ghost" size="sm">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                    </Link>
                    <Link href={`/projects/${project.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                  <div className="mb-4">
                    <h1 className="text-2xl font-bold tracking-tight">{project.title}</h1>
                    {project.description && (
                      <p className="text-muted-foreground text-sm mt-1">{project.description}</p>
                    )}
                  </div>
                  <CardTitle className="text-lg flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Learning Path
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-220px)] overflow-y-auto">
                  <div className="space-y-2">
                    {project.sections.map((section, index) => (
                      <div
                        key={section.id}
                        onClick={() => setSelectedSection(section)}
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          selectedSection?.id === section.id
                            ? 'bg-blue-50 border-2 border-blue-200 text-blue-700'
                            : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            selectedSection?.id === section.id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-400 text-white'
                          }`}>
                            {index + 1}
                          </div>
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
          </div>

          {/* Main Content Area */}
          <div className="flex-1 h-full">
            <Card className="h-full rounded-none border-l-0 border-t-0 border-r-0 border-b-0">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedSection ? selectedSection.title : 'Select a section'}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] overflow-y-auto p-6">
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
                              <code className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-mono border border-blue-200 dark:border-blue-700">{children}</code>
                            ) : (
                              <code className={`${className} text-sm`}>{children}</code>
                            );
                          },
                          pre: ({ children }) => (
                            <pre className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6 rounded-xl overflow-x-auto mb-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                              {children}
                            </pre>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 dark:bg-blue-900/20 text-gray-700 dark:text-gray-300 italic">
                              {children}
                            </blockquote>
                          ),
                          a: ({ children, href }) => (
                            <a 
                              href={href} 
                              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          ),
                          table: ({ children }) => (
                            <div className="overflow-x-auto my-6">
                              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">
                                {children}
                              </table>
                            </div>
                          ),
                          thead: ({ children }) => (
                            <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
                          ),
                          tbody: ({ children }) => (
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>
                          ),
                          th: ({ children }) => (
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700 last:border-r-0">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0">
                              {children}
                            </td>
                          ),
                          hr: () => (
                            <hr className="my-8 border-gray-300 dark:border-gray-600" />
                          ),
                          img: ({ src, alt }) => (
                            <img 
                              src={src} 
                              alt={alt} 
                              className="max-w-full h-auto rounded-lg shadow-md my-6 mx-auto block"
                            />
                          )
                        }}
                      >
                        {selectedSection.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-64 text-muted-foreground">
                      <p>This section has no content yet.</p>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground">
                    <p>Select a section from the learning path to view its content.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
