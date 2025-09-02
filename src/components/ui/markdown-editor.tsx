'use client'

import { 
  MDXEditor, 
  headingsPlugin, 
  listsPlugin, 
  quotePlugin, 
  thematicBreakPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  frontmatterPlugin,
  directivesPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  BlockTypeSelect,
  Separator
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import './markdown-editor.css'
import '@mdxeditor/editor/style.css'
import './markdown-editor.css'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  height?: number
  className?: string
}

export function MarkdownEditor({ 
  value, 
  onChange, 
  placeholder = 'Start writing...', 
  height = 400,
  className = ''
}: MarkdownEditorProps) {
  return (
    <div 
      className={`markdown-editor-wrapper ${className}`}
      style={{ height: `${height}px`, maxHeight: `${height}px` }}
    >
      <MDXEditor
        markdown={value}
        onChange={onChange}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: 'javascript' }),
          codeMirrorPlugin({ 
            codeBlockLanguages: { 
              js: 'JavaScript', 
              ts: 'TypeScript',
              tsx: 'TypeScript React',
              jsx: 'JavaScript React',
              css: 'CSS', 
              html: 'HTML',
              python: 'Python',
              bash: 'Bash',
              sql: 'SQL',
              json: 'JSON',
              yaml: 'YAML',
              markdown: 'Markdown'
            } 
          }),
          frontmatterPlugin(),
          directivesPlugin(),
          diffSourcePlugin({ viewMode: 'source', diffMarkdown: '' }),
          toolbarPlugin({
            toolbarContents: () => (
              <div className="flex items-center gap-2 p-2 border-b bg-gray-50">
                <UndoRedo />
                <Separator />
                <BoldItalicUnderlineToggles />
                <CodeToggle />
                <Separator />
                <BlockTypeSelect />
                <Separator />
                <ListsToggle />
                <Separator />
                <CreateLink />
                <InsertImage />
                <InsertTable />
                <InsertThematicBreak />
              </div>
            )
          })
        ]}
        contentEditableClassName={`prose prose-blue max-w-none p-4 focus:outline-none overflow-y-auto`}
        placeholder={placeholder}
      />
    </div>
  )
}
