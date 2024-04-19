import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const UserContext = React.createContext({
	loading: false,
	formInputIsValid: false,
	responseMessage: '',
	userId: '',
	password: '',
	theme: '',
	color: '',
	bgColor: '',
	textAreaBgColor: '',
	image: '',
	noteQuantity: '',
	showNoteBtn: true,
	aimationFinished: false,
	clearSearch: false,
	notes: [],
	notesHandler: notes => {},
	clearSearchHandler: bool => {},
	noteQuantityHandler: str => {},
	showNoteBtnHandler: bool => {},
	animationFinishedHandler: bool => {},
	imageHandler: str => {},
	themeHandler: str => {},
	passwordHandler: bool => {},
	loadingHandler: bool => {},
	userIdHandler: string => {},
	formInputIsValidHandler: bool => {},
	responseMessageHandler: message => {},
	sendDataHandler: async inputData => {},
	toggleTheme: () => {},
	logoutHandler: () => {},
})

export const UserContextProvider = props => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [userId, setUserId] = useState(false)
	const [formInputIsValid, setFormInputIsValid] = useState(true)
	const [responseMessage, setResponseMessage] = useState('')
	const [password, setPassword] = useState('')
	const [theme, setTheme] = useState('')
	const [color, setColor] = useState('')
	const [bgColor, setTBgColor] = useState('')
	const [textAreaBgColor, setTextAreaBgColor] = useState('')
	const [image, setImage] = useState('')
	const [notes, setNotes] = useState([])
	const [noteQuantity, setNoteQuantity] = useState('')
	const [aimationFinished, setAnimationFinished] = useState(false)
	const [showNoteBtn, setShowNoteBtn] = useState(true)
	const [clearSearch, setClearSearch] = useState(false)

	useEffect(() => {
		const user_Id = sessionStorage.getItem('userId')
		!user_Id && router.push('/login')
	}, [userId])

	useEffect(() => {
		const storedTheme = sessionStorage.getItem('theme')
		!theme && themeHandler(storedTheme)
	}, [theme])

	async function sendDataHandler(data) {
		setLoading(true)
		await fetch('./api/app-database', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(res => {
				setLoading(false)
				if (res.message === 'success') {
					router.push('/')
					const userTheme = res.user.theme ? res.user.theme : 'dark'
					setTheme(userTheme)
					setPassword(res.user.password)
					setUserId(res.user._id)
					setNotes(res.user.notes)
					// setImage(res.user.image)
					// sessionStorage.setItem('image', res.user.image)
					sessionStorage.removeItem('attemptedEmail')
					sessionStorage.setItem('username', res.user.username)
					sessionStorage.setItem('email', res.user.email)
					sessionStorage.setItem('password', res.user.password)
					sessionStorage.setItem('userId', res.user._id)
					themeHandler(res.user.theme)
				} else {
					setResponseMessage(res.message)
					const timer = setTimeout(() => {
						setResponseMessage('')
					}, 100)
					return () => {
						clearTimeout(timer)
					}
				}
			})
	}

	function notesHandler(notes) {
		setNotes(notes)
	}

	function animationFinishedHandler(bool) {
		setAnimationFinished(bool)
	}
	function showNoteBtnHandler(bool) {
		setShowNoteBtn(bool)
	}
	function clearSearchHandler(bool) {
		setClearSearch(bool)
	}
	function loadingHandler(bool) {
		setLoading(bool)
	}
	function noteQuantityHandler(str) {
		setNoteQuantity(str)
	}
	function imageHandler(image) {
		setImage(image)
	}

	function toggleTheme() {
		const theme = sessionStorage.getItem('theme')
		theme === 'dark' ? themeHandler('light') : themeHandler('dark')
	}

	function themeHandler(theme) {
		const userTheme = theme ? theme : 'dark'
		sessionStorage.setItem('theme', userTheme)

		const color = userTheme === 'dark' ? '#f5f5f5' : '#0e0d17'
		const bgColor = userTheme === 'dark' ? ' #0e0d17' : '#c9c9c9'
		const textAreaBgColor = userTheme === 'dark' ? '#0e0d17' : '#f5f5f5'

		if (userId) {
			document.body.style.backgroundColor = bgColor
			document.body.style.color = color
		}

		document.querySelectorAll('nav').forEach(el => {
			el.style.backgroundColor = bgColor
			el.style.color = color
			el.querySelectorAll('a').forEach(el => {
				el.style.color = color
			})
		})

		setTheme(userTheme)
		setColor(color)
		setTBgColor(bgColor)
		setTextAreaBgColor(textAreaBgColor)
	}

	function formInputIsValidHandler(bool) {
		setFormInputIsValid(bool)
		const timer = setTimeout(() => {
			setFormInputIsValid(null)
		}, 2600)

		return () => {
			clearTimeout(timer)
		}
	}
	function responseMessageHandler(message) {
		setResponseMessage(message)
	}
	function userIdHandler(id) {
		setUserId(id)
	}
	function passwordHandler(password) {
		setPassword(password)
	}
	function logoutHandler() {
		sessionStorage.clear()
		setFormInputIsValid(true)
		setUserId('')
		router.push('/login')
	}

	return (
		<UserContext.Provider
			value={{
				loading,
				formInputIsValid,
				responseMessage,
				userId,
				password,
				theme,
				color,
				bgColor,
				textAreaBgColor,
				image,
				showNoteBtn,
				aimationFinished,
				noteQuantity,
				notes,
				clearSearch,
				toggleTheme,
				clearSearchHandler,
				notesHandler,
				noteQuantityHandler,
				showNoteBtnHandler,
				animationFinishedHandler,
				imageHandler,
				themeHandler,
				loadingHandler,
				formInputIsValidHandler,
				responseMessageHandler,
				sendDataHandler,
				userIdHandler,
				passwordHandler,
				logoutHandler,
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContext
