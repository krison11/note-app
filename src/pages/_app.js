import Layout from '@/components/Layout/Layout'
import '@/styles/globals.css'
import Loading from '@/components/UI/Loading'
import { UserContextProvider } from '@/store/user-context'

export default function App({ Component, pageProps }) {
	return (
		<UserContextProvider>
			<Loading />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UserContextProvider>
	)
}
