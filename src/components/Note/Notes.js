import classes from './Notes.module.css'
import Note from './Note'
import { useContext } from 'react'
import UserContext from '@/store/user-context'

export default function Todos({ notes, onDelete, searching }) {
	const context = useContext(UserContext)

	const messageClassName = searching ? 'not-found' : 'no-notes'
	const message = searching
		? 'Nothing found!'
		: `Wellcome ${context.user.username} add your first note...`

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
