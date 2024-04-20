import RestorePassword from '@/components/Forms/ResotrePassword'
import Modal from '@/components/UI/Modal'
import MessageCard from '@/components/UI/MessageCard'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import UserContext from '@/store/user-context'

export default function restorePassword() {
	const userContext = useContext(UserContext)
	const router = useRouter()
	const [show, setShow] = useState(false)

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [])

	useEffect(() => {
		document.body.style.backgroundColor = 'black'
	}, [userContext.user.theme])

	function sendEmailHandler(email) {
		console.log('sending email to ', email, '....')
		// here i need to send the actuall email

		setShow(true)
		const timer = setTimeout(() => {
			router.push('/login')
		}, 2000)
		return () => {
			clearTimeout(timer)
		}
	}
	return (
		<>
			{show ? (
				<MessageCard title={'✅'} text={'Check your email.'} />
			) : (
				<Modal title={'Restore Password'}>
					<RestorePassword onSendEmail={sendEmailHandler} />
				</Modal>
			)}
		</>
	)
}
