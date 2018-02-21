const express = require('express')
const bodyParser = require('body-parser')
const sourceRoute = require('./routes/Source')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/source', sourceRoute)

app.listen(5000)
