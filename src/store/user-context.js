import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const UserContext = React.createContext({
	loading: false,
	formInputIsValid: false,
	responseMessage: '',
	color: '',
	user: {
		_id: '',
		notes: [],
		image: '',
		password: '',
		theme: '',
		email: '',
		username: '',
	},
	bgColor: '',
	textAreaBgColor: '',
	image: '',
	showNoteBtn: true,
	animationFinished: false,
	clearSearch: false,
	userHandler: user => {},
	clearSearchHandler: bool => {},
	showNoteBtnHandler: bool => {},
	animationFinishedHandler: bool => {},
	imageHandler: str => {},
	loadingHandler: bool => {},
	formInputIsValidHandler: bool => {},
	responseMessageHandler: message => {},
	loginHandler: async inputData => {},
	toggleTheme: () => {},
	themeHandler: theme => {},
	logoutHandler: () => {},
})

export const UserContextProvider = props => {
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [formInputIsValid, setFormInputIsValid] = useState(true)
	const [responseMessage, setResponseMessage] = useState('')
	const [color, setColor] = useState('')
	const [bgColor, setTBgColor] = useState('')
	const [textAreaBgColor, setTextAreaBgColor] = useState('')
	const [user, setUser] = useState({
		_id: '',
		notes: [],
		image: '',
		password: '',
		theme: '',
		email: '',
		username: '',
	})
	const [image, setImage] = useState('')
	const [animationFinished, setAnimationFinished] = useState(false)
	const [showNoteBtn, setShowNoteBtn] = useState(true)
	const [clearSearch, setClearSearch] = useState(false)

	useEffect(() => {
		const storedUser = JSON.parse(sessionStorage.getItem('user'))
		!storedUser && router.push('/login')
		!user.theme && themeHandler(user.theme)
	}, [user])

	async function loginHandler(data) {
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
					sessionStorage.setItem('user', JSON.stringify(res.user))
					setUser(res.user)
					console.log('res.user:', res.user)
					// setImage(res.user.image)
					// sessionStorage.setItem('image', res.user.image)
					sessionStorage.removeItem('attemptedEmail')
					themeHandler(res.user.theme)
					router.push('/')
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

	function userHandler(user) {
		setUser(user)
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

	function imageHandler(image) {
		setImage(image)
	}

	function toggleTheme() {
		const storedUser = JSON.parse(sessionStorage.getItem('user'))
		storedUser.theme === 'dark' ? themeHandler('light') : themeHandler('dark')
	}

	function themeHandler(theme) {
		const userTheme = theme ? theme : 'dark'
		const color = userTheme === 'dark' ? '#f5f5f5' : '#0e0d17'
		const bgColor = userTheme === 'dark' ? ' #0e0d17' : '#c9c9c9'
		const textAreaBgColor = userTheme === 'dark' ? '#0e0d17' : '#f5f5f5'
		const storedUser = JSON.parse(sessionStorage.getItem('user'))

		if (storedUser) {
			document.body.style.backgroundColor = bgColor
			document.body.style.color = color

			document.querySelectorAll('nav').forEach(el => {
				el.style.backgroundColor = bgColor
				el.style.color = color
				el.querySelectorAll('a').forEach(el => {
					el.style.color = color
				})
			})

			storedUser.theme = userTheme
			sessionStorage.setItem('user', JSON.stringify(storedUser))

			setUser(storedUser)
			setColor(color)
			setTBgColor(bgColor)
			setTextAreaBgColor(textAreaBgColor)
		}
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

	function logoutHandler() {
		sessionStorage.clear()
		setFormInputIsValid(true)
		router.push('/login')
	}

	return (
		<UserContext.Provider
			value={{
				loading,
				formInputIsValid,
				responseMessage,
				color,
				bgColor,
				textAreaBgColor,
				image,
				showNoteBtn,
				animationFinished,
				user,
				clearSearch,
				toggleTheme,
				userHandler,
				themeHandler,
				clearSearchHandler,
				showNoteBtnHandler,
				animationFinishedHandler,
				imageHandler,
				loadingHandler,
				formInputIsValidHandler,
				responseMessageHandler,
				loginHandler,
				logoutHandler,
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContext
