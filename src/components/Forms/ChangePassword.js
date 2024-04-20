import { useRef, useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import UserContext from '@/store/user-context'
import classes from './Form.module.css'
import Button from '../UI/Button'

export default function ChangePassword(props) {
	const oldPasswordRef = useRef()
	const newPasswordRef = useRef()
	const confirmNewPasswordRef = useRef()
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmNewPassword, setConfirmNewPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [errorClass, setErrorClass] = useState('')
	const router = useRouter()
	const userContext = useContext(UserContext)

	useEffect(() => {
		oldPasswordRef.current.focus()
		userContext.formInputIsValidHandler(true)
	}, [])

	function onChangeHandler(e) {
		e.target.id == 'old password' && setOldPassword(e.target.value)
		e.target.id == 'new password' && setNewPassword(e.target.value)
		e.target.id == 'confirm new password' &&
			setConfirmNewPassword(e.target.value)
		setErrorClass('')
		setErrorMessage('')
	}

	function submitHandler(e) {
		const user = JSON.parse(sessionStorage.getItem('user'))
		e.preventDefault()
		setErrorClass('error')
		if (oldPassword === '') {
			userContext.formInputIsValidHandler(false)
			oldPasswordRef.current.focus()
			setErrorClass('error')
			setErrorMessage('Please add your old password!')
		} else if (oldPassword !== user.password) {
			userContext.formInputIsValidHandler(false)
			oldPasswordRef.current.focus()
			setErrorClass('error')
			setErrorMessage('Incorrect password!')
		} else if (newPassword === '') {
			userContext.formInputIsValidHandler(false)
			newPasswordRef.current.focus()
			setErrorClass('error')
			setErrorMessage('Please add your new password!')
		} else if (newPassword === oldPassword) {
			userContext.formInputIsValidHandler(false)
			newPasswordRef.current.focus()
			setErrorClass('error')
			setErrorMessage('New password is the same as the old password!')
		} else if (confirmNewPassword === '') {
			userContext.formInputIsValidHandler(false)
			confirmNewPasswordRef.current.focus()
			setErrorClass('error')
			setErrorMessage('Please confirm your new password!')
		} else if (confirmNewPassword !== newPassword) {
			userContext.formInputIsValidHandler(false)
			confirmNewPasswordRef.current.focus()
			setErrorClass('error')
			setErrorMessage('Passwords do not match!')
		} else {
			userContext.loadingHandler(true)
			setErrorClass('')
			setErrorMessage('')
			props.onChangePassword(newPassword)
			userContext.formInputIsValidHandler(null)
		}
	}

	return (
		<>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.errormessage}>{errorMessage}</div>
				<div className={classes.innerblocks}>
					<label htmlFor='old password'>Old password</label>
					<input
						className={classes[errorClass]}
						ref={oldPasswordRef}
						type='password'
						id='old password'
						onChange={onChangeHandler}
						value={oldPassword}
						autoComplete='old password'
						required
						autoFocus
					/>
				</div>
				<div className={classes.innerblocks}>
					<label htmlFor='new password'>New password</label>
					<input
						className={classes[errorClass]}
						ref={newPasswordRef}
						type='password'
						id='new password'
						onChange={onChangeHandler}
						value={newPassword}
						autoComplete='new password'
						required
					/>
				</div>
				<div className={classes.innerblocks}>
					<label htmlFor='confirm new password'>Confirm new password</label>
					<input
						className={classes[errorClass]}
						ref={confirmNewPasswordRef}
						type='password'
						id='confirm new password'
						onChange={onChangeHandler}
						value={confirmNewPassword}
						autoComplete='confirm new password'
						required
					/>
				</div>
				<div className={classes.btn}>
					<Button color='#1baaec' type='submit'>
						Change password
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
