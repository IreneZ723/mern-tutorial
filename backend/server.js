// express -- backend web framework
const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
// environment variable 
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000
connectDB()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals',require('./routes/goalRoutes'))
app.use(errorHandler)
app.listen(port,()=>console.log(`Server started on port ${port}`))
