'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Plus, 
  BookOpen, 
  Edit, 
  Eye, 
  Clock, 
  Target,
  TrendingUp,
  Activity,
  User,
  Bell
} from 'lucide-react'
import Link from 'next/link'

interface LearningProject {
  id: string
  title: string
  description?: string
  status: string
  priority: string
  category?: string
  progress: number
  estimatedHours?: number
  actualHours: number
  createdAt: string
  _count?: {
    sections: number
  }
}

interface DashboardStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalHours: number
  avgProgress: number
}

export default function Dashboard() {
  const [projects, setProjects] = useState<LearningProject[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)
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
        calculateStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (projects: LearningProject[]) => {
    const totalProjects = projects.length
    const activeProjects = projects.filter(p => p.status === 'active').length
    const completedProjects = projects.filter(p => p.status === 'completed').length
    const totalHours = projects.reduce((sum, p) => sum + p.actualHours, 0)
    const avgProgress = totalProjects > 0 
      ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects)
      : 0

    setStats({
      totalProjects,
      activeProjects,
      completedProjects,
      totalHours,
      avgProgress
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500'
      case 'completed': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      default: return 'bg-gray-500'
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
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Good morning, Learner!</h1>
            <p className="text-blue-100 mt-1">
              You have {stats?.activeProjects || 0} active projects today. Remember to check documentation before starting!
            </p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-blue-100">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+7.2% this week</span>
              </div>
              <div className="bg-blue-500/20 px-2 py-1 rounded text-sm">
                ⭐ 4.5 (10k reviews)
              </div>
            </div>
          </div>
          
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <Link href="/projects/new">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Link>
            <div className="bg-white/10 p-2 rounded-full">
              <Bell className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-medium">Personal Learning</p>
                <p className="text-xs text-blue-200">Learner</p>
              </div>
              <div className="bg-white/20 p-2 rounded-full">
                <User className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Main Content */}
        <div className="space-y-6">



          {/* Projects Section */}
          {projects.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">No learning projects yet</h2>
                <p className="text-gray-600 mb-6">Create your first learning project to get started on your journey</p>
                <Link href="/projects/new">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Project
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Your Learning Projects</h2>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  {projects.length} projects
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-bold text-gray-800 mb-2">
                            {project.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge 
                              variant="secondary" 
                              className={getPriorityColor(project.priority)}
                            >
                              {project.priority}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                              <span className="text-xs text-gray-600 capitalize">{project.status}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Link href={`/projects/${project.id}/edit`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/projects/${project.id}/view`}>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {project.description || 'No description available'}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-800">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      {/* Project Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-blue-500" />
                          <span className="text-gray-600">{project._count?.sections || 0} sections</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-green-500" />
                          <span className="text-gray-600">{project.actualHours}h logged</span>
                        </div>
                        {project.category && (
                          <div className="flex items-center gap-2 col-span-2">
                            <Target className="h-4 w-4 text-purple-500" />
                            <span className="text-gray-600">{project.category}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}