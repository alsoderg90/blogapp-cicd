const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
mongoose.set('useFindAndModify', false)



logger.info('connecting to', config.mongoUrl)
//mongoose.connect(config.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.p7hqz.mongodb.net/bloglist-app-test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => {
    logger.info('connected to MongoDB:', result)
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(middleware.tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testrouter')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)


module.exports = app

app.get('/health', (req, res) => {
  res.send('ok')
})

app.get('/version', (req, res) => {
  res.send('1') // change this string to ensure a new version deployed
})