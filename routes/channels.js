var express = require('express')
	, router = express.Router()
	, sql = require('mssql')
	, config = require('../config')
	, UserInfo = require('../backend/user-info')

router.route('/')
	.get((req, res, next) => {
		var session = req.session
		var userId = session.clientData.customer['user.user_id']
	
		connect((err, connection) => {
			if (err) {
				return next(err)
			}

			getChannels(connection, userId, (err, userInfo) => {
				connection.close()
			
				if (err) {
					return next(err)
				}

				res.json({
					channelId: userInfo.NotificationChannelId,
					gmmChannel: userInfo.GMMChannel,
					chat2Video: userInfo.chat2Video
				})
			})
		})
	})
	.post((req, res, next) => {
		var session = req.session
		var userId = session.clientData.customer['user.user_id']
		var channelId = req.body.channel
		var gmmChannel = req.body.gmmChannel
		var chat2Video = req.body.chat2Video

		if (!userId || !channelId || !gmmChannel || !chat2Video) {
			res.status(403)
			res.send('Forbidden')
			return next(null)
		}

		channelId = parseInt(channelId)
		gmmChannel = parseInt(gmmChannel)
		chat2Video = parseInt(chat2Video)

		connect((err, connection) => {
			if (err) {
				return next(err)
			}

			saveChannels(connection, {
				userId: userId,
				channelId: channelId,
				gmmChannel: gmmChannel,
				chat2Video: chat2Video
			}, err => {
				connection.close()

				if (err) {
					return next(err)
				}

				res.end('ok')
			})
		})
	})

var connect = next => {
	new sql.Connection(config.GBankConnect).connect().then(connection => {
		next(null, connection)
	}).catch(err => {
		next(err)
	})
}

var getChannels = (connection, userId, next) => {
	UserInfo.find(connection, userId, (err, userInfo) => {
		if (err) {
			return next(err)
		}
		return next(null, userInfo)
	})
}
	
var saveChannels = (connection, data, next) => {
	UserInfo.save(connection, data.userId, {
		channelId: data.channelId,
		gmmChannel: data.gmmChannel,
		chat2Video: data.chat2Video
	}, err => {
		next(err)
	})
}

module.exports = router
