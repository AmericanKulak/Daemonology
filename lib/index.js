var Jarvis   = require('./Jarvis').Jarvis
  , Newsie   = require('./Newsie').Newsie
  , Launchie = require('./Launchie').Launchie;

var express = require('express')
  , http    = require('http')
  , path    = require('path')
  , app     = express()
  , server  = http.createServer(app)
  , io      = require('socket.io').listen(server, { log: false });

(function(){

	var httpPort = 12333;

	exports.set = function set(key,value) {

		switch(key)
		{
			case 'httpPort':
				httpPort = value;
				break;

			// case 'connectionString' :
			// 	connectionString = value;
			// 	break;

			// case 'ipConfig':
			// 	ipConfig = value;
			// 	break;

		}

		return this;

	}

	exports.start = function start() {

		//MongoClient.connect(connectionString , function(err, db) {

		var activeConnection = false;
		var activeSocket = null;
		var storedResponse = "";

		var butler = new Jarvis( [ new Newsie(), new Launchie() ] );

		console.log('Loading configs!');
		app.configure(function(){
			app.set('port', process.env.PORT || httpPort );
			app.set('views', __dirname + '/views');
			app.set('view engine', 'jade');
			app.locals.basedir = __dirname + '/views';
			app.use(express.logger('dev'));
			app.use(express.urlencoded())
			app.use(express.json())
			app.use(express.methodOverride());
			app.use(express.cookieParser('the most secret phrase'));
			app.use(express.session({secret:'fudge monkeys'}));
			app.use(app.routes);
			app.use(express.static(path.join(__dirname, 'public')));
		});

		console.log('Loading Dev Error Logger');

		app.configure('development', function(){
			app.use(express.errorHandler());
		});

		console.log('Loading routes...');
		//login
		
		//app.all('*', ensureAuthed);
		app.all('/jarvis', function(req, res) {
			res.render('index');
		});

		app.post('/command', function(req, res) {
			res.send(200);

			var command = req.body.command;

			butler.listen(command, { connected: activeConnection }, outputter)
		});

		server.listen(httpPort);


		var outputter = function(output){
			if(activeConnection)
			{
				activeSocket.emit('output', { html: output });
				storedResponse = "";
			}
			else
			{
				storedResponse = output;
				require('child_process').spawn("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe", ['localhost:8787/jarvis']);
			}
		}

		io.sockets.on('connection', function(socket) {
			console.log("connected");
			activeConnection = true;
			activeSocket = socket;
			if(storedResponse)
				outputter(storedResponse);

			socket.on('disconnect', function() {
				console.log("disconnected");
				activeConnection = false;
				activeSocket = null;
			});
		});

		
		console.log('Ready to Go!');
	}

})();