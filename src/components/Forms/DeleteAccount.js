import Button from '../UI/Button'
import classes from './Form.module.css'
import { useRef, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import UserContext from '@/store/user-context'

export default function DeleteAccount({ onDeleteUser }) {
	const deleteRef = useRef()
	const router = useRouter()
	const userContext = useContext(UserContext)
	const [inputValue, setInputValue] = useState('')
	const [errorClass, setErrorClass] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		deleteRef.current.focus()
		userContext.formInputIsValidHandler(true)
	}, [])

	function deleAccountHandler(e) {
		e.preventDefault()
		if (inputValue.toLowerCase() !== 'delete') {
			userContext.formInputIsValidHandler(false)
			setErrorClass('error')
			setErrorMessage('Type `delete` to delete the account!')
			deleteRef.current.focus()
		} else {
			userContext.formInputIsValidHandler(null)
			onDeleteUser()
		}
	}

	function onChangeHandler(e) {
		setInputValue(e.target.value)
		setErrorClass('')
		setErrorMessage('')
	}

	return (
		<>
			<form className={classes.form} onSubmit={deleAccountHandler}>
				<div className={classes.errormessage}>{errorMessage}</div>
				<div className={classes.innerblocks}>
					<label htmlFor='dele account'>Type 'delete'</label>
					<input
						className={classes[errorClass]}
						ref={deleteRef}
						type='text'
						id='dele account'
						onChange={onChangeHandler}
						value={inputValue}
						autoComplete='dele account'
						required
						autoFocus
					/>
				</div>
				<div className={classes.btn}>
					<Button color='#fe0000' type='submit'>
						Delete account
					</Button>
				</div>
			</form>
			<div className={classes.btn}>
				<Button
					color='grey'
					onClick={() => {
						router.back()
					}}
				>
					Cancel
				</Button>
			</div>
		</>
	)
}
