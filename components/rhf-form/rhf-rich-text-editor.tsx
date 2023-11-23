'use client'

import React from 'react'
import {
  Controller,
  useFormContext,
  Control,
  FieldValues,
} from 'react-hook-form'
import RadioGroup from '../radio-group'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { SlashCommand } from './tiptap/slash-command'
import CharacterCount from '@tiptap/extension-character-count'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import MenuBar from './tiptap/menu-bar'

type RhfRichTextEditorProps = {
  label?: string
  name: string
  defaultValue?: string
  rules?: any
  props?: any
  inputClass?: string
  placeHolder?: string
}

const RhfRichTextEditor: React.FC<RhfRichTextEditorProps> = ({
  label,
  name,
  defaultValue,
  rules,
  props,
  inputClass,
  placeHolder,
  ...rest
}) => {
  const { control } = useFormContext()

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <Controller
      name={name}
      control={control as Control<FieldValues>}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, value }, fieldState }) => (
        <div className="">
          {editor && <MenuBar editor={editor} />}
          <EditorContent editor={editor} />
          {/* <div className={`${radioGroupClass} `}>
            <RadioGroup
              inputClass={inputClass}
              name={name}
              options={options}
              value={value}
              onChange={onChange}
            />
          </div> */}
          {fieldState.error && (
            <p className="text-red-500 mt-2 text-xs">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  )
}

export default RhfRichTextEditor
