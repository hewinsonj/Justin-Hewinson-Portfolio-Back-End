const mongoose = require('mongoose')
const noteSchema = require('./note')


const projectSchema = new mongoose.Schema(
    {
        projTitle: {
            type: String,
            required: true,
        },
        img1: {
            type: String,
        },
        img2: {
            type: String,

        },
        img3: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        finishDate: {
            type: String,
        },
        startDate: {
            type: String,
            required: true,
        },
        link1: {
            type: String,
        },
        link2: {
            type: String,
        },
        link3: {
            type: String,
        },
        role: {
            type: String,
            required: true,
        },
        client: {
            type: String,
            required: true,
        },
        progress: {
            required: true,
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        proirity: {
            required: true,
            type: String,
            enum: ['a', 'b', 'c', 'd', 'e', 'f'] 
        },
        private: {
            type: Boolean,
            default: false
        },
        // buddies: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'User',
        // }],
        notes: [noteSchema],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: {virtuals: true }
    }
)

// activitySchema.virtual('publicNotes').get(function () {
//     const publicNotes = this.notes.filter(noteObject => noteObject.private === false)
//     return publicNotes.map(noteObject => ({
//         "text": noteObject.text,
//         "author": noteObject.owner.email
//     }))
// })

// activitySchema.virtual('categoryName').get(function () {
//     return `${this.type[0].toUpperCase()}${this.type.slice(1)}`
// })

// activitySchema.virtual('categoryIcon').get(function () {
//     if(this.type == 'education'){
//       return ('graduation cap')  
//     } else if (this.type == 'recreational'){
//         return ('table tennis')
//     } else if (this.type == 'social'){
//         return ('handshake')
//     } else if (this.type == 'diy'){
//         return ('configure')
//     } else if (this.type == 'cooking'){
//         return ('food')
//     } else if (this.type == 'music'){
//         return ('music')
//     } else if (this.type == 'busywork'){
//         return ('edit outline')
//     } else if (this.type == 'charity'){
//         return ('heart')
//     } else if (this.type == 'relaxation'){
//         return ('puzzle')
//     }
// })



module.exports = mongoose.model('Project', projectSchema)