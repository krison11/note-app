import ChangePassword from '@/components/Forms/ChangePassword'
import Head from 'next/head'
import Modal from '@/components/UI/Modal'
import MessageCard from '@/components/UI/MessageCard'
import { useState, useContext, useEffect } from 'react'
import UserContext from '@/store/user-context'
import { useRouter } from 'next/router'

export default function ChangePasswordPage() {
	const router = useRouter()
	const userCtx = useContext(UserContext)
	const [show, setShow] = useState(false)

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [])

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [userCtx.theme])

	async function changePasswordHandler(newPassword) {
		userCtx.loadingHandler(true)
		const userId = sessionStorage.getItem('userId')
		await fetch('../api/app-database', {
			method: 'POST',
			body: JSON.stringify({
				newPassword,
				userId,
				from: 'change-password',
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => {
				userCtx.loadingHandler(false)
				setShow(true)
				userCtx.passwordHandler(res.newPassword)
				sessionStorage.setItem('password', res.newPassword)
				const timer = setTimeout(() => {
					router.push('/user')
				}, 2000)
				return () => {
					clearTimeout(timer)
				}
			})
	}

	return (
		<>
			<Head>
				<title>Change password</title>
				<meta name='description' content={'Change password page'} />
			</Head>
			{show ? (
				<MessageCard title={'✅'} text={'You have changed you password.'} />
			) : (
				<Modal title={'Change Password'}>
					<ChangePassword onChangePassword={changePasswordHandler} />
				</Modal>
			)}
		</>
	)
}
