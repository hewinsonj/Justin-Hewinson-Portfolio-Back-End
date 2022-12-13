const mongoose = require('mongoose')

//import activity model to be used for virtual processing
const Activity = require('./activity')

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			// enum: ['j@gmail.com', 'dudeguy@gmail.com', 'dudelady@gmail.com', 'chocolate@gmail.com', 'bubbletea@gmail.com', 'notyou@gmail.com'],
		},
		hashedPassword: {
			type: String,
			required: true,
		},
		buddies: [{
			type : mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}],
		token: String,
	},
	{
		timestamps: true,
		toObject: {
			// remove `hashedPassword` field when we call `.toObject`
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
			
		},
		toJSON: {
			//removed hashed password
			transform: (_doc, user) => {
				delete user.hashedPassword
				return user
			},
			
		}
	}
)


module.exports = mongoose.model('User', userSchema)
