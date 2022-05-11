// express -- backend web framework
const express = require('express')
// environment variable 
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals',require('./routes/goalRoutes'))
app.use(errorHandler)
app.listen(port,()=>console.log(`Server started on port ${port}`))

// create a route