import { useContext, useEffect } from 'react'
import classes from './Modal.module.css'
import UserContext from '@/store/user-context'

export default function Modal({ title, children }) {
	let classname = 'modal'
	const userConext = useContext(UserContext)

	if (userConext.formInputIsValid) {
		classname = 'slide-modal'
	}
	if (!userConext.formInputIsValid) {
		classname = 'tremble-modal'
	}

	if (userConext.formInputIsValid === null) {
		classname = 'modal'
	}

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [])

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [userConext.theme])

	return (
		<>
			<div className={classes.backdrop}>
				<div className={`${classes[classname]}`}>
					<h2 className={classes.title}>{title}</h2>
					<div className={classes.content}>{children}</div>
				</div>
			</div>
			<div
				className={classes.bgCover}
				style={{ backgroundColor: userConext.bgColor }}
			></div>
		</>
	)
}
