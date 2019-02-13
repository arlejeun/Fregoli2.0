var showdown  = require('showdown')
	, converter = new showdown.Converter()

converter.setOption('noHeaderId', true)
	
var sleep = delayInMSec => {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > delayInMSec) {
			break;
		}
	}
}

var convertMarkdown = text =>  {
	return converter.makeHtml(text)
}

if (require.main === module) {
	sleep(3000)
	console.log(convertMarkdown('#hello, markdown!'))
} else {
	exports.sleep = sleep
	exports.convertMarkdown = convertMarkdown
}

