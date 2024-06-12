export type NotifyOptionType = 'EMAIL' | 'SMS' | 'APP'

export interface ITask {
  id: string
  title: string
  description: string
  dueDate: string
  tag: string
}

export interface INotifyOption {
  notifyOption: NotifyOptionType[]
  notifyAt: {
    unit: string
    value: number
  }
}

export interface ITaskDetail extends ITask, INotifyOption {
  notifyOption: NotifyOptionType[]
  notifyAt: {
    unit: string
    value: number
  }
}
