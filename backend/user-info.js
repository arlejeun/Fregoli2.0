var sql = require('mssql')
	, config = require('../config')

function UserInfo() {
	this.find = (connection, userId, callback) => {
		var stmt = 'SELECT * FROM UserInfo WHERE UserId = @userId'
		new sql.Request(connection)
			.input('userId', sql.Int, userId)
			.query(stmt)
			.then(recordset => {
				callback(null, recordset.length === 1 ? recordset[0] : {})
			}).catch(err => {
				callback(err)
			})
	}

	this.save = (connection, userId, data, callback) => {
		var stmt = 'IF EXISTS(SELECT 1 FROM UserInfo WHERE UserId = @userId)\
			BEGIN\
				UPDATE UserInfo SET NotificationChannelId = @channelId, GMMChannel = @gmmChannel, chat2Video = @chat2Video  WHERE UserId = @userId;\
			END ELSE BEGIN\
				INSERT INTO UserInfo(UserId, NotificationChannelId, GMMChannel, chat2Video) VALUES(@userId, @channelId, @gmmChannel, @chat2Video );\
			END'
		new sql.Request(connection)
			.input('userId', sql.Int, userId)
			.input('channelId', sql.Int, data.channelId)
			.input('gmmChannel', sql.Int, data.gmmChannel)
			.input('chat2Video', sql.Int, data.chat2Video)
			.query(stmt)
			.then(() => {
				callback()
			}).catch(err => {
				callback(err)
			})
	}
}	

if (require.main === module) {
	new sql.Connection(config.GBankConnect).connect().then(connection => {
		new UserInfo().find(connection, 21, (err, userInfo) => {
			if (err) {
				console.error(err)
			} else {
				console.dir(userInfo)
			}
			connection.close()
		})
	}).catch(err => {
		console.error(err)
	})
/*
	new sql.Connection(config.GBankConnect).connect().then(connection => {
		new UserInfo().save(connection, 250, {
			channelId: 4,
			gmmChannel: 2,
			chat2Video: 3
		}, (err, userInfo) => {
			if (err) {
				console.error(err)
			} else {
				console.dir(userInfo)
			}
			connection.close()
		})
	}).catch(err => {
		console.error(err)
	})
*/
}

module.exports = new UserInfo()
