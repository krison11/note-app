export default async function name(req, res) {
	await fetch('https://zenquotes.io/api/today')
		.then(res => res.json())
		.then(data => {
			console.log(data)
			res.status(201).json({
				author: data[0].a,
				quote: data[0].q,
			})
		})
		.catch(error => {
			// handle error
			res.status(error.status).json({
				error: error.status,
				message: error.message,
			})
			console.log(error)
		})
}
