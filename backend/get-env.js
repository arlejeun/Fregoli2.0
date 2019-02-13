const request = require('request')
	, url = require('url')
	, config = require('../config')

function GDemoEnv(username, callback) {
	var requestUrl = url.resolve(config.GDemoUrl, 'getenv.jsp')
	request.get({
		url: requestUrl,
		json: true,
		qs: {
			user: username
		}
	}, (error, response, body) => {
		if (error) {
			return callback(error)
		}
	
	    if (response.statusCode !== 200) {
	    	return callback(new Error(`Server returns status ${response.statusCode}`))
	    }

		callback(null, body)
	})
}

if (require.main === module) {
	GDemoEnv('sltest', (err, env) => {
		if (err) {
			console.error(err)
		} else {
			console.dir(env)
		}
	})
}

module.exports = GDemoEnv
