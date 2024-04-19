import { useRouter } from 'next/router'
import Head from 'next/head'
import { useContext, useEffect } from 'react'
import UserContext from '@/store/user-context'
import NotePage from '@/components/Note/NotePage'

export default function pages() {
	const userConext = useContext(UserContext)
	const router = useRouter()

	const note = userConext.notes.filter(
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
	}, [userConext.theme])

	// get todos if page reloaded...
	useEffect(() => {
		const userId = sessionStorage.getItem('userId')
		fetch('./api/app-database', {
			method: 'POST',
			body: JSON.stringify({
				userId,
				from: 'get-notes',
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => {
				userConext.notesHandler(res.notes)
			})
	}, [])

	useEffect(() => {
		const pageId = String(router.query.pageId)
		if (pageId.length < 9 || pageId.length > 13) {
			!note && router.back()
		}
	}, [router.query.pageId])

	async function sendData(data) {
		const userId = sessionStorage.getItem('userId')
		if (data.from !== 'delete-note') {
			userConext.loadingHandler(true)
		}
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
				if (data.from !== 'delete-note') {
					userConext.loadingHandler(false)
					router.push('/')
				}
			})
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
