'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Settings, Save, Database, Palette } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Customize your learning experience</p>
      </div>

      {/* Settings Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>
              Basic application preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter your username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about your learning goals" rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Editor Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Palette className="mr-2 h-5 w-5" />
              Editor Preferences
            </CardTitle>
            <CardDescription>
              Customize the markdown editor experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-save</Label>
                <p className="text-sm text-muted-foreground">Automatically save changes</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Syntax Highlighting</Label>
                <p className="text-sm text-muted-foreground">Highlight code blocks</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editor-font">Editor Font</Label>
              <Input id="editor-font" placeholder="Monospace" />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription>
              Manage your learning data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Backup Data</Label>
              <p className="text-sm text-muted-foreground">Export all your learning projects</p>
              <Button variant="outline" className="w-full">
                Export Data
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Import Data</Label>
              <p className="text-sm text-muted-foreground">Import learning projects from backup</p>
              <Button variant="outline" className="w-full">
                Import Data
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Clear Data</Label>
              <p className="text-sm text-muted-foreground text-red-600">Remove all learning projects</p>
              <Button variant="destructive" className="w-full">
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle>About Learning Manager</CardTitle>
            <CardDescription>
              Application information and version
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Updated</span>
              <span className="font-medium">Today</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database</span>
              <span className="font-medium">SQLite</span>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Built with Next.js, TypeScript, and Tailwind CSS for the best learning experience.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  )
}