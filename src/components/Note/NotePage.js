import classes from './NotePage.module.css'
import UserContext from '@/store/user-context'
import { useRouter } from 'next/router'
import { useRef, useEffect, useState, useContext } from 'react'

export default function NotePage({ onSendData, currentNote }) {
	const router = useRouter()
	const userContext = useContext(UserContext)
	const noteRef = useRef()
	const [note, setNote] = useState('')
	const [classname, setClassname] = useState('slide-left')
	const [showDate, setSHowDate] = useState(true)
	const [showBtn, setSHowBtn] = useState(true)

	const dateClassName = showDate ? 'show-date' : 'hide-date'
	const date = new Date().toDateString()

	// slide page left or right and setting note value conditionally..
	useEffect(() => {
		const prevPath = sessionStorage.getItem('prevPath')
		const storedNote = sessionStorage.getItem('note')
		storedNote && setNote(storedNote)

		if (router.pathname === '/new-note') {
			noteRef.current.focus()

			if (prevPath !== '/new-note') {
				prevPath === '/user'
					? setClassname('slide-right')
					: setClassname('slide-left')
			}
		} else {
			if (currentNote) {
				setSHowBtn(false)
				const note = currentNote.title + '\n' + currentNote.text
				setNote(note)
			}
			setClassname('slide-right')
		}
		sessionStorage.setItem('prevPath', router.pathname)
	}, [])

	function pasteHandler(e) {}

	function onChangeHandler(e) {
		setNote(e.target.value)
		setSHowBtn(true)
		sessionStorage.setItem('note', e.target.value)
	}

	function submitHandler(e) {
		let data
		if (e.target.name === 'add') {
			const splitedNote = note.split('\n')
			const title = splitedNote[0]
			const text = splitedNote.slice(1).join('\n')
			data = {
				note: {
					id: Date.now().toString(),
					date,
					title,
					text,
				},
				from: 'add-note',
			}
		}
		if (e.target.name === 'delete') {
			sessionStorage.setItem('noteId', currentNote.id)
			router.push('/')
			return
		}
		if (e.target.name === 'save') {
			const splitedNote = note.split('\n')
			const title = splitedNote[0]
			const text = splitedNote.slice(1).join('\n')
			data = {
				note: {
					id: currentNote.id,
					date,
					title,
					text,
				},
				from: 'save-note',
			}
		}
		onSendData(data)
		setNote('')
		sessionStorage.removeItem('note')
	}

	let button
	if (currentNote) {
		if (note.trim() === '') {
			button = (
				<button
					name='delete'
					className={classes.deletebtn}
					onClick={submitHandler}
				>
					Delete
				</button>
			)
		} else {
			button = (
				<button name='save' className={classes.savebtn} onClick={submitHandler}>
					Save
				</button>
			)
		}
	} else {
		if (note.trim() !== '') {
			button = (
				<button name='add' className={classes.addbtn} onClick={submitHandler}>
					Add
				</button>
			)
		}
	}

	return (
		<div className={`${classes[classname]} ${classes.container}`}>
			<p className={`${classes[dateClassName]} ${classes.date}`}>{date}</p>
			{showBtn && button}
			<textarea
				style={{
					backgroundColor: userContext.textAreaBgColor,
					color: userContext.color,
				}}
				ref={noteRef}
				type='text'
				id='note'
				onChange={onChangeHandler}
				onPaste={pasteHandler}
				value={note}
				onScroll={e => {
					e.target.scrollTop < 50 && setSHowDate(true)
					e.target.scrollTop > 50 && setSHowDate(false)
				}}
			/>
		</div>
	)
}
