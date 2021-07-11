const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const indexController = require('./controllers/index');
const apiClanController = require('./controllers/api/clan');
const apiPlayerController = require('./controllers/api/player');
const apiScheduledMessageController = require('./controllers/api/scheduledMessage');

const hbs = require('hbs');
// https://github.com/pillarjs/hbs
require('handlebars-helpers')({
	handlebars: hbs.handlebars
});

const app = express();

app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const clashApiLoader = require('./ClashApiLoader');

const ClanProvider = require('./controllers/db/ClanProvider');
const clanProvider = new ClanProvider();
clanProvider.getClans().then(function() {
	clashApiLoader.load().then(function() {
		console.log('Clan Loaded');
	}).catch(function(err) {
		console.log('Unable to load clan:',err);
	});
});

let clan = null;
app.use(function(req,res,next) {
	if (clan === null) {
		clanProvider.getClanByTag(process.env.CLASH_CLAN_TAG).then(function (_clan) {
			clan = _clan;
			res.locals.clanId = clan['uuid'];
			next();
		});
	} else {
		res.locals.clanId = clan['uuid'];
		next();
	}
});

app.use(function(req,res,next) {
	res.locals.env = process.env.NODE_ENV;
	next();
});

app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/node_modules', express.static(path.join(__dirname,'node_modules/'),{ maxAge: 31557600000 }));

app.use('/', indexController);

app.use(apiClanController);
app.use(apiPlayerController);
app.use(apiScheduledMessageController);

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
