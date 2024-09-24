'use strict'
// require("dotenv").config()
// creating a base name for the mongodb
// REPLACE THE STRING WITH YOUR OWN DATABASE NAME

// const mongooseBaseName = "hewinsonportfolioapi";


// // create the mongodb uri for development and test
// const database = {
// // 	production: `https://hewinsonportfolioapi.fly.dev`,
// // 	development: 'http://localhost:8000',
// 	development: `mongodb+srv://frenchfry:frenchfry@cluster0.4tmzof4.mongodb.net/hewinsonportfolioapi?retryWrites=true&w=majority`,
//     test: `mongodb+srv://frenchfry:frenchfry@cluster0.4tmzof4.mongodb.net/${mongooseBaseName}?retryWrites=true&w=majority`,
// };


// const mongooseBaseName = "hewinsonportfolioapi";


// // create the mongodb uri for development and test
// const database = {
// // 	production: `https://hewinsonportfolioapi.fly.dev`,
// // 	development: 'http://localhost:8000',
// 	development: `mongodb+srv://frenchfry:frenchfry@cluster0.4tmzof4.mongodb.net/hewinsonportfolioapi?retryWrites=true&w=majority`,
//     test: `mongodb+srv://frenchfry:frenchfry@cluster0.4tmzof4.mongodb.net/${mongooseBaseName}?retryWrites=true&w=majority`,
// };

// // Identify if development environment is test or development
// // select DB based on whether a test file was executed before `server.js`
// const localDb = process.env.TESTENV ? database.test : database.development

// // Environment variable MONGODB_URI will be available in
// // heroku production evironment otherwise use test or development db
// const currentDb = process.env.MONGODB_URI || localDb

// module.exports = currentDb



// creating a base name for the mongodb
// REPLACE THE STRING WITH YOUR OWN DATABASE NAME
const mongooseBaseName = 'hewinsonportfolioapi'

// create the mongodb uri for development and test
const database = {
	development: `mongodb://localhost/${mongooseBaseName}-development`,
	test: `mongodb://localhost/${mongooseBaseName}-test`,
}

// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
const localDb = process.env.TESTENV ? database.test : database.development

// Environment variable MONGODB_URI will be available in
// heroku production evironment otherwise use test or development db
const currentDb = process.env.MONGODB_URI || localDb

module.exports = currentDb
