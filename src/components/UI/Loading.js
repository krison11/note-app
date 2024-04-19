import classes from './Loading.module.css'
import UserContext from '@/store/user-context'
import { useContext, useEffect } from 'react'
import { VscLoading } from 'react-icons/vsc'

export default function Loading(props) {
	const userConext = useContext(UserContext)

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [])

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [userConext.theme])

	return (
		<>
			{userConext.loading && (
				<div className={classes.loadingContainer}>
					<VscLoading className={classes.icon} />
					<div className={classes.loadingText}>{props.text}</div>
				</div>
			)}
		</>
	)
}
