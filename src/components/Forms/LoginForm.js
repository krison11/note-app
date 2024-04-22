import { useState, useRef, useEffect, useContext } from 'react'
import classes from './Form.module.css'
import Button from '../UI/Button'
import UserContext from '@/store/user-context'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function LoginForm(props) {
	const userConext = useContext(UserContext)
	const router = useRouter()
	const emailRef = useRef()
	const passwordRef = useRef()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [errorClass, setErrorClass] = useState('')
	const [showRestore, setShowRestore] = useState(false)

	useEffect(() => {
		emailRef.current.focus()
		userConext.formInputIsValidHandler(true)
	}, [])

	useEffect(() => {
		if (userConext.responseMessage === 'wrong email') {
			setErrorClass('error')
			setErrorMessage('Wrong email!')
			userConext.formInputIsValidHandler(false)
			emailRef.current.focus()
			setShowRestore(false)
		}
		if (userConext.responseMessage === 'wrong password') {
			setShowRestore(true)
			setErrorClass('error')
			setErrorMessage('Wrong password!')
			userConext.formInputIsValidHandler(false)
			passwordRef.current.focus()
		}
	}, [userConext.responseMessage])

	function registerHandler() {
		router.push('/register')
	}

	function validateForm() {
		if (email === '' || password === '') {
			setErrorClass('error')
			userConext.formInputIsValidHandler(false)
			if (email === '') {
				emailRef.current.focus()
				setErrorMessage('Please add your email!')
			} else if (password === '') {
				passwordRef.current.focus()
				setErrorMessage('Please add your password!')
			}
		} else {
			sessionStorage.setItem('attemptedEmail', email)
			const formData = {
				email,
				password,
				from: 'login',
			}
			userConext.formInputIsValidHandler(null)
			props.onLogin(formData)
		}
	}

	function onChangeHandler(e) {
		e.target.id == 'email' && setEmail(e.target.value)
		e.target.id == 'password' && setPassword(e.target.value)
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
				<div className={classes.innerblocks}>
					<label htmlFor='email'>Email</label>
					<input
						className={classes[errorClass]}
						ref={emailRef}
						type='email'
						id='email'
						onChange={onChangeHandler}
						value={email}
						autoComplete='username'
						autoFocus
						required
					/>
				</div>
				<div className={classes.innerblocks}>
					<label htmlFor='password'>Password</label>
					<input
						className={classes[errorClass]}
						ref={passwordRef}
						type='password'
						id='password'
						onChange={onChangeHandler}
						value={password}
						autoComplete='new-password'
						required
					/>
				</div>
				<div className={classes.btn}>
					<Button color='#2196f3' type='submit'>
						Login
					</Button>
				</div>
			</form>
			<div className={classes.btn}>
				<Button color='#545e6b' onClick={registerHandler}>
					Register
				</Button>
			</div>
			{showRestore && (
				<div className={classes.linkHolder}>
					<Link className={classes.link} href='/restore-password'>
						Forgot password?
					</Link>
				</div>
			)}
		</div>
	)
}
