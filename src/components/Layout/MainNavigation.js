import { useEffect, useState, useContext } from 'react'
import classes from './MainNavigation.module.css'
import Link from 'next/link'
import { MdNotes, MdOutlineNoteAdd } from 'react-icons/md'
import { BiUserCircle } from 'react-icons/bi'
import { useRouter } from 'next/router'
import UserContext from '@/store/user-context'
import { FaAdjust } from 'react-icons/fa'
import Image from 'next/image'
import { SlNote } from 'react-icons/sl'

export default function MainNavigation() {
	const userContext = useContext(UserContext)
	const router = useRouter()
	const [userName, setUserName] = useState('')
	const [image, setImage] = useState('')

	const notes = userContext.user.notes.length > 1 ? 'Notes' : 'Note'

	// import image
	async function getImage() {
		const user = JSON.parse(sessionStorage.getItem('user'))
		if (user) {
			const imagePath = user.image
				? await import(`/src/pages/api/images/${user.image}`)
				: ''
			setImage(imagePath)
		}
	}

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem('user'))
		user && setUserName(user.username)
		// const userImage = sessionStorage.getItem('image')
		// setImage(userImage)
		// getImage()
	}, [userContext.user.username])

	useEffect(() => {
		// const userImage = sessionStorage.getItem('image')
		// setImage(userImage)
		const timmer = setTimeout(() => {
			getImage()
		}, 2000)

		return () => {
			clearTimeout(timmer)
		}
	}, [userContext.user.image])

	function toggleTheme() {
		userContext.toggleTheme()
	}
	useEffect(() => {
		document.body.style.backgroundColor = userContext.bgColor
	}, [])

	useEffect(() => {
		document.body.style.backgroundColor = userContext.bgColor
	}, [userContext.user.theme])

	return (
		<header>
			<nav className={classes.navigation}>
				<ul className={classes.linkContainer}>
					<li>
						<Link
							className={`${router.pathname === '/' ? classes.active : ''}`}
							href='/'
						>
							<p>Your Notes</p>
							<MdNotes className={classes.icons} />
						</Link>
					</li>
					<li className={classes.desktopNewNoteBtn}>
						<Link
							className={`${
								router.pathname === '/new-note' ? classes.active : ''
							}`}
							href='/new-note'
						>
							<p>New Note</p>
							<MdOutlineNoteAdd className={classes.icons} />
						</Link>
					</li>
					<li>
						<Link
							className={`${router.pathname === '/user' ? classes.active : ''}`}
							href={'/user'}
						>
							<p>{userName}</p>

							{image ? (
								<div className={classes.imagecontainer}>
									<Image src={image} alt='Image selected by user.' fill />
								</div>
							) : (
								<BiUserCircle className={classes.icons} />
							)}
							<span className={classes.usernameParagraph}>{userName}</span>
						</Link>
					</li>
				</ul>
				<FaAdjust className={classes.themebtn} onClick={toggleTheme} />
				{userContext.showNoteBtn && (
					<div
						className={classes.mobileNewNoteBtnContainer}
						style={{
							backgroundColor: userContext.bgColor,
						}}
					>
						{userContext.user.notes.length > 0 && (
							<div className={classes.notes}>
								{userContext.user.notes.length} {notes}
							</div>
						)}
						<Link className={classes.mobileNewNoteBtn} href='/new-note'>
							<SlNote className={classes.icons} />
						</Link>
					</div>
				)}
			</nav>
		</header>
	)
}
