
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var createError = require('http-errors')

var router = require('./routes/index')

var app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// все роуты
app.use('/', router)

// ловим 404 и передаём в обработчик ошибок
app.use((req, res , next) => {
  next(createError(404))
})

// обработчик ошибок
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
