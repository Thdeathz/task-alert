import SettingForm from '@/components/home/setting-form'
import { Separator } from '@/components/ui/separator'
import { getCurrentUser } from '@/server/actions/user'

export default async function SettingsPage() {
  const user = await getCurrentUser()

  return (
    <section className="pt-12">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <h5 className="text-[#64748B]">Manage your account settings and set e-mail preferences.</h5>

      <Separator className="my-6" />

      <div className="flex w-2/3 items-start justify-start gap-4">
        <div className="w-[20rem] space-y-4">
          <div className="font-medium">Profile</div>
          <div className="w-full rounded-md bg-[#cbd4e1] px-3 py-2 font-medium">Notifications</div>
        </div>

        <div className="w-0 shrink grow">
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <h5 className="text-[#64748B]">Configure how you receive notifications.</h5>

          <Separator className="my-3" />

          <SettingForm user={user} />
        </div>
      </div>
    </section>
  )
}
