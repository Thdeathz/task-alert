import { FiPlusCircle } from 'react-icons/fi'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import CreateTaskForm from './create-task-form'

export default function CreateTaskModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <FiPlusCircle className="cursor-pointer text-2xl transition-all duration-150 active:scale-95" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
          <DialogDescription>Add new tasks, manage it, make life easier </DialogDescription>
        </DialogHeader>

        <CreateTaskForm />
      </DialogContent>
    </Dialog>
  )
}
