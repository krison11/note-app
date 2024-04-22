import Head from 'next/head'
import { useEffect, useState, useContext } from 'react'
import Notes from '@/components/Note/Notes'
import UserContext from '@/store/user-context'
import SearchText from '@/components/UI/SearchText'
import classes from '@/styles/Home.module.css'
import animate from '@/hooks/animate'
import { useRouter } from 'next/router'

export default function Home() {
	const router = useRouter()
	const userContext = useContext(UserContext)
	const [searching, setSearching] = useState(false)
	const [classname, setClassname] = useState('slide-left')
	const [filterdNotes, setFilteredNotes] = useState([])
	const notes = searching ? filterdNotes : userContext.user.notes

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem('user'))
		if (user) {
			userContext.userHandler(user)
			document.body.style.backgroundColor = userContext.bgColor
			document.body.style.color = userContext.color
			userContext.showNoteBtnHandler(true)
			const prevPath = sessionStorage.getItem('prevPath')

			if (prevPath === '/user') {
				setClassname('slide-right')
			}
			if (prevPath !== '/user' && prevPath !== '/') {
				setClassname('slide-left')
			}
			sessionStorage.setItem('prevPath', window.location.pathname)
			const id = sessionStorage.getItem('noteId')
			if (id) {
				console.log('id: ', id)
				animate(id).shrink('1s')
				setTimeout(() => {
					deleteNoteHandler(id)
					sessionStorage.removeItem('noteId')
				}, 1500)
			}
		} else {
			router.push('/login')
		}
	}, [])

	// delete from the home page
	function deleteNoteHandler(noteId) {
		const user = JSON.parse(sessionStorage.getItem('user'))
		const filterdNotes = user.notes.filter(note => note.id !== noteId)
		userContext.userHandler(user)
		user.notes = [...filterdNotes]
		sessionStorage.setItem('user', JSON.stringify(user))
	}

	// filter notes...
	function getInputHandler(input) {
		const filNotes = userContext.user.notes.filter(note => {
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
		if (userContext.user.notes.length > 1) {
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
