import UserContext from '@/store/user-context'
import { useContext, useState, useEffect } from 'react'
import Modal from '@/components/UI/Modal'
import LoginForm from '@/components/Forms/LoginForm'
import classes from '@/styles/Home.module.css'
import { SlNote } from 'react-icons/sl'

export default function login() {
	const userContext = useContext(UserContext)

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [userContext.theme])

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
		if (!userContext.aimationFinished) {
			const timmer = setTimeout(() => {
				userContext.animationFinishedHandler(true)
				// sessionStorage.setItem('show-modal', true)
			}, 4500)

			return () => {
				clearTimeout(timmer)
			}
		}
	}, [])

	// login...
	async function loginHandler(formData) {
		userContext.loginHandler(formData)
	}

	return (
		<>
			{userContext.aimationFinished ? (
				<div className={classes.modalContainer}>
					<Modal title={'Login'}>
						<LoginForm onLogin={loginHandler} />
					</Modal>
				</div>
			) : (
				<div className={classes.login}>
					<div className={classes.contentContainer}>
						<div className={classes.letterContainer}>
							<span className={classes.one}>N</span>
							<span className={classes.two}>o</span>
							<span className={classes.three}>t</span>
							<span className={classes.four}>e</span>
							<span className={classes.five}>s</span>
							<span className={classes.six}>.</span>
						</div>
						<div className={classes.iconBlock}>
							<SlNote className={classes.icon} />
						</div>
					</div>
				</div>
			)}
		</>
	)
}
