var config = {
	//ContextPath: '',
	Port: 9990,
	LoginServiceUrl: 'https://demo.genesyslab.com/gdemoproxy/user/login',
	GetContactUrl: 'https://${host}/pfsproxy/pfsmobileproxy/getcontact',
	GDemoUrl: 'http://demo.genesyslab.com/gdemo/',
	GBankConnect: {
		user: 'sa',
		password: 'sqlgenesys',
		server: 'localhost',
		database: 'GBank'
	}
};

module.exports = config;
