import NotifyTasksList from '@/components/home/notify-tasks-list'

export default async function NotificationPage() {
  return (
    <section className="relative pb-6">
      <h1 className="sticky top-0 z-10 bg-[#f1f4f9] pb-4 pt-12 text-2xl font-semibold">Notifications</h1>

      <div className="space-y-2 px-2">
        <NotifyTasksList />
      </div>
    </section>
  )
}
