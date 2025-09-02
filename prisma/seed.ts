import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create some learning projects
  const reactProject = await prisma.learningProject.create({
    data: {
      title: 'Master React & Next.js',
      description: 'Learn modern React development with Next.js, TypeScript, and best practices',
      status: 'active',
      publishStatus: 'published',
      priority: 'high',
      category: 'Programming',
      progress: 35,
      estimatedHours: 100,
      actualHours: 35,
      sections: {
        create: [
          {
            title: 'React Fundamentals',
            content: 'Learn the basics of React including components, props, and state',
            order: 1,
            status: 'completed',
            estimatedHours: 20,
            actualHours: 18,
          },
          {
            title: 'React Hooks',
            content: 'Deep dive into useState, useEffect, and custom hooks',
            order: 2,
            status: 'completed',
            estimatedHours: 15,
            actualHours: 17,
          },
          {
            title: 'Next.js Framework',
            content: 'Learn Next.js routing, API routes, and deployment',
            order: 3,
            status: 'in-progress',
            estimatedHours: 25,
            actualHours: 0,
          },
          {
            title: 'TypeScript Integration',
            content: 'Add type safety to React applications',
            order: 4,
            status: 'not-started',
            estimatedHours: 20,
            actualHours: 0,
          },
        ],
      },
      resources: {
        create: [
          {
            title: 'React Documentation',
            url: 'https://react.dev',
            type: 'link',
            description: 'Official React documentation',
          },
          {
            title: 'Next.js Documentation',
            url: 'https://nextjs.org/docs',
            type: 'link',
            description: 'Official Next.js documentation',
          },
          {
            title: 'Full Stack React',
            type: 'book',
            description: 'Comprehensive book on React development',
          },
        ],
      },
    },
  });

  const designProject = await prisma.learningProject.create({
    data: {
      title: 'UI/UX Design Principles',
      description: 'Master design fundamentals and create beautiful user interfaces',
      status: 'active',
      publishStatus: 'published',
      priority: 'medium',
      category: 'Design',
      progress: 60,
      estimatedHours: 60,
      actualHours: 36,
      sections: {
        create: [
          {
            title: 'Design Fundamentals',
            content: 'Learn color theory, typography, and layout principles',
            order: 1,
            status: 'completed',
            estimatedHours: 15,
            actualHours: 16,
          },
          {
            title: 'Figma Mastery',
            content: 'Learn to use Figma for designing interfaces',
            order: 2,
            status: 'completed',
            estimatedHours: 20,
            actualHours: 20,
          },
          {
            title: 'Component Systems',
            content: 'Create reusable design systems and components',
            order: 3,
            status: 'not-started',
            estimatedHours: 25,
            actualHours: 0,
          },
        ],
      },
      resources: {
        create: [
          {
            title: 'Figma',
            url: 'https://figma.com',
            type: 'link',
            description: 'Design tool for creating interfaces',
          },
          {
            title: 'Design System Handbook',
            url: 'https://designsystemsrepo.com/design-systems/',
            type: 'link',
            description: 'Resource for design systems',
          },
        ],
      },
    },
  });

  const pythonProject = await prisma.learningProject.create({
    data: {
      title: 'Python for Data Science',
      description: 'Learn Python, pandas, numpy, and machine learning basics',
      status: 'paused',
      publishStatus: 'published',
      priority: 'low',
      category: 'Programming',
      progress: 25,
      estimatedHours: 80,
      actualHours: 20,
      sections: {
        create: [
          {
            title: 'Python Basics',
            content: 'Variables, functions, control structures',
            order: 1,
            status: 'completed',
            estimatedHours: 15,
            actualHours: 20,
          },
          {
            title: 'Data Structures',
            content: 'Lists, dictionaries, sets, and tuples',
            order: 2,
            status: 'not-started',
            estimatedHours: 20,
            actualHours: 0,
          },
        ],
      },
    },
  });

  // Create some notes
  await prisma.note.create({
    data: {
      title: 'React Performance Tips',
      content: 'Remember to use React.memo, useMemo, and useCallback for performance optimization',
      type: 'important',
      projectId: reactProject.id,
    },
  });

  await prisma.note.create({
    data: {
      title: 'Design Inspiration',
      content: 'Great dashboard design on Dribbble: https://dribbble.com/shots/...',
      type: 'idea',
      projectId: designProject.id,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('📊 Created:');
  console.log('   - 3 Learning Projects');
  console.log('   - 7 Sections');
  console.log('   - 5 Resources');
  console.log('   - 2 Notes');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
