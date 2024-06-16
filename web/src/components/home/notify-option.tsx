'use client'

import React, { useState } from 'react'

import { NotifyOptionType } from '@/@types/task'

import { Checkbox } from '../ui/checkbox'

import NotifyOptionContent from './notify-option-content'

type Props = {
  notifyOption: NotifyOptionType[]
  notifyAt: {
    value: number
    unit: string
  }
}

type OptionItemProps = {
  form: Props
  setForm: React.Dispatch<React.SetStateAction<Props>>
  id: NotifyOptionType
  label: string
}

function OptionItem({ form, setForm, id, label }: OptionItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={form.notifyOption.includes(id)}
        id="APP"
        onChange={() => {
          setForm({
            ...form,
            notifyOption: form.notifyOption.includes(id)
              ? form.notifyOption.filter((item) => item !== id)
              : [...form.notifyOption, id]
          })
        }}
      />
      <label
        htmlFor="APP"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}

export default function NotifyOption({ notifyOption, notifyAt }: Props) {
  const [form, setForm] = useState<Props>({
    notifyOption,
    notifyAt
  })

  return <NotifyOptionContent form={form} setForm={setForm} />
}
