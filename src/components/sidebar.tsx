'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Home, 
  BookOpen, 
  Settings, 
  Plus,
  BarChart3,
  FileText
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    name: 'Preview Projects',
    href: '/preview',
    icon: BookOpen,
  },
  {
    name: 'New Project',
    href: '/projects/new',
    icon: Plus,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
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
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-6 w-6" />
            <span>Learning Manager</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    isActive && 'bg-muted text-primary'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="text-xs text-muted-foreground">
            <p>© 2024 Learning Manager</p>
            <p>Built with ❤️ for learners</p>
          </div>
        </div>
      </div>
    </div>
  )
}