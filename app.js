const express = require('express')
const ConnectionDB = require('./mongoDb_atlas/connection')
const app = express()
const tasksRouter = require('./router')
require('dotenv').config()
const errorHandlerMiddleware = require('./middleware/error-handler')


app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1/tasks', tasksRouter)
app.use((req, res) => res.status(404).send('route not found'))
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000
const start = async () => {
    try {
        await ConnectionDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`listening to the port ${port}...`)
        })
    }
    catch (err) {
        console.log({ ConnectionERR: err.message })
    }
}

start()

