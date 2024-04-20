import RegisterForm from '@/components/Forms/RegisterForm'
import UserContext from '@/store/user-context'
import { useContext, useEffect } from 'react'
import Modal from '@/components/UI/Modal'
import classes from '@/styles/Home.module.css'

export default function login() {
	const userContext = useContext(UserContext)

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [])

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [userContext.theme])

	// register ...
	async function registerHandler(formData) {
		userContext.loginHandler(formData)
	}

	return (
		<>
			<div className={classes.modalContainer}>
				<Modal title={'Register'}>
					<RegisterForm onRegister={registerHandler} />
				</Modal>
			</div>
		</>
	)
}
