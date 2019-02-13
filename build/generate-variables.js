const through = require('through2')
	, path = require('path')
	, gutil = require('gulp-util')
	, PluginError = gutil.PluginError

const TARGET_FILE_NAME = '_vars.scss'
	
function gulpPlugin() {
	return through.obj(function(file, encoding, callback) {
		if (file.isNull() || file.isDirectory()) {
			this.push(file)
			return callback()
		}

		if (file.isStream()) {
			this.emit('error', new PluginError({
				plugin: 'GenerateColors',
				message: 'Streams are not supported.'
			}))
			return callback();
		}
		
		if (file.isBuffer()) {
			var json = file.contents.toString('utf8')
			var cfg = eval('(' + json + ')')
			var colors = cfg.colors || {}
			var content = '';
			for (var key in colors) {
				if (colors.hasOwnProperty(key)) {
					content += `\$${key}-color: ${colors[key]};\r\n`
				}
			}

			var i = 1
			var images = []
			var carousel = cfg.home && cfg.home.carousel || []
			carousel.forEach(item => {
				images.push(item.image || `noname-${i}.jpg`);
				i++
			})
			var imageList = images.map(s => `'${s}'`).join(',')
			content += `\$carousel-images: ${imageList};\r\n`
			
			file.contents = new Buffer(content, 'utf8')
			var fileInfo = path.parse(file.path)
			file.path = path.join(fileInfo.dir, TARGET_FILE_NAME)
			
			this.push(file)
			return callback()
		}
	})
}

module.exports = gulpPlugin
