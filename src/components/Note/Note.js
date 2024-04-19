import Link from 'next/link'
import classes from './Note.module.css'
import { useState, useEffect } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import animate from '@/hooks/animate'

export default function Note(props) {
	const [touchStart, setTouchStart] = useState(null)
	const [touchEnd, setTouchEnd] = useState(null)
	const [showOptions, setShowOptions] = useState(false)

	useEffect(() => {
		console.log('props.date: ', props.date)
	}, [])

	const optionContainerClass = showOptions ? 'options-opened' : 'options-closed'
	// the required distance between touchStart and touchEnd to be detected as a swipe
	const minSwipeDistance = 50

	function openClose() {
		setShowOptions(!showOptions)
	}

	function onDelete() {
		animate(props.id).shrink('0s')

		setTimeout(() => {
			props.onDelete(props.id)
		}, 1000)
	}

	function onTouchStart(e) {
		setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX)
	}

	function onTouchMove(e) {
		setTouchEnd(e.targetTouches[0].clientX)
	}

	function onTouchEnd() {
		if (!touchStart || !touchEnd) return
		const distance = touchStart - touchEnd
		const isLeftSwipe = distance > minSwipeDistance
		const isRightSwipe = distance < -minSwipeDistance
		if (isLeftSwipe) {
			setShowOptions(true)
			// show options..
			// animate left...
		}
		if (isRightSwipe) {
			setShowOptions(false)
			// hide options..
			// animate right...
		}
	}

	return (
		<div id={props.id} className={classes['note-container']}>
			<Link
				href={props.id}
				className={classes[`text-container`]}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<p className={classes['note-title']}>{props.title}</p>
				<p className={classes['note-date']}>{props.date}</p>
				<p className={classes['note-text']}>{props.text}</p>
			</Link>
			<div className={classes[`${optionContainerClass}`]}>
				<p onClick={openClose} className={classes.options}>
					{props.date}
				</p>
				<div className={classes.delete} onClick={onDelete}>
					<RiDeleteBin6Line />
				</div>
			</div>
		</div>
	)
}
