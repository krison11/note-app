import { useState, useRef, useEffect, useContext } from 'react'
import classes from './Form.module.css'
import Button from '../UI/Button'
import UserContext from '@/store/user-context'
import { useRouter } from 'next/router'

export default function RegisterForm(props) {
	const router = useRouter()
	const userConext = useContext(UserContext)
	const userNameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const confirmEmailRef = useRef()
	const confirmPasswordRef = useRef()

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [confirmEmail, setConfirmEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [errorClass, setErrorClass] = useState('')

	useEffect(() => {
		userNameRef.current.focus()
		userConext.formInputIsValidHandler(true)
	}, [])

	useEffect(() => {
		if (userConext.responseMessage === 'user exists') {
			emailRef.current.focus()
			setErrorClass('error')
			setErrorMessage('User is already registered!')
		}
	}, [userConext.responseMessage])

	function validateForm() {
		if (
			username === '' ||
			email === '' ||
			confirmEmail === '' ||
			password === '' ||
			confirmPassword === '' ||
			confirmEmail !== email ||
			confirmPassword !== password
		) {
			setErrorClass('error')
			userConext.formInputIsValidHandler(false)
			if (username === '') {
				userNameRef.current.focus()
				setErrorMessage('Please add a username!')
			} else if (email === '') {
				emailRef.current.focus()
				setErrorMessage('Please add your email!')
			} else if (confirmEmail === '') {
				confirmEmailRef.current.focus()
				setErrorMessage('Please confirm email!')
			} else if (password === '') {
				passwordRef.current.focus()
				setErrorMessage('Please choose a password!')
			} else if (confirmPassword === '') {
				confirmPasswordRef.current.focus()
				setErrorMessage('Please confirm your password!')
			} else if (confirmEmail !== email) {
				setErrorMessage('Emails do not match!')
				confirmEmailRef.current.focus()
			} else if (confirmPassword !== password) {
				setErrorMessage('Passwords do not match!')
				confirmPasswordRef.current.focus()
			}
		} else {
			const formData = {
				username,
				email,
				password,
				from: 'register',
			}
			userConext.formInputIsValidHandler(null)
			props.onRegister(formData)
		}
	}

	function loginHandler() {
		router.push('/login')
	}

	function onChangeHandler(e) {
		e.target.id === 'Username' && setUsername(e.target.value)
		e.target.id === 'Email' && setEmail(e.target.value)
		e.target.id === 'Confirm-Email' && setConfirmEmail(e.target.value)
		e.target.id === 'Password' && setPassword(e.target.value)
		e.target.id === 'Confirm-Password' && setConfirmPassword(e.target.value)
		setErrorClass('')
		setErrorMessage('')
	}

	function submitHandler(e) {
		e.preventDefault()
		validateForm()
	}

	return (
		<div className={classes['form-container']}>
			<form className={classes.form} onSubmit={submitHandler}>
				<div className={classes.errormessage}>{errorMessage}</div>
				<div className={classes.outerblocks}>
					<div className={classes.innerblocks}>
						<label htmlFor='Username'>Username</label>
						<input
							className={classes[errorClass]}
							ref={userNameRef}
							type='text'
							id='Username'
							onChange={onChangeHandler}
							value={username}
							autoComplete='username'
							autoFocus
							required
						/>
					</div>
				</div>
				<div className={classes.outerblocks}>
					<div className={classes.innerblocks}>
						<label htmlFor='Email'>Email</label>
						<input
							className={classes[errorClass]}
							ref={emailRef}
							type='email'
							id='Email'
							onChange={onChangeHandler}
							value={email}
							autoComplete='email'
							required
						/>
					</div>
					<div className={classes.innerblocks}>
						<label htmlFor='Confirm-Email'>Confirm Email</label>
						<input
							className={classes[errorClass]}
							ref={confirmEmailRef}
							type='email'
							id='Confirm-Email'
							onChange={onChangeHandler}
							value={confirmEmail}
							autoComplete='email'
							required
						/>
					</div>
				</div>
				<div className={classes.outerblocks}>
					<div className={classes.innerblocks}>
						<label htmlFor='Password'>Password</label>
						<input
							className={classes[errorClass]}
							ref={passwordRef}
							type='password'
							id='Password'
							onChange={onChangeHandler}
							value={password}
							autoComplete='password'
							required
						/>
					</div>
					<div className={classes.innerblocks}>
						<label htmlFor='Confirm-Password'>Confirm Password</label>
						<input
							className={classes[errorClass]}
							ref={confirmPasswordRef}
							type='password'
							id='Confirm-Password'
							onChange={onChangeHandler}
							value={confirmPassword}
							autoComplete='password'
							required
						/>
					</div>
				</div>
				<div className={classes.btn}>
					<Button color='#545e6b' type='submit'>
						Register
					</Button>
				</div>
			</form>
			<div className={classes.btn}>
				<Button color='#2196f3' onClick={loginHandler}>
					Login
				</Button>
			</div>
		</div>
	)
}
