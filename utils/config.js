require('dotenv').config()

let mongoUrl = process.env.MONGODB_URI
let PORT = process.env.PORT
let appName = process.env.APP_NAME

if (process.env.NODE_ENV === 'test') { 
  mongoUrl = process.env.TEST_MONGODB_URI
  appName = process.env.TEST_APP_NAME
    
}

module.exports = {
  mongoUrl, PORT, appName
}