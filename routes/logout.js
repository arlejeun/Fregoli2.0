var express = require('express')
	, router = express.Router()

router.route('/')
	.get(function(req, res) {
	    var vertical = res.locals.vertical ? res.locals.vertical
	    	: (req.cookies.vertical || 'default')
	    var language = req.cookies.language
		var session = req.session
		session.destroy(err => {
			var url = req.app.get('contextPath') +
				(language ? `/${vertical}/${language}/home` : `/${vertical}/home`)
			res.redirect(url)
		})
	})
	
module.exports = router
	