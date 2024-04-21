import classes from './Notes.module.css'
import Note from './Note'
import { useContext, useEffect, useState } from 'react'
import UserContext from '@/store/user-context'
import { IoPencilOutline } from 'react-icons/io5'

export default function Todos({ notes, onDelete, searching }) {
	const [message, setMessage] = useState('')
	const [pen, setPen] = useState('')
	const context = useContext(UserContext)

	const messageClassName = searching ? 'not-found' : 'no-notes'
	useEffect(() => {
		if (searching) {
			setMessage('Nothing found!')
		} else {
			const timer = setTimeout(() => {
				setMessage(`Wellcome ${context.user.username}  add your first note... `)
				setPen(<IoPencilOutline />)
			}, 1500)

			return () => {
				clearTimeout(timer)
			}
		}
	}, [searching])

	function deleteHandler(noteId) {
		onDelete(noteId)
	}

	return (
		<div className={classes.container}>
			{notes.length === 0 ? (
				<div className={classes['empty-div']}>
					<p className={classes[messageClassName]}>
						{message}
						{pen}
					</p>
				</div>
			) : (
				notes.map(note => {
					return (
						<Note
							key={note.id}
							id={note.id}
							date={note.date}
							title={note.title}
							text={note.text}
							onDelete={deleteHandler}
						/>
					)
				})
			)}
		</div>
	)
}
