import UserContext from '@/store/user-context'
import classes from './SearchText.module.css'
import { useEffect, useState, useRef, useContext } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import animate from '@/hooks/animate'

export default function SearchText({ onGetInput, showBar }) {
	const userContext = useContext(UserContext)
	const inputRef = useRef()
	const [input, setInput] = useState('')

	useEffect(() => {
		if (userContext.user.notes.length > 1) {
			if (
				userContext.user.notes.length === 2 &&
				!userContext.animationFinished
			) {
				animate('search-bar').show('0.7s ease-out', '1s')
				setTimeout(() => {
					userContext.animationFinishedHandler(true)
				}, 0)
			} else {
				animate('search-bar').show('0s', '0s')
			}
		} else {
			animate('search-bar').hide('0.3s ease-out', '0s')
			userContext.animationFinishedHandler(false)
		}
	}, [userContext.user.notes])

	useEffect(() => {
		if (userContext.clearSearch) {
			setInput('')
			onGetInput('')
		}
	}, [userContext.clearSearch])

	function onChangeHandler(e) {
		setInput(e.target.value)
		onGetInput(e.target.value)
	}

	return (
		<div id='search-bar' className={`${classes.bar}`}>
			<div className={classes.innerBlock}>
				<div
					className={classes.icon}
					onClick={() => {
						inputRef.current.focus()
					}}
				>
					<IoSearchOutline />
				</div>
				<input
					ref={inputRef}
					type='text'
					onChange={onChangeHandler}
					value={input}
					name='text'
					placeholder=' Search...'
					onFocus={() => {
						userContext.clearSearchHandler(false)
					}}
				/>
			</div>
		</div>
	)
}
