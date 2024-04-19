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
	}, [userContext.theme, userContext.loading])

	async function logoutHandler() {
		userContext.loadingHandler(true)
		const userId = sessionStorage.getItem('userId')
		await fetch('../api/app-database', {
			method: 'POST',
			body: JSON.stringify({
				newTheme: userContext.theme,
				userId,
				from: 'change-theme',
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
		await fetch('../api/upload-image', {
			method: 'POST',
			body: data,
		})
			.then(res => res.json())
			.then(res => {
				console.log('message: ', res.message)
				// console.log('fileName: ', res.fileName)
				// console.log('filePath: ', res.filePath)
				// sessionStorage.setItem('image', data)
				// userContext.imageHandler(data)
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
