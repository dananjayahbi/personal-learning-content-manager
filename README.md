# 📚 Learning Manager

A comprehensive learning management application designed for active learners and software engineers to efficiently organize and track their learning journey. Built with modern web technologies to provide a smooth and effective learning experience.

## 🎯 Overview

Learning Manager is a dashboard-style application that helps you:

- **Create and manage learning projects** - Set up new learning topics with ease
- **Organize content systematically** - Break down complex topics into manageable sections
- **Edit with rich markdown** - Create comprehensive learning materials using a powerful markdown editor
- **Preview and learn** - View your learning materials in a clean, organized interface
- **Track progress** - Monitor your learning journey with an intuitive dashboard

## ✨ Key Features

### 🏠 Dashboard
- **Project Overview**: View all your learning projects at a glance
- **Quick Actions**: Easy access to edit and preview projects
- **Project Statistics**: Track number of sections and creation dates
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📝 Project Creation & Editing
- **Simple Project Setup**: Create new learning projects with title and description
- **Two-Pane Layout**: Efficient workflow with outline and editor panels
- **Section Management**: Add, edit, and delete learning sections
- **Drag-and-Drop Organization**: Reorder sections easily (coming soon)
- **Rich Markdown Editor**: Full-featured markdown editing with live preview

### 📖 Content Creation
- **MDXEditor Integration**: Professional markdown editing experience
- **Syntax Highlighting**: Code blocks with proper syntax highlighting
- **Rich Media Support**: Embed images, links, and multimedia content
- **Auto-save Functionality**: Never lose your work with automatic saving

### 👀 Preview & Learning
- **Card Grid Layout**: Visual overview of all learning projects
- **Two-Pane Reading Interface**: Clean separation between outline and content
- **Responsive Content Display**: Optimized reading experience on all devices
- **Easy Navigation**: Quick section switching for seamless learning

## 🚀 Technology Stack

### Core Framework
- **⚡ Next.js 15** - React framework with App Router
- **📘 TypeScript 5** - Type-safe development
- **🎨 Tailwind CSS 4** - Utility-first CSS framework

### Database & Backend
- **🗄️ Prisma** - Modern ORM for database operations
- **💾 SQLite** - Lightweight, file-based database
- **🔄 REST API** - Clean API endpoints for all operations

### UI Components & Styling
- **🧩 shadcn/ui** - High-quality, accessible components
- **🎯 Lucide React** - Beautiful icon library
- **📝 MDXEditor** - Professional markdown editing
- **🖼️ React Markdown** - Clean markdown rendering
- **📐 Resizable Panels** - Flexible layout management

### State Management & Data
- **� Zustand** - Lightweight state management
- **🔄 TanStack Query** - Server state management
- **⚛️ React Hooks** - Modern React patterns

## 📱 Application Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── learning-projects/    # Project CRUD operations
│   │   │   ├── route.ts          # GET all, POST new
│   │   │   └── [id]/             # Individual project ops
│   │   │       ├── route.ts      # GET, PUT, DELETE project
│   │   │       └── sections/     # Section operations
│   │   │           └── route.ts  # GET, POST sections
│   │   └── sections/             # Individual section ops
│   │       └── [id]/             # PUT, DELETE section
│   │           └── route.ts
│   ├── projects/                 # Project-related pages
│   │   ├── new/                  # Create new project
│   │   │   └── page.tsx
│   │   └── [id]/                 # Dynamic project pages
│   │       ├── edit/             # Edit project page
│   │       │   └── page.tsx
│   │       └── view/             # View project page
│   │           └── page.tsx
│   ├── preview/                  # Preview all projects
│   │   └── page.tsx
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Dashboard/home page
│   └── globals.css               # Global styles
├── components/                   # React components
│   └── ui/                       # shadcn/ui components
├── hooks/                        # Custom React hooks
└── lib/                          # Utilities and configs
    ├── db.ts                     # Database connection
    └── utils.ts                  # Helper functions
