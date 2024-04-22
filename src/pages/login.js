import UserContext from '@/store/user-context'
import { useContext, useState, useEffect } from 'react'
import Modal from '@/components/UI/Modal'
import LoginForm from '@/components/Forms/LoginForm'
import classes from '@/styles/Home.module.css'
import { SlNote } from 'react-icons/sl'
import TextTyper from '@/components/UI/TextTyper'
import { eslint } from '../../next.config'

export default function login() {
	const userContext = useContext(UserContext)
	const [greetingHasFinished, setGreetingHasFinished] = useState(false)
	const [quote, setQuote] = useState({
		author: '',
		quote: '',
	})

	const [hideAuthor, setHideAuthor] = useState(true)

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [userContext.theme])

	// dynamic delay for greeting content...
	// function calulateDelay(content) {
	// 	console.log(content.length)
	// 	let length = 0
	// 	if (Array.isArray(content)) {
	// 		content.forEach(text => {
	// 			length += text.length
	// 		})
	// 	} else {
	// 		length = content.length
	// 	}
	// 	return length * 1000
	// }

	async function quoteOfTheDay() {
		await fetch('./api/get-quote')
			.then(res => res.json())
			.then(data => {
				console.log(data.quote)
				console.log(data.author)

				setQuote({
					quote: data.quote,
					author: data.author,
				})
			})
			.catch(err => {
				console.log(err.message)
			})
	}

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
		const greetingEnded = sessionStorage.getItem('greetingEnded')
		if (greetingEnded) {
			setGreetingHasFinished(true)
			if (!userContext.animationFinished) {
				const timmer = setTimeout(() => {
					userContext.animationFinishedHandler(true)
				}, 4500)

				return () => {
					clearTimeout(timmer)
				}
			}
		} else {
			quoteOfTheDay()
			const authorTimmer = setTimeout(() => {
				setHideAuthor(false)
			}, 5000)
			const greetingTimmer = setTimeout(() => {
				setGreetingHasFinished(true)
				sessionStorage.setItem('greetingEnded', true)
				if (!userContext.animationFinished) {
					const timmer = setTimeout(() => {
						userContext.animationFinishedHandler(true)
					}, 4500)

					return () => {
						clearTimeout(timmer)
					}
				}
			}, 10000)
			return () => {
				clearTimeout(greetingTimmer)
				clearTimeout(authorTimmer)
			}
		}
	}, [])

	// login...
	async function loginHandler(formData) {
		userContext.loginHandler(formData)
	}

	return (
		<>
			{greetingHasFinished ? (
				<>
					{userContext.animationFinished ? (
						<div className={classes.modalContainer}>
							<Modal title={'Login'}>
								<LoginForm onLogin={loginHandler} />
							</Modal>
						</div>
					) : (
						<div className={classes.login}>
							<div className={classes.contentContainer}>
								<div className={classes.letterContainer}>
									<span className={classes.one}>N</span>
									<span className={classes.two}>o</span>
									<span className={classes.three}>t</span>
									<span className={classes.four}>e</span>
									<span className={classes.five}>s</span>
									<span className={classes.six}>.</span>
								</div>
								<div className={classes.iconBlock}>
									<SlNote className={classes.icon} />
								</div>
							</div>
						</div>
					)}
				</>
			) : (
				<div className={classes.greetingContainer}>
					<h1 className={classes.quoteHeader}>Quote of the day</h1>
					<div className={classes.quoteContainer}>
						<TextTyper
							text={quote.quote}
							speedMilisec={20}
							pauseMilisec={500}
							repeat={true}
							cursor={hideAuthor}
						/>
					</div>
					{!hideAuthor && (
						<div className={classes.authorContainer}>
							<TextTyper
								text={quote.author}
								speedMilisec={20}
								pauseMilisec={2000}
								repeat={true}
								cursor={true}
							/>
						</div>
					)}
				</div>
			)}
		</>
	)
}
