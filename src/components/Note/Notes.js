import classes from './Notes.module.css'
import Note from './Note'
import { useEffect, useState } from 'react'

export default function Todos({ notes, onDelete, searching }) {
	const [message, setMessage] = useState('')

	const messageClassName = searching ? 'not-found' : 'no-notes'

	useEffect(() => {
		if (searching) {
			setMessage('Nothing found!')
		} else {
			const timer = setTimeout(() => {
				setMessage('Start adding your notes...')
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
					<p className={classes[messageClassName]}>{message}</p>
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
