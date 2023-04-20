var createError = require('http-errors');
var express = require('express');
var path = require('path');
const flash=require('connect-flash');
const session=require('express-session')
const bodyParser=require('body-parser');
var cookieParser = require('cookie-parser');
var hbs=require('express-handlebars');
var logger = require('morgan');
const mongoose=require('mongoose')

var userRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// view engine setup


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.engine('.hbs',hbs.engine({extname:'.hbs',defaultLayout:'layout',layoutsDir:__dirname +'/views/layout/',partialsDir:__dirname +'/views/partials/'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret:'mysecret',
  cookie:{maxAge:600000},
  resave:false,
  saveUninitialized:false
}))
app.use(flash())

app.use((req,res,next)=>{
  res.locals.message=req.flash();
  next();
});


const Connection=('mongodb+srv://sanojcsam123:rJrBBcju6xYmc5mi@debateapi.hymyl4r.mongodb.net/debate_db?retryWrites=true&w=majority')

mongoose.connect(Connection)
.then((res)=>{
   console.log("database connected successfully  $ server running port  3000");
}).catch((err)=>{
  console.log("error:" +err);
})

app.use('/', userRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
