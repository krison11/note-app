import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
	// incoming data from the user
	const reqData = req.body

	// connecting to the database
	const client = await MongoClient.connect(
		'mongodb+srv://krison:mIWUSeu9KlfxXe5s@cluster0.urgqptj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
	)
	// creating a db instance
	const db = client.db()

	// creating a database collection named 'users'
	const user_db = db.collection('users')

	// find a user where both email and password match
	const user = await user_db.findOne({
		email: reqData.email,
		password: reqData.password,
	})
	// response
	if (!user) {
		res.status(201).json({ message: 'wrong credentials' })
	} else {
		res.status(201).json({ message: 'success', user })
	}
}
