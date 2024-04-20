import DeleteAccount from '@/components/Forms/DeleteAccount'
import Head from 'next/head'
import UserContext from '@/store/user-context'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MessageCard from '@/components/UI/MessageCard'
import Modal from '@/components/UI/Modal'

export default function DeleteAccountPage() {
	const userContext = useContext(UserContext)
	const router = useRouter()
	const [show, setShow] = useState(false)

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [])

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [userContext.user])

	// delte from the home page
	async function deleteUserHandler() {
		userContext.loadingHandler(true)
		const user = JSON.parse(sessionStorage.getItem('user'))
		await fetch('../api/app-database', {
			method: 'POST',
			body: JSON.stringify({
				userId: user._id,
				from: 'delete-user',
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(() => {
				userContext.loadingHandler(false)
				setShow(true)
				const timer = setTimeout(() => {
					sessionStorage.clear()
					router.push('/login')
				}, 2000)
				return () => {
					clearTimeout(timer)
				}
			})
	}

	return (
		<>
			<Head>
				<title>Delete account </title>
				<meta name='description' content={'Delete account page'} />
			</Head>
			{show ? (
				<MessageCard title={'✅'} text={'Your account is now deleted.'} />
			) : (
				<Modal title={'Delete Account'}>
					<DeleteAccount onDeleteUser={deleteUserHandler} />
				</Modal>
			)}
		</>
	)
}
