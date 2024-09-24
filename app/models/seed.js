// added this seed file to test all activity routes

// const mongoose = require('mongoose')
// const Project = require('./project')
// const db = require('../../config/db')

// const startProjects = [
//     {    
//         projTitle: 'MyTiki App',
//         img1: 'https://i.imgur.com/GWkVhJO.jpg',
//         img2: 'https://i.imgur.com/GWkVhJO.jpg',
//         img3: 'https://i.imgur.com/GWkVhJO.jpg',
//         description: 'MyTiki is an app that provides 10 classictiki cocktail recipes that are available to be viewed by any logged in user. The user is also able to customize any of the provided recipies and add them to their own original cocktails folder, or create their own from scratch! The user also has the ability to filter the shown cocktails by keywords, and add any cocktails they wish to their favorites folder.',
//         finishDate: '09/12/23',
//         startDate: '09/12/23',
//         link1: 'https://www.linkedin.com/in/justin-hewinson/',
//         link2: 'https://www.linkedin.com/in/justin-hewinson/',
//         link3: 'https://www.linkedin.com/in/justin-hewinson/',
//         role: 'Full Stack Dev',
//         client: 'HTML5, CSS, Bootstrap, JavaScript, LiquidJs, Express, MongoDB, Mongoose, Morgan, Bcryptjs',
//         progress: 10,
//         priority: 'a',
//         private: false,
//     },
// ]

// // connect to database
// mongoose.connect(db, {
//     useNewUrlParser: true
// })
//     .then(() => {
//         Project.deleteMany({ owner: null })
//             .then(deletedProjects => {
//                 console.log('deletedProjects', deletedProjects)

//                 Project.create(startProjects)
//                     .then(newProjects => {
//                         console.log('the new Projects', newProjects)
//                         mongoose.connection.close()
//                     })
//                     .catch(error => {
//                         console.log(error)
//                         mongoose.connection.close()
//                     })
//             })
//             .catch(error => {
//                 console.log(error)
//                 mongoose.connection.close()
//             })
//     })
//     .catch(error => {
//         console.log(error)
//         mongoose.connection.close()
//     })