import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect, useState, useContext } from 'react'
import NotePage from '@/components/Note/NotePage'
import UserContext from '@/store/user-context'

export default function pages() {
	const userConext = useContext(UserContext)
	const router = useRouter()

	const note = userConext.user.notes.filter(
		note => note.id === router.query.pageId
	)[0]

	useEffect(() => {
		document.body.style.backgroundColor = userConext.bgColor
		document.body.style.color = userConext.color
		userConext.showNoteBtnHandler(true)
	}, [])

	useEffect(() => {
		document.body.style.backgroundColor = userConext.bgColor
		document.body.style.color = userConext.color
	}, [userConext.user.theme])

	useEffect(() => {
		const pageId = String(router.query.pageId)
		if (pageId.length < 9 || pageId.length > 13) {
			!note && router.back()
		}
	}, [router.query.pageId])

	function sendData(data) {
		const user = JSON.parse(sessionStorage.getItem('user'))
		const filterdNotes = user.notes.filter(note => note.id !== data.note.id)
		if ((data.from = 'save-note')) {
			const notes = [data.note, ...filterdNotes]
			user.notes = notes
			sessionStorage.setItem('user', JSON.stringify(user))
			userConext.userHandler(user)
			router.push('/')
		}
	}

	return (
		<>
			{note && (
				<>
					<Head>
						<title>{note.title}</title>
						<meta name='description' content={note.text} />
					</Head>
					<NotePage onSendData={sendData} currentNote={note} />
				</>
			)}
		</>
	)
}
