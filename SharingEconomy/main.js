const express = require('express')
const router = express.Router();
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index');
const location = require('./routes/writeLocation')
const port = process.argv[4] // port

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use('/', indexRouter)
app.use('/location', location)

app.use(function (request, response, next) {
    response.status(404).send('Not Found 404..')
})

app.use(function (err, request, response, next) {
    console.log(err.stack)
    response.status(500).send('500Error')
})

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
})
