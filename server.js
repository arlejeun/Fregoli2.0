const express = require('express')
	, logger = require('morgan')
	, compression = require('compression')
	, bodyParser = require('body-parser')
	, cookieParser = require('cookie-parser')
	, csrf = require('csurf')
	, session = require('express-session')
	, minify = require('express-minify')
	, path = require('path')
	, fs = require('fs')
	, extend = require('util')._extend
	, config = require('./config')
	, utils = require('./backend/utils')
	, verticalConfig = require('./backend/vertical-config.js')
	, app = express()
  
const fregoli = require('./routes/fregoli')
	, login = require('./routes/login')
	, logout = require('./routes/logout')
	, channels = require('./routes/channels')

const publicDir = path.join(__dirname, 'public')
	, verticalsDir = path.join(__dirname, 'verticals')
	
console.log('Environment: ' + app.get('env'))

app.set('contextPath', config.ContextPath || '')
app.set('verticalsDir', verticalsDir)

app.locals.appName = 'Fregoli'
app.locals.contextPath = app.get('contextPath')
app.locals.WebSiteUrl = config.WebSiteUrl
app.locals.markdown = utils.convertMarkdown

app.engine('ejs', require('ejs-locals'));
app.set('view engine', 'ejs')
app.set('views', './views');
if (app.get('env') === 'production') {
	var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
	app.use(logger('combined',  { stream: accessLogStream }))
} else {
	app.use(logger('dev'))
}
app.use(compression())
if (app.get('env') === 'production') {
	app.use(minify())
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(express.static(publicDir))
app.get('/:verticalName/images/*', (req, res, next) => {
	var language = req.cookies.language
	if (!language) {
		return next()
	}

	var vertical = req.params.verticalName
	var filePath = path.join(verticalsDir, vertical, language, 'images', req.params['0'])
	if (!fs.existsSync(filePath)) {
		return next()
	}

	nocache(req, res, () => {
		var filename = path.basename(filePath)
		res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
		res.sendFile(filePath)
	})	
})
app.use(express.static(verticalsDir))

app.use(session({
	secret: 'k1KequNfPq0qGNCZG7aM',
	resave: true,
	saveUninitialized: true,
	cookie: {
		maxAge: 1800000
	},
	rolling: false
}))

function nocache(req, res, next) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
	res.header('Expires', '-1')
	res.header('Pragma', 'no-cache')
	next()
}

function authenticated(req, res, next) {
	var session = req.session
	if (session.authenticated) {
		return next()
	}

	res.status(403)
	res.send('Forbidden')
}

app.get('/heartbeat', nocache, (req, res, next) => {
	var session = req.session
	res.json({ authenticated: session.authenticated || false })
	res.end()
})

app.use((req, res, next) => {
    if ('HEAD' == req.method || 'OPTIONS' == req.method) return next();

    // break session hash / force express to spit out a new cookie once per second at most
    req.session._garbage = Date()
    req.session.touch()

    next()
})

/* CSRF handling
app.use(csrf())

app.use((err, req, res, next) => {
	if (err.code !== 'EBADCSRFTOKEN') return next(err)
 
	// handle CSRF token errors here
	res.status(403).send('Session has expired or form tampered with')
})
*/

function setupLocalVars(req, res, next) {
	var session = req.session
	var customerPhone = ''
	var firstName = ''
	var lastName = ''
	res.locals.csrfToken = req.csrfToken && req.csrfToken() || ''
	res.locals.authenticated = session.authenticated
    	res.locals.siteData = {
		csrfToken: req.csrfToken && req.csrfToken() || '',
		appName: app.locals.appName,
		siteRoot: app.get('contextPath')
	}
	if (session.authenticated) {
		var customer = session.clientData.customer
		customerPhone = customer['customer.customer_phone'] || ''
		firstName = customer['user.first_name']
		lastName = customer['user.last_name']
		
		res.locals.siteData = extend(res.locals.siteData, {
			authenticated: true,
			customer: session.clientData.customer,
			env: session.clientData.env
		})
	}

	res.locals.customerPhone = customerPhone
	res.locals.firstName = firstName
	res.locals.lastName = lastName
	
	next()
}

app.use(setupLocalVars)

app.param('vertical', (req, res, next, value) => {
	var language = req.params.language
	var vertical = value

	var verticalDir = path.join(verticalsDir, vertical)
	var cfg = verticalConfig(verticalDir, language)
	if (cfg === null) {
		console.error(`File not found ${vertical}/fregoli.cfg`)
//		return next(new Error(`Could not resolve a vertical '${vertical}'`))
		res.render('errors/error', {
			message: `Could not resolve a vertical **${vertical}**`
		})
		return;
	}

	res.cookie('language', language || '', { httpOnly: true })
	res.cookie('vertical', vertical || '', { httpOnly: true })
	res.locals.vertical = vertical
	res.locals.appTitle = vertical.charAt(0).toUpperCase() + vertical.slice(1)
	res.locals.verticalPath = app.get('contextPath') + '/' + vertical
	res.locals.verticalConfig = cfg
	res.locals.language = language
	res.locals.siteData.settings = (cfg && cfg.client_settings) || {}
	res.locals.siteData.appTitle = res.locals.appTitle
	next()
})

if (app.get('env') === 'development') {
	app.use('/session', nocache, (req, res) => {
		res.set('Content-Type', 'text/html')
		res.write('<pre>')
		res.write('Session ID: ');
		res.write(req.sessionID);
		res.write('\r\n');
		res.write(JSON.stringify(req.session, null, 4))
		res.write('</pre>')
		res.end()
	})
}

app.use('/:vertical/login', nocache, login)
app.use('/login', nocache, login)
app.use('/channels', nocache, authenticated, channels)
app.use('/:vertical?/logout', nocache, logout)
app.use('/:vertical/:language?/home', nocache, fregoli)

app.get('/', (req, res, next) => {
	res.sendFile('/index.htm', { root: path.join(__dirname, 'public') });
})

var port = /*process.env.PORT*/ config.Port || 3000
app.listen(port, () => {
	console.log('Listening on http://localhost:' + port)
})
