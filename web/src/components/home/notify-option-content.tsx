/* eslint-disable radix */

'use client'

import React from 'react'

import { INotifyOption, NotifyOptionType } from '@/@types/task'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Checkbox } from '../ui/checkbox'

type Props = {
  form: INotifyOption
  setForm: React.Dispatch<React.SetStateAction<INotifyOption>>
}

type OptionItemProps = {
  form: INotifyOption
  setForm: React.Dispatch<React.SetStateAction<INotifyOption>>
  id: NotifyOptionType
  label: string
  disabled?: boolean
}

function OptionItem({ form, setForm, id, label, disabled = false }: OptionItemProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={form.notifyOption.includes(id)}
        id={id}
        onCheckedChange={(state) => {
          if (state && form.notifyOption.find((item) => item === id)) return

          setForm({
            ...form,
            notifyOption: form.notifyOption.includes(id)
              ? form.notifyOption.filter((item) => item !== id)
              : [...form.notifyOption, id]
          })
        }}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}

export default function NotifyOptionContent({ form, setForm }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-slate-500">Notification option</p>

      <div className="flex items-center justify-between">
        <OptionItem form={form} setForm={setForm} id="APP" label="App notification" />

        <OptionItem form={form} setForm={setForm} id="EMAIL" label="Email" />

        <OptionItem form={form} setForm={setForm} id="SMS" label="SMS" />
      </div>

      <div className="grid w-2/3 grid-cols-2 gap-4">
        <Input
          type="number"
          value={form.notifyAt.value ?? 0}
          onChange={(e) => {
            setForm({
              ...form,
              notifyAt: {
                ...form.notifyAt,
                value: e.target.value ? parseInt(e.target.value) : 0
              }
            })
          }}
        />

        <Select
          defaultValue={form.notifyAt.unit}
          onValueChange={(value) =>
            setForm({
              ...form,
              notifyAt: {
                ...form.notifyAt,
                unit: value
              }
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Range time" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Range time</SelectLabel>
              <SelectItem value="m">Minutes</SelectItem>
              <SelectItem value="h">Hour</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