```

## 🗄️ Database Schema

### LearningProject
- `id` - Unique identifier
- `title` - Project title
- `description` - Optional project description
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- `sections` - Related sections (one-to-many relationship)

### Section
- `id` - Unique identifier
- `title` - Section title
- `content` - Markdown content (optional)
- `order` - Display order for sorting
- `projectId` - Associated project ID
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp
- `project` - Associated project (many-to-one relationship)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Creating Your First Learning Project

1. **From the Dashboard**: Click "New Project" button
2. **Fill in Project Details**: 
   - Enter a title for your learning project
   - Add an optional description
3. **Create Project**: Click "Create Project" to initialize

### Adding Content to Your Project

1. **Open Project Editor**: Click the edit icon on your project card
2. **Create Sections**:
   - In the left panel, enter a section title
   - Click the "+" button to add it
3. **Edit Content**:
   - Click on a section to select it
   - Use the markdown editor in the right panel
   - Write your learning content with full markdown support
4. **Save Changes**: Click "Save" to preserve your work

### Previewing and Learning

1. **From Dashboard**: Click the eye icon on any project card
2. **Navigate Sections**: Click sections in the left panel
3. **Read Content**: View formatted content in the right panel
4. **Switch to Edit**: Click "Edit Project" to make changes

### Managing Projects

- **Edit**: Click the edit icon to modify project details
- **Preview**: Click the eye icon to view project content
- **Delete**: Remove projects you no longer need (coming soon)

## 🎨 Features in Detail

### Markdown Editor Capabilities

The built-in MDXEditor supports:

- **Basic Formatting**: Bold, italic, underline, strikethrough
- **Headings**: H1-H6 heading levels
- **Lists**: Ordered and unordered lists
- **Links**: Easy link insertion and management
- **Images**: Image embedding with alt text
- **Code Blocks**: Syntax-highlighted code snippets
- **Blockquotes**: Quote formatting
- **Tables**: Create and edit tables
- **Horizontal Rules**: Section dividers

### Responsive Design

The application is fully responsive with:

- **Mobile-first**: Optimized for mobile devices
- **Tablet Support**: Enhanced layouts for tablets
- **Desktop Experience**: Full-featured desktop interface
- **Touch-friendly**: Large touch targets and gestures

### Data Persistence

- **SQLite Database**: Reliable local data storage
- **Automatic Saving**: Content is saved when you click save
- **Data Integrity**: Foreign key constraints ensure data consistency
- **Backup Friendly**: Single file database for easy backups

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Database operations
npm run db:push      # Push schema changes
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:reset     # Reset database
```

### API Endpoints

#### Learning Projects
- `GET /api/learning-projects` - Get all projects
- `POST /api/learning-projects` - Create new project
- `GET /api/learning-projects/[id]` - Get specific project
- `PUT /api/learning-projects/[id]` - Update project
- `DELETE /api/learning-projects/[id]` - Delete project

#### Sections
- `GET /api/learning-projects/[id]/sections` - Get project sections
- `POST /api/learning-projects/[id]/sections` - Create new section
- `PUT /api/sections/[id]` - Update section
- `DELETE /api/sections/[id]` - Delete section

## 🎯 Use Cases

### For Software Engineers
- **Technology Learning**: Track your journey learning new frameworks, languages, or tools
- **Project Documentation**: Create comprehensive documentation for your projects
- **Knowledge Base**: Build a personal knowledge base of programming concepts
- **Tutorial Creation**: Develop step-by-step tutorials for complex topics

### For Students
- **Course Organization**: Structure your learning materials by subject
- **Note-taking**: Create detailed, well-organized notes
- **Exam Preparation**: Organize study materials by topic
- **Research Projects**: Document your research process and findings

### For Professionals
- **Skill Development**: Plan and track professional development
- **Training Materials**: Create training documentation for teams
- **Process Documentation**: Document complex workflows and procedures
- **Best Practices**: Compile and organize industry best practices

## 🚀 Future Enhancements

### Planned Features
- **Drag-and-Drop Section Reordering**: Organize sections visually
- **Project Templates**: Pre-built templates for common learning scenarios
- **Collaboration Features**: Share projects with other learners
- **Export Functionality**: Export projects to PDF, markdown, or other formats
- **Search Functionality**: Find content across all projects
- **Tags and Categories**: Organize projects with metadata
- **Progress Tracking**: Monitor completion status of sections
- **Dark Mode**: Enhanced viewing experience
- **Mobile App**: Native mobile experience

### Technical Improvements
- **Performance Optimization**: Faster loading and rendering
- **Offline Support**: Access projects without internet connection
- **Image Upload**: Direct image uploading and management
- **Advanced Markdown**: Support for more markdown features
- **Version History**: Track changes and revert to previous versions
- **Backup/Restore**: Cloud backup and restore functionality

## 🤝 Contributing

We welcome contributions to make Learning Manager even better! Please feel free to submit issues and enhancement requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Next.js Team**: For the excellent framework
- **Prisma**: For the modern ORM
- **shadcn/ui**: For the beautiful component library
- **MDXEditor**: For the powerful markdown editing experience
- **Tailwind CSS**: For the utility-first CSS framework

---

**Built with ❤️ for learners, by learners.**

Happy learning! 🎓
