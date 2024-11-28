import { FcDatabase } from "react-icons/fc"
import { DASHBOARD_SIDEBAR_LINKS } from "../lib/consts/navigation"
import { Link } from "react-router-dom"
import { SidebarLinkType } from "../types"

const linkClass =
	'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base'

const Sidebar = () => {
  return (
    <div className="bg-neutral-900 w-60 p-3 flex flex-col text-white">
      <div className="flex items-center gap-2 px-1 py-3">
        <FcDatabase fontSize={24}/>
        <span className="text-neutral-100 text-lg">Popa UI</span>
      </div>
      <div className="flex-1">
        {DASHBOARD_SIDEBAR_LINKS.map((item)=>(
            <SidebarLink key={item.key} item={item}/>
        ))}
      </div>
      <div>Bottom Part</div>
    </div>
  )
}

function SidebarLink({item} : { item: SidebarLinkType }){
    return(
        <Link to={item.path} className={linkClass}>
            <span className="text-xl">{item.icon}</span>
            {item.label}
        </Link>
    )
}

export default Sidebar
