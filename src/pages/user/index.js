import User from '@/components/UserPage/User'
import Head from 'next/head'
import UserContext from '@/store/user-context'
import { useContext, useEffect } from 'react'

export default function UserPage() {
	const userContext = useContext(UserContext)

	useEffect(() => {
		document.body.style.backgroundColor = userContext.bgColor
	}, [])

	useEffect(() => {
		if (userContext.loading) {
			document.body.style.backgroundColor = 'black'
		} else {
			document.body.style.backgroundColor = userContext.bgColor
		}
	}, [userContext.user, userContext.loading])

	async function logoutHandler() {
		const user = JSON.parse(sessionStorage.getItem('user'))
		console.log('user before: ', user)
		userContext.loadingHandler(true)
		await fetch('../api/app-database', {
			method: 'POST',
			body: JSON.stringify({
				user,
				from: 'logout',
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => {
				userContext.loadingHandler(false)
				userContext.logoutHandler()
			})
	}

	async function addImageHandler(data) {
		console.log('data before: ', data)
		await fetch('../api/upload-image', {
			method: 'POST',
			body: data,
		})
			.then(res => res.json())
			.then(res => {
				console.log('image response: ', res)
				const user = JSON.parse(sessionStorage.getItem('user'))
				user.image = res.fileName
				sessionStorage.setItem('user', JSON.stringify(user))
				const timmer = setTimeout(() => {
					userContext.userHandler(user)
				}, 5000)
				return () => {
					clearTimeout(timmer)
				}
			})
			.catch(error => console.error(error))
	}

	return (
		<>
			<Head>
				<title>User</title>
				<meta name='description' content={'User info page'} />
			</Head>
			<User onAddImage={addImageHandler} onLogout={logoutHandler} />
		</>
	)
}
