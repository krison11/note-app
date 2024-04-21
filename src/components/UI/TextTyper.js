import classes from './TextTyper.module.css'
import { useEffect, useState } from 'react'
import { IoPencilOutline } from 'react-icons/io5'

export default function TextTyper({
	text,
	repeat,
	cursor,
	speedMilisec,
	pauseMilisec,
}) {
	const [content, setContent] = useState('')
	const [index, setIndex] = useState(0)
	const [classname, setClassname] = useState('')
	const [typing, setTyping] = useState(true)

	const cursorClass = classname ? classname : 'cursor'

	function typeText(text) {
		while (content.length < text.length) {
			for (const el of text) {
				const char = text[content.length]
				const wait = setTimeout(() => {
					setContent(content + char)
				}, speedMilisec)
				return () => clearTimeout(wait)
			}
		}
		pause(content.length * pauseMilisec, true)
	}

	function clearText(text) {
		while (content.length > 0) {
			for (const el of text) {
				const wait = setTimeout(() => {
					setContent(content.slice(0, -1))
				}, 10)
				return () => clearTimeout(wait)
			}
		}
		pause(1000, false)
	}

	function pause(milisec, isTyping) {
		setClassname('animate')
		setTimeout(() => {
			setClassname('')
			repeat && setTyping(!typing)
			if (isTyping) {
				if (index < text.length - 1) {
					setIndex(index + 1)
				} else setIndex(0)
			}
		}, milisec)
	}

	useEffect(() => {
		console.log('text type: ', typeof text)
		if (Array.isArray(text)) {
			if (repeat) {
				if (typing) {
					typeText(text[index])
				} else {
					clearText(text[index])
				}
			} else {
				typeText(text[index])
			}
		}
		if (typeof text === 'string') {
			if (repeat) {
				if (typing) {
					typeText(text)
				} else {
					clearText(text)
				}
			} else {
				typeText(text)
			}
		}
	}, [content, typing, index])

	return (
		<div className={classes.content}>
			{content}
			<div className={classes['cursor-wrapper']}>
				{cursor && <div className={classes[cursorClass]}>|</div>}
			</div>
		</div>
	)
}
