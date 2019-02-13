var express = require('express')
	, router = express.Router()
	, request = require('request')
	, extend = require('util')._extend
	, config = require('../config')
	, gdemoEnv = require('../backend/get-env')
	, utils = require('../backend/utils')

router.route('/')
	.post((req, res, next) => {
		var session = req.session
		var username = req.body.username
		var password = req.body.password

//		utils.sleep(5000)

		if (!username || !password) {
			return sendError(req, res, new Error('Invalid User Name or Password'))
		}

		//var appName = res.locals.vertical || 'noname'
		var appName = req.app.locals.appName

		doLogin(username, password, appName, (err, data) => {
			if (err) {
				return sendError(req, res, err)
			}

			gdemoEnv(username, (err, env) => {
				if (err) {
					return sendError(req, res, err)
				}

				getLocalData(env.GDemoHost, data['customer.customer_phone'], (err, localData) => {
					if (err) {
						return sendError(req, res, err)
					}

					var clientData = {
						authenticated: true,
						customer: extend(data, { local: localData }),
						env: env
					}
					
					session.authenticated = true
					session.clientData = clientData

					res.json(clientData)
					res.end()
				})
			})
		})
	})

var sendError = (request, response, err)	=> {
	request.session.destroy(() => {
		response.json({
			error: true,
			message: err.message || 'Sorry, but those login details are invalid.'
		})
		response.end()
	})
}

var doLogin = (username, password, appName, next) => {
	request.get({
		url: config.LoginServiceUrl,
		json: true,
		qs: {
			username: username,
			password: password,
			appName: appName
		}
	}, (error, response, body) => {
		if (error) {
			return next(error)
		}
		if (response.statusCode !== 200) {
			return next(new Error('Invalid User Name or Password'))
		}
		next(null, body)
	})
}

var getLocalData = (host, customerPhone, next) => {
	var url = config.GetContactUrl.replace('${host}', host)
	request.post({
		url: url,
		json: true,
		body: {
			contact_key: 'PFS_id',
			contact_value: customerPhone
		}
	}, (error, response, body) => {
		if (error) {
			return next(error)
		}
		if (response.statusCode !== 200) {
			return next(new Error('Server returns status code ' + response.statusCode))
		}
		next(null, body)
	})
}

module.exports = router
