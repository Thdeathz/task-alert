import TasksList from '@/components/home/tasks-list'
import { getAllTasks } from '@/server/actions/task'

export default async function Home() {
  const tasks = await getAllTasks()

  return (
    <section className="relative flex h-full w-full items-start justify-start gap-6">
      <TasksList tasks={tasks} />

      <div className="flex-center sticky top-6 min-h-content w-0 shrink grow rounded-md bg-white pt-6 shadow">
        <p className="text-lg font-medium opacity-30">Not available yet</p>
      </div>
    </section>
  )
}
