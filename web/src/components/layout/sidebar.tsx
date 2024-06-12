import { FaRegBell } from 'react-icons/fa6'
import { FiHome } from 'react-icons/fi'
import { IoSettingsOutline } from 'react-icons/io5'
import { MdLogout } from 'react-icons/md'

import SideLink from './side-link'

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen flex-col items-center justify-between bg-white px-1.5 py-8 shadow-md">
      <div className="flex flex-col items-center justify-start gap-4">
        <SideLink to="/notification" icon={<FaRegBell />} />

        <SideLink to="/" icon={<FiHome />} />

        <SideLink to="/settings" icon={<IoSettingsOutline />} />
      </div>

      <SideLink to="/logout" icon={<MdLogout />} />
    </aside>
  )
}
