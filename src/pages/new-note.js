import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import Head from 'next/head'
import UserContext from '@/store/user-context'
import NotePage from '@/components/Note/NotePage'

export default function NewTodoPage() {
	const router = useRouter() // controlling the path programatically..
	const userConext = useContext(UserContext)

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem('user'))
		!user && router.push('/login')
		document.body.style.backgroundColor = userConext.bgColor
		document.body.style.color = userConext.color
	}, [])

	useEffect(() => {
		document.body.style.backgroundColor = userConext.bgColor
		document.body.style.color = userConext.color
	}, [userConext.theme])

	function addNoteHandler(data) {
		const user = JSON.parse(sessionStorage.getItem('user'))
		const notes = [data.note, ...user.notes]
		user.notes = notes
		userConext.userHandler(user)
		sessionStorage.setItem('user', JSON.stringify(user))
		router.push('/')
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
