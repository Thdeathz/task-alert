import TaskItem from '@/components/home/task-item'

const task = {
  id: '1',
  description: 'Task description',
  tag: '1',
  title: 'Task title',
  dueDate: '2022-01-01'
}

export default async function NotificationPage() {
  return (
    <section className="relative pb-6">
      <h1 className="sticky top-0 z-10 bg-[#f1f4f9] pb-4 pt-12 text-2xl font-semibold">Notifications</h1>

      <div className="space-y-2 px-2">
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
        <TaskItem task={task} />
      </div>
    </section>
  )
}
