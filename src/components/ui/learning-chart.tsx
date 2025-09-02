'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, Target } from 'lucide-react'

interface ChartProps {
  className?: string
}

interface ChartData {
  name: string
  value: number
  color: string
}

export function LearningChart({ className }: ChartProps) {
  // Mock data for learning progress over time
  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, target: 4 },
    { day: 'Tue', hours: 3.2, target: 4 },
    { day: 'Wed', hours: 1.8, target: 4 },
    { day: 'Thu', hours: 4.1, target: 4 },
    { day: 'Fri', hours: 3.5, target: 4 },
    { day: 'Sat', hours: 2.9, target: 4 },
    { day: 'Sun', hours: 1.2, target: 4 }
  ]

  const categoryProgress: ChartData[] = [
    { name: 'Programming', value: 65, color: 'bg-blue-500' },
    { name: 'Design', value: 45, color: 'bg-purple-500' },
    { name: 'Languages', value: 30, color: 'bg-green-500' },
    { name: 'Business', value: 20, color: 'bg-orange-500' }
  ]

  const maxHours = Math.max(...weeklyProgress.map(d => d.hours), ...weeklyProgress.map(d => d.target))

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Weekly Progress Chart */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Weekly Learning Progress</CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% this week
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-32 gap-2">
            {weeklyProgress.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center flex-1">
                <div className="relative w-full flex flex-col items-center justify-end h-24 mb-2">
                  {/* Target line */}
                  <div 
                    className="absolute w-full border-t-2 border-dashed border-gray-300"
                    style={{ bottom: `${(day.target / maxHours) * 100}%` }}
                  ></div>
                  
                  {/* Actual progress bar */}
                  <div 
                    className="w-6 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-500"
                    style={{ height: `${(day.hours / maxHours) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs font-medium text-gray-600">{day.day}</span>
                <span className="text-xs text-gray-500">{day.hours}h</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-4 gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600">Actual Hours</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-1 border-t-2 border-dashed border-gray-300"></div>
              <span className="text-gray-600">Target</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Learning Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryProgress.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                  <span className="text-sm font-bold text-gray-800">{category.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${category.color} transition-all duration-500`}
                    style={{ width: `${category.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">47h</div>
              <div className="text-xs text-gray-600">Total Hours</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-xs text-gray-600">Sections Done</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">8</div>
              <div className="text-xs text-gray-600">Projects</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">95%</div>
              <div className="text-xs text-gray-600">Consistency</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
