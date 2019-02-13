const FREGOLI_CONFIG = 'fregoli.cfg'
	, SETTINGS_CONFIG = 'settings.cfg'

const path = require('path')
	, fs = require('fs')
	, merge = require('deepmerge')

function loadConfigFromFile(filePath) {
	if (!fs.existsSync(filePath)) {
		return null
	}
	var json = fs.readFileSync(filePath, 'utf8')
	return eval('(' + json + ')')
//	return JSON.parse(json)
}

function buildFilePath(verticalDir, filename, language) {
	return language ? path.join(verticalDir, language, filename)
		: path.join(verticalDir, filename)
}

function loadVerticalConfig(verticalDir, language) {
	var filePath = buildFilePath(verticalDir, FREGOLI_CONFIG, language)
	var cfg = loadConfigFromFile(filePath)

	filePath = buildFilePath(verticalDir, SETTINGS_CONFIG, language)
	var settings = loadConfigFromFile(filePath)

	if (!settings) {
		return cfg
	}

	if (cfg === null) {
		cfg = {}
	}

	if (settings) {
		if (typeof(cfg.client_settings) === 'object') {
			cfg.client_settings = merge(cfg.client_settings, settings)
		} else {
			cfg.client_settings = settings
		}
	}	

	return cfg;
}

function verticalConfig(verticalDir, language) {
	var cfg = loadVerticalConfig(verticalDir)
	if (cfg === null) {
		return null;
	}

	if (!language) {
		return cfg;
	}

	var localCfg = loadVerticalConfig(verticalDir, language)
	if (localCfg) {
		cfg = merge(cfg, localCfg)
	}

	return cfg
}

module.exports = verticalConfig
