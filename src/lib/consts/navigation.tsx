import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

import { SidebarLinkType } from '../../types'

export const DASHBOARD_SIDEBAR_LINKS : SidebarLinkType[] = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'device-selector',
		label: 'Device Selector',
		path: '/device-selector',
		icon: <HiOutlineCube />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]