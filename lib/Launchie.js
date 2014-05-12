var necronomicon  = require('./Daemon.js')
  , Daemon        = necronomicon.Daemon
  , CommandScheme = necronomicon.CommandScheme;

var spawn = require('child_process').spawn;

(function() {

	var Launchie = function() {

		if(false === (this instanceof Launchie))
		{
			console.log('Warning: Launchie constructor called without "new" operator.');
			return new Launchie();
		}

		this.name = 'Launchie';

		this.commandSchema.push(new CommandScheme('launch (.*)', 'launchApp'));
		this.commandSchema.push(new CommandScheme('load (.*)', 'launchApp'));
		this.commandSchema.push(new CommandScheme('run (.*)', 'launchApp'));

		var library = {};

		library['league of legends'] = 'C:\\Riot Games\\League of Legends\\lol.launcher.exe';
		library['lol'] = 'C:\\Riot Games\\League of Legends\\lol.launcher.exe';
		library['chrome'] = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';



		var htmlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/i;

		this.launchApp = function(phrase, context, output) {

			if(htmlRegex.test(phrase))
				spawn(library['chrome'], [phrase[1]]);
			else
				spawn(library[phrase[1].toLowerCase()]);

		}
		
	}

	Launchie.prototype = new Daemon();

	module.exports.Launchie = Launchie;

})();
