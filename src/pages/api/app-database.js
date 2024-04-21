// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { MongoClient, ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import path from 'path'
import { writeFile } from 'fs/promises'

// here i use the serverside code to connect to a database
export default async function handler(req, res) {
	const requestData = req.body //receiving the data from..

	// my mongoDB password: mIWUSeu9KlfxXe5sx
	const client = await MongoClient.connect(
		'mongodb+srv://krison:mIWUSeu9KlfxXe5s@cluster0.urgqptj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
	)
	const db = client.db()
	const database = db.collection('users')
	const existingUsers = await database.find().toArray()

	console.log(`data from ${requestData.from}: `, requestData)

	if (req.method === 'POST') {
		if (existingUsers.length === 0) {
			if (requestData.from === 'register') {
				const newUser = {
					username: requestData.username,
					email: requestData.email,
					password: requestData.password,
					notes: [],
					image: '',
					theme: 'dark',
				}
				await database.insertOne(newUser)
				res.status(201).json({ message: 'success', user })
			}
			if (requestData.from === 'login') {
				res.status(201).json({ message: 'wrong email' })
			}
		} else {
			if (requestData.from === 'register') {
				const user = existingUsers.find(
					user => user.email === requestData.email
				)
				const newUser = {
					username: requestData.username,
					email: requestData.email,
					password: requestData.password,
					notes: [],
					image: '',
					theme: 'dark',
				}
				if (!user) {
					await database.insertOne(newUser)
					res.status(201).json({ message: 'success', user: newUser })
				} else {
					res.status(201).json({ message: 'user exists' })
				}
			}
			if (requestData.from === 'login') {
				const user = existingUsers.find(
					user => user.email === requestData.email
				)
				if (!user) {
					res.status(201).json({ message: 'wrong email' })
				} else if (user.password !== requestData.password) {
					res.status(201).json({ message: 'wrong password' })
				} else {
					res.status(201).json({ message: 'success', user })
				}
			}
			if (requestData.from === 'change-password') {
				await database.updateOne(
					{ _id: new ObjectId(requestData.userId) },
					{ $set: { password: requestData.newPassword } }
				)

				const user = await database.findOne({
					password: requestData.newPassword,
				})

				res.status(201).json({
					message: 'password has changed succcessfully...',
					newPassword: user.password,
				})
			}
			if (requestData.from === 'logout') {
				await database.updateOne(
					{ _id: new ObjectId(requestData.user._id) },
					{
						$set: {
							password: requestData.user.password,
							image: requestData.user.image,
							theme: requestData.user.theme,
							notes: requestData.user.notes,
						},
					}
				)

				res.status(201).json({
					message: 'user updates have been stored succcessfully...',
				})
			}
			if (requestData.from === 'delete-user') {
				await database.deleteOne({ _id: new ObjectId(requestData.userId) })
				res.status(201).json({ message: 'user is deleted...' })
			}
			// if (requestData.from === 'get-user-image') {
			// 	console.log('image: ', requestData.userImage)
			// }
		}
	}
	client.close()
}
