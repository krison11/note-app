import Head from 'next/head'
import { useEffect, useState, useContext } from 'react'
import Notes from '@/components/Note/Notes'
import UserContext from '@/store/user-context'
import SearchText from '@/components/UI/SearchText'
import classes from '@/styles/Home.module.css'
import animate from '@/hooks/animate'

export default function Home() {
	const userContext = useContext(UserContext)
	const [searching, setSearching] = useState(false)
	const [classname, setClassname] = useState('slide-left')
	const [filterdNotes, setFilteredNotes] = useState([])
	const notes = searching ? filterdNotes : userContext.notes

	useEffect(() => {
		document.body.style.backgroundColor = userContext.bgColor
		document.body.style.color = userContext.color
	}, [userContext.theme])

	useEffect(() => {
		document.body.style.backgroundColor = userContext.bgColor
		document.body.style.color = userContext.color
		userContext.showNoteBtnHandler(true)
		const prevPath = sessionStorage.getItem('prevPath')
		console.log('prev path: ', prevPath)

		if (prevPath === '/user') {
			setClassname('slide-right')
		}
		if (prevPath !== '/user' && prevPath !== '/') {
			setClassname('slide-left')
		}
		sessionStorage.setItem('prevPath', window.location.pathname)

		const id = sessionStorage.getItem('noteId')
		if (id) {
			animate(id).shrink('1s')
		}
	}, [])

	// get notes..
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
				setSearching(false)
				userContext.notesHandler(res.notes)
				// console.log(res.notes)
			})
	}, [])

	// delete from the home page
	async function deleteNoteHandler(noteId) {
		console.log('id: ', noteId)
		const userId = sessionStorage.getItem('userId')
		// userContext.loadingHandler(true)
		await fetch('./api/app-database', {
			method: 'POST',
			body: JSON.stringify({
				note: { id: noteId },
				from: 'delete-note',
				userId,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => {
				// userContext.loadingHandler(false)
				userContext.notesHandler(res.notes)
				userContext.clearSearchHandler(true)
				setSearching(false)
			})
	}

	// filter notes...
	function getInputHandler(input) {
		const filNotes = userContext.notes.filter(note => {
			if (
				note.title.toLowerCase().includes(input.toLowerCase()) ||
				note.text.toLowerCase().includes(input.toLowerCase())
			) {
				return note
			}
		})
		setFilteredNotes(filNotes)
		input ? setSearching(true) : setSearching(false)
	}

	function barBehaviourHandler(e) {
		if (userContext.notes.length > 1) {
			e.target.scrollTop < 50 &&
				animate('search-bar').show('0.7s ease-out', '0s')
			e.target.scrollTop > 50 && animate('search-bar').hide('0.5s ease', '0s')
		}
	}

	return (
		<>
			<Head>
				<title>Notes</title>
			</Head>
			<div
				className={classes[classname]}
				style={{
					color: userContext.color,
					backgroundColor: userContext.bgColor,
				}}
				onScroll={barBehaviourHandler}
			>
				<SearchText onGetInput={getInputHandler} />
				<Notes
					notes={notes}
					onDelete={deleteNoteHandler}
					searching={searching}
				/>
			</div>
		</>
	)
}
