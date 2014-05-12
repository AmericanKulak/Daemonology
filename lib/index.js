//Daemons
var Jarvis   = require('./Jarvis').Jarvis
  , Newsie   = require('./Newsie').Newsie
  , Launchie = require('./Launchie').Launchie;

//Server
var express        = require('express')
  , morgan         = require('morgan')
  , bodyParser     = require('body-parser')
  , methodOverride = require('method-override')
  , cookieParser   = require('cookie-parser')
  , session        = require('express-session')
  , path           = require('path')
  , http           = require('http')
  , app            = express()
  , server         = http.createServer(app)
  , io             = require('socket.io').listen(server, { log: false });

(function(){

	var config = {
		httpPort : 12333
	};


	exports.set = function set(key, value) {

		if(typeof config[key] !== "undefined")
			config[key] = value;

		return this;

	}

	exports.start = function start() {

		var outputWriter = function(output) {
			console.log("No output writer supplied, using default.");
			console.log(output);
		};
		

		console.log('Loading configs!');
		setupJadeViewEngine();
		setupExpressDefaults();
		
		console.log('Loading routes...');
		setupButlerRoutes();

		console.log('Launching Server');
		server.listen(config.httpPort);

		console.log('Setting up Socket Output Listener');
		setupSocketOutputListener();		
		console.log('Ready to Go!');






		function setupJadeViewEngine()
		{
			app.set('views', __dirname + '/views');
			app.set('view engine', 'jade');
			app.locals.basedir = __dirname + '/views';
		}

		function setupExpressDefaults()
		{
			//Logging
			app.use(morgan('dev'));

			//Body -> Json Obj
			app.use(bodyParser());

			//app.put, app.delete
			app.use(methodOverride());

			//cookie encryption
			app.use(cookieParser('my most secret phrase'));

			//session storage
			app.use(session({secret: 'fudge monkeys'}));

			//static path
			app.use(express.static(path.join(__dirname, 'public')));
		}

		function setupButlerRoutes()
		{
			var butler = new Jarvis( [ new Newsie(), new Launchie() ] );

			app.all('/jarvis', function(req, res) {	res.render('index'); });

			app.post('/command', function(req, res) {
				res.send(200);

				butler.listen(req.body.command, null, outputWriter)
			});
		}

		function setupSocketOutputListener()
		{
			var client = {
				isActive : false,
				socket : null,
				queuedMessage : '',

				connect : function(connectedSocket){
					this.socket = connectedSocket;
					this.isActive = true;

					if(this.queuedMessage)
						this.message(this.queuedMessage);
				},

				disconnect : function(){
					this.socket = null;
					this.isActive = false;
				},

				message : function(data){
					if(this.isActive)
					{
						this.socket.emit('output', { html: data });
						this.queuedMessage = '';
					}
					else
					{
						this.queuedMessage = data;
						require('child_process').spawn('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', ['localhost:8787/jarvis']);
					}
				}
			};

			outputWriter = function(output){
				client.message(output);
			}

			io.sockets.on('connection', function(socket) {
				console.log('connected');
				client.connect(socket);

				socket.on('disconnect', function() {
					console.log('disconnected');
					client.disconnect();
				});
			});
		}

	}

})();