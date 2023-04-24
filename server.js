const  express = require('express');
const  env = require('dotenv').config()
const  ejs = require('ejs');
const  path = require('path');
const  app = express();
const  bodyParser = require('body-parser');
const  mongoose = require('mongoose');
const  session = require('express-session');
const MongoStore = require('connect-mongo')
const passport = require('passport')
const {initializingPassport} = require('./config/passportConfig')


 const DB = "mongodb+srv://shu810:shu810@cluster0.uub44.mongodb.net/quizdb?retryWrites=true&w=majority"
// const DB= "mongodb+srv://Mindbrick:Password@mindbrick.zdiyp2p.mongodb.net/quizdb?retryWrites=true&w=majority"

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(error));

const  db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

//session authentication....
app.use(session({
  secret: 'foo',
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: MongoStore.create({
    mongoUrl:DB,
    touchAfter: 24 * 3600,
    auto_reconnect: true,
    autoRemove:'interval',
    autoRemoveInterval:10 //in minutes----
  })
}));
initializingPassport(passport)
app.use(passport.initialize())
app.use(passport.session())

global.__basedir = __dirname + "/..";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

require('./routes/quiz')(app)
// require('./routes/admin')(app)
// require('./routes/index')(app)
// require('./routes/project')(app)






app.use(function (req, res, next) {
  const  err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});
const PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
  console.log('Server is started on http://127.0.0.1:'+PORT);
});
