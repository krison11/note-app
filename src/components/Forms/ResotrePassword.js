import Button from '../UI/Button'
import classes from './Form.module.css'
import { useRef, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import UserContext from '@/store/user-context'

export default function RestorePassword({ onSendEmail }) {
	const userConext = useContext(UserContext)
	const deleteRef = useRef()
	const router = useRouter()
	const [inputValue, setInputValue] = useState('')
	const [errorClass, setErrorClass] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		deleteRef.current.focus()
		userConext.formInputIsValidHandler(true)
	}, [])

	function deleAccountHandler(e) {
		e.preventDefault()
		const attemptedEmail = sessionStorage.getItem('attemptedEmail')
		if (inputValue !== attemptedEmail) {
			setErrorClass('error')
			setErrorMessage('Wrong email!')
			deleteRef.current.focus()
			userConext.formInputIsValidHandler(false)
		} else {
			userConext.formInputIsValidHandler(null)
			onSendEmail(inputValue)
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
					<label htmlFor='email'>Email</label>
					<input
						className={classes[errorClass]}
						ref={deleteRef}
						type='email'
						id='email'
						onChange={onChangeHandler}
						value={inputValue}
						autoComplete='email'
						required
						autoFocus
					/>
				</div>
				<div className={classes.btn}>
					<Button color='#0095ff' type='submit'>
						Send
					</Button>
				</div>
			</form>
			<div className={classes.btn}>
				<Button
					color='grey'
					type='button'
					onClick={() => {
						router.push('/login')
					}}
				>
					Cancel
				</Button>
			</div>
		</>
	)
}
