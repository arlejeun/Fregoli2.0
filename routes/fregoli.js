var express = require('express')
	, sql = require('mssql')
	, path = require('path')
	, fs = require('fs')
	, router = express.Router()
	, config = require('../config')
	, utils = require('../backend/utils')
	, Channels = require('../backend/channels')
	
function loadMarkdownFile(dir, language, filename) {
	var filePath = null
	if (language) {
		filePath = path.join(dir, language, 'md', filename)
		if (!fs.existsSync(filePath)) {
			filePath = null
		}
	}
	
	 if (filePath === null) {
		filePath = path.join(dir, 'md', filename)
	}

	if (!fs.existsSync(filePath)) {
		return null;
	}

	return fs.readFileSync(filePath, 'utf8');
}
	
function markdown(req, res, s) {
	var match = /^\s*file\s*\(([^/)]+)\)\s*$/.exec(s)
	if (match !== null) {
		var filename = match[1].trim()
		var dir = path.join(req.app.get('verticalsDir'), res.locals.vertical)
		var language = res.locals.language
		s = loadMarkdownFile(dir, language, filename)
		if (s === null) {
			s = `File **${filePath}** not found`
		}
	}
	return utils.convertMarkdown(s)
}

router.route('/')
	.get(function(req, res, next) {
		
		/*new sql.Connection(config.GBankConnect).connect().then(connection => {
			Channels.findAll(connection, (err, channels) => {
				connection.close()
				if (err) {
					return next(err)
				}

				res.render('fregoli', {
				    title: 'Home',
				    message: '',
				    channels: channels,
				    markdown: s => {
				    	return markdown(req, res, s)
				    }
				})
			})
		}).catch(err => {
			console.error(err)
		})*/

		// Temporary
		var channels = [{ id: 3, code: 'phone', name: 'Phone' }];
		res.render('fregoli', {
			title: 'Home',
			message: '',
			channels: channels,
			markdown: s => {
				return markdown(req, res, s)
			}
		})

	});

module.exports = router
