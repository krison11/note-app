import path from 'path'
import formidable from 'formidable'
import fs from 'fs/promises'
import { MongoClient, ObjectId } from 'mongodb'

export const config = {
	api: {
		bodyParser: false,
	},
}

export default async function handler(req, res) {
	const client = await MongoClient.connect(
		'mongodb+srv://krison:mIWUSeu9KlfxXe5s@cluster0.urgqptj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
	)
	const db = client.db()
	const database = db.collection('users')

	try {
		// await fs.readdir(path.join(process.cwd(), '/public/images'))
		await fs.readdir(path.join(process.cwd(), '/src/pages/api/images'))
	} catch (error) {
		// await fs.mkdir(path.join(process.cwd() + '/public/images'))
		await fs.mkdir(path.join(process.cwd() + '/src/pages/api/images'))
	}

	let cancelUploads = false

	const form = formidable({
		uploadDir: path.join(process.cwd(), '/src/pages/api/images'),
		// uploadDir: path.join(process.cwd(), '/public/images'),
		filter: function ({ name, originalFilename, mimetype }) {
			// keep only images
			const valid = mimetype && mimetype.includes('image')
			if (!valid) {
				form.emit('error', new formidableErrors.default('invalid type', 0, 400)) // optional make form.parse error
				cancelUploads = true //variable to make filter return false after the first problem
			}
			return valid && !cancelUploads
		},
		filename: (name, ext, path, form) => {
			const fileName = Date.now().toString()
			const stringArr = path.originalFilename.split('.')
			const lastIndex = stringArr.length - 1
			const fileExtention = stringArr[lastIndex]
			return `${fileName}.${fileExtention}`
		},
	})

	form.parse(req, (err, fields, files) => {
		if (err) reject(err)
		// console.log('user id: ', fields.userId[0])
		// console.log('new file name: ', files.file[0].newFilename)
		// console.log('file path: ', files.file[0].filepath)
		// console.log('file: ', files.file[0])
		// console.log('data: ', req.formdata())
		// console.log('files: ', files.file[0])

		database.updateOne(
			{ _id: new ObjectId(fields.userId[0]) },
			{ $set: { image: files.file[0].newFilename } }
		)

		res.status(201).json({
			// message: 'image added succcessfully...',
			file: files.file[0],
			fileName: files.file[0].newFilename,
			filePath: files.file[0].filepath,
			userId: fields.userId[0],
		})
	})

	res.status(201).json({
		message: 'image added succcessfully...',
		// file: files.file[0],
		// fileName: files.file[0].newFilename,
		// filePath: files.file[0].filepath,
		// userId: fields.userId[0],
	})
}
