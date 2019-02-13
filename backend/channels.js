var sql = require('mssql')
	, config = require('../config')

function Channels() {
	this.findAll = (connection, callback) => {
		var stmt = 'SELECT Id, Code, Name FROM NotificationChannel ORDER BY Ord'
		new sql.Request(connection)
			.query(stmt)
			.then(recordset => {
				var res = []
				recordset.forEach(rs => {
					res.push({ id: rs.Id, code: rs.Code, name: rs.Name })
				})
				callback(null, res)
			}).catch(err => {
				callback(err)
			})
	}
}	

if (require.main === module) {
	new sql.Connection(config.GBankConnect).connect().then(connection => {
		new Channels().findAll(connection, (err, channels) => {
			if (err) {
				console.error(err)
			} else {
				console.dir(channels)
			}
			connection.close()
		})
	}).catch(err => {
		console.error(err)
	})
}

module.exports = new Channels()
