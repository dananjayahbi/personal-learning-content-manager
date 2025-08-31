'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, FileText, Clock, TrendingUp } from 'lucide-react'

interface AnalyticsData {
  totalProjects: number
  totalSections: number
  recentProjects: number
  avgSectionsPerProject: number
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalProjects: 0,
    totalSections: 0,
    recentProjects: 0,
    avgSectionsPerProject: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const [projectsResponse, sectionsResponse] = await Promise.all([
        fetch('/api/learning-projects'),
        fetch('/api/learning-projects') // We'll calculate from this
      ])

      if (projectsResponse.ok) {
        const projects = await projectsResponse.json()
        
        const totalProjects = projects.length
        const totalSections = projects.reduce((sum: number, project: any) => 
          sum + (project._count?.sections || 0), 0
        )
        
        // Calculate projects created in last 7 days
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        const recentProjects = projects.filter((project: any) => 
          new Date(project.createdAt) > oneWeekAgo
        ).length
        
        const avgSectionsPerProject = totalProjects > 0 ? Math.round((totalSections / totalProjects) * 10) / 10 : 0

        setAnalytics({
          totalProjects,
          totalSections,
          recentProjects,
          avgSectionsPerProject
        })
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
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

  const stats = [
    {
      title: 'Total Projects',
      value: analytics.totalProjects,
      description: 'Learning projects created',
      icon: BookOpen,
      trend: '+12%'
    },
    {
      title: 'Total Sections',
      value: analytics.totalSections,
      description: 'Learning sections across all projects',
      icon: FileText,
      trend: '+8%'
    },
    {
      title: 'Recent Projects',
      value: analytics.recentProjects,
      description: 'Created in the last 7 days',
      icon: Clock,
      trend: '+25%'
    },
    {
      title: 'Avg Sections/Project',
      value: analytics.avgSectionsPerProject.toFixed(1),
      description: 'Average sections per project',
      icon: TrendingUp,
      trend: '+5%'
    }
  ]

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Track your learning progress and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <p className="text-xs text-green-600 mt-1">{stat.trend} from last week</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Analytics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Learning Activity</CardTitle>
            <CardDescription>Your learning progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-medium">{analytics.recentProjects} projects</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Content</span>
                <span className="font-medium">{analytics.totalSections} sections</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Productivity</span>
                <span className="font-medium">{analytics.avgSectionsPerProject} sections/project</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Better Learning</CardTitle>
            <CardDescription>Improve your learning efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm">
                <strong>Consistent Practice:</strong> Try to add content to your projects regularly.
              </div>
              <div className="text-sm">
                <strong>Detailed Sections:</strong> Aim for 5-10 sections per project for comprehensive coverage.
              </div>
              <div className="text-sm">
                <strong>Regular Review:</strong> Use the preview mode to revisit and reinforce your learning.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}