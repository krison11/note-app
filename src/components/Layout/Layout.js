import UserContext from '@/store/user-context'
import MainNavigation from './MainNavigation'
import { useContext } from 'react'

export default function Layout(props) {
	const userContext = useContext(UserContext)

	return (
		<div>
			<MainNavigation />
			<div
				style={{
					backgroundColor: userContext.bgColor,
					color: userContext.color,
				}}
			>
				{props.children}
			</div>
		</div>
	)
}
