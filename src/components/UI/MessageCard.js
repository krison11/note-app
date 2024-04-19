import UserContext from '@/store/user-context'
import classes from './MessageCard.module.css'
import { useContext } from 'react'

export default function MessageCard({ title, text }) {
	const userContext = useContext(UserContext)

	return (
		<div
			className={classes.overlay}
			style={{ backgroundColor: userContext.bgColor, color: userContext.color }}
		>
			<div className={classes.innerblock}>
				<h1>{title}</h1>
				<p>{text}</p>
			</div>
		</div>
	)
}
