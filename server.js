var port     		= process.env.PORT || 8080; // define app port

var express  		= require('express')
	, session  		= require('express-session')
	, cookieParser	= require('cookie-parser')
	, bodyParser	= require('body-parser')
	, morgan		= require('morgan')
	, passport		= require('passport')
	, flash			= require('connect-flash');


var app = express()
	, http			= require('http')
	, server		= http.createServer(app)
	, io			= require('socket.io').listen(server)
	, mysql			= require('mysql')
	, dbconfig		= require('./config/database')
	, mysqlPool		= mysql.createPool(dbconfig.connection);

require('./config/passport')(passport,mysqlPool);

// app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(express.static('static'));
app.use('/static', express.static('static'))

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({
	secret: 'robotxcpanelbyfarkasferenc',
	resave: true,
	saveUninitialized: true
 } ));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


require('./app/routes.js')(app, passport);
require('./app/deviceDatas.js')(io, mysqlPool);


// start robot-x ==================================================================
server.listen(port);
console.log('A vezérlőpult sikeresen elindult a következő porton: ' + port);
