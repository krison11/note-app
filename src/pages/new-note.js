import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Head from 'next/head'
import UserContext from '@/store/user-context'
import NotePage from '@/components/Note/NotePage'

export default function NewTodoPage() {
	const router = useRouter() // controlling the path programatically..
	const userConext = useContext(UserContext)

	useEffect(() => {
		if (userConext.loading) {
			document.body.style.backgroundColor = 'black'
			document.body.style.color = userConext.color
		} else {
			document.body.style.backgroundColor = userConext.bgColor
			document.body.style.color = userConext.color
		}
	}, [])

	useEffect(() => {
		userConext.showNoteBtnHandler(false)
		if (userConext.loading) {
			document.body.style.backgroundColor = 'black'
			document.body.style.color = userConext.color
		} else {
			document.body.style.backgroundColor = userConext.bgColor
			document.body.style.color = userConext.color
		}
	}, [userConext.theme, userConext.loading])

	// useEffect(() => {
	// 	document.body.style.backgroundColor = userConext.bgColor
	// 	document.body.style.color = userConext.color
	// 	userConext.showNoteBtnHandler(false)
	// }, [])

	// useEffect(() => {
	// 	document.body.style.backgroundColor = userConext.bgColor
	// 	document.body.style.color = userConext.color
	// }, [userConext.theme])

	async function addNoteHandler(data) {
		// here we are getting hold of the api of our database to push the new todo data from the form in the database...
		const userId = sessionStorage.getItem('userId')
		userConext.loadingHandler(true)
		await fetch('./api/app-database', {
			method: 'POST',
			body: JSON.stringify({
				note: data.note,
				from: data.from,
				userId,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => {
				userConext.notesHandler(res.notes)
				userConext.loadingHandler(false)
				router.push('/')
			})
	}
	return (
		<>
			<Head>
				<title>New Note</title>
				<meta name='description' content={'Add new note page'} />
			</Head>
			<NotePage onSendData={addNoteHandler} />
		</>
	)
}
