'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Calendar as CalendarIcon,
  Bell
} from 'lucide-react'

interface CalendarProps {
  className?: string
}

interface UpcomingItem {
  id: string
  title: string
  time: string
  type: 'session' | 'deadline' | 'review'
  project?: string
}

export function Calendar({ className }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  
  const upcomingItems: UpcomingItem[] = [
    {
      id: '1',
      title: 'React Hooks Study',
      time: '09:15 AM',
      type: 'session',
      project: 'Master React & Next.js'
    },
    {
      id: '2',
      title: 'Design Review',
      time: '10:30 AM',
      type: 'review',
      project: 'UI/UX Design Principles'
    },
    {
      id: '3',
      title: 'Project Deadline',
      time: '12:30 PM',
      type: 'deadline',
      project: 'Python for Data Science'
    },
    {
      id: '4',
      title: 'NextJS Tutorial',
      time: '15:45 PM',
      type: 'session',
      project: 'Master React & Next.js'
    }
  ]

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Make Monday = 0

    const days: (number | null)[] = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isToday = (day: number | null) => {
    if (!day) return false
    const today = new Date()
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear()
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'session': return 'bg-blue-500'
      case 'deadline': return 'bg-red-500'
      case 'review': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const days = getDaysInMonth(currentDate)

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Calendar */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Learning Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigateMonth('prev')}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium text-sm min-w-24 text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigateMonth('next')}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`
                  aspect-square flex items-center justify-center text-sm cursor-pointer rounded-lg
                  ${day ? 'hover:bg-gray-100' : ''}
                  ${isToday(day) ? 'bg-blue-600 text-white font-bold' : ''}
                  ${day && !isToday(day) ? 'text-gray-700' : ''}
                `}
              >
                {day}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Upcoming
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${getTypeColor(item.type)}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-800 truncate">{item.title}</p>
                  {item.project && (
                    <p className="text-xs text-gray-500 truncate">{item.project}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {item.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold">Today's Goals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Study Hours</span>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                2.5 / 4h
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sections Completed</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                3 / 5
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Notes Taken</span>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                8
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
