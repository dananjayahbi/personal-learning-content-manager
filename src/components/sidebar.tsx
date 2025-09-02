'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Home, 
  BookOpen, 
  Settings, 
  Plus,
  User,
  GraduationCap,
  FileText
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    name: 'Projects',
    href: '/preview',
    icon: BookOpen,
  },
  {
    name: 'Drafts',
    href: '/drafts',
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:block w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <div className="flex h-16 items-center px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-white font-bold text-lg">Learning Manager</span>
          </Link>
        </div>

        {/* Profile Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Personal Learning</p>
              <p className="text-sm text-gray-500">Your learning journey</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-4">
          <nav className="space-y-1 px-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200',
                    isActive 
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  <item.icon className={cn(
                    'h-5 w-5',
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  )} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200">
          <Link href="/projects/new">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-3 text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200 cursor-pointer">
              <Plus className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm font-medium">New Project</span>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Built for continuous learning</p>
            <p className="mt-1">v1.0.0</p>
          </div>
        </div>
      </div>
    </div>
  )
}