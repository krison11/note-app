import { useEffect, useState, useContext, useRef } from 'react'
import classes from './User.module.css'
import { useRouter } from 'next/router'
import UserContext from '@/store/user-context'
import { FaEye, FaEyeSlash, FaAdjust } from 'react-icons/fa'
import Modal from '../UI/Modal'
import Button from '../UI/Button'
import Image from 'next/image'
import { MdOutlineAddAPhoto } from 'react-icons/md'

export default function User({ onAddImage, onLogout }) {
	const userContext = useContext(UserContext)
	const fileInputRef = useRef()
	const hiddenSubmitBtn = useRef()
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [show, setShow] = useState(false)
	const [image, setImage] = useState()
	const [file, setFile] = useState()
	const [picMessage, setPicMessage] = useState('')

	useEffect(() => {
		sessionStorage.setItem('prevPath', window.location.pathname)
	}, [])

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem('user'))

		if (user) {
			user.image
				? setPicMessage('Change profile picture:')
				: setPicMessage('Add profile picture:')
		}
	}, [image])

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem('user'))
		if (user) {
			if (user.email && user.password) {
				const hiddenPass = user.password.split('').map(char => {
					return char.replace(char, '*')
				})
				setEmail(user.email)
				show ? setPassword(user.password) : setPassword(hiddenPass)
			}
		}
	}, [show, userContext.user])

	function fileImageHandler() {
		fileInputRef.current.click()
	}

	function onChangeHandler(e) {
		const loadedFile = e.target.files[0]
		userContext.formInputIsValidHandler(true)

		if (!loadedFile) {
			setImage(null)
			return
		}

		// getting image for the preview...
		const dataUrlReader = new FileReader()
		dataUrlReader.onload = () => {
			setImage(dataUrlReader.result)
			// console.log('loaded file: ', dataUrlReader.result)
		}
		dataUrlReader.readAsDataURL(loadedFile)

		// console.log('loaded file: ', loadedFile)

		const user = JSON.parse(sessionStorage.getItem('user'))
		// setting formData()...
		const formData = new FormData()
		formData.append('file', loadedFile)
		formData.append('userId', user._id)
		setFile(formData)
	}

	// trigger hidden submit button
	function triggerSubmitHandler() {
		hiddenSubmitBtn.current.click()
	}

	function submitHandler(e) {
		e.preventDefault()
		sessionStorage.setItem('image', image)
		userContext.imageHandler(image)
		onAddImage && onAddImage(file)
		setImage('')
	}

	// clear and logout.....
	function logoutHandler() {
		onLogout()
	}

	function changePasswordHandler() {
		router.push('/user/change-password')
	}
	function deleteAccountHandler() {
		router.push('/user/delete-account')
	}
	function toggleHandler() {
		setShow(!show)
	}
	function toggleTheme() {
		userContext.toggleTheme()
	}

	return (
		<>
			{image && (
				<Modal>
					<div className={classes.imagepreview}>
						<div className={classes.imagecontainer}>
							<Image src={image} alt='Image selected by user.' fill />
						</div>
						<Button
							width='15rem'
							color='#1baaec'
							onClick={triggerSubmitHandler}
						>
							Add Picture
						</Button>
						<Button
							width='15rem'
							color='grey'
							onClick={() => {
								setImage('')
							}}
						>
							Cancel
						</Button>
					</div>
				</Modal>
			)}
			<div
				style={{
					backgroundColor: userContext.bgColor,
					color: userContext.color,
				}}
				className={classes.userContainer}
			>
				<div className={classes.infoGroup}>
					<div>
						{picMessage}
						<form className={classes.hiddenfileinput} onSubmit={submitHandler}>
							<input
								ref={fileInputRef}
								type='file'
								accept='image/jpeg, image/png, image/jpg'
								name='image'
								onChange={onChangeHandler}
								required
							/>
							<input ref={hiddenSubmitBtn} type='submit' value='Submit' />
						</form>
						<span className={classes.plussign} onClick={fileImageHandler}>
							<MdOutlineAddAPhoto />
						</span>
					</div>
					<div className={classes.theme}>
						Theme: {userContext.user.theme}
						<FaAdjust
							style={{ color: userContext.color }}
							className={classes.themeicon}
							onClick={toggleTheme}
						/>
					</div>
					<div>Email: {email}</div>
					<div>
						Password: {password}
						{show ? (
							<FaEyeSlash className={classes.toggle} onClick={toggleHandler} />
						) : (
							<FaEye className={classes.toggle} onClick={toggleHandler} />
						)}
					</div>
				</div>
				<div className={classes.btnGroup}>
					<div className={classes.logout} onClick={logoutHandler}>
						Logout
					</div>
					<div
						className={classes.changePassword}
						onClick={changePasswordHandler}
					>
						Change password
					</div>
					<div className={classes.delete} onClick={deleteAccountHandler}>
						Delete account
					</div>
				</div>
			</div>
		</>
	)
}
