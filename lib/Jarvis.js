var necronomicon  = require("./Daemon.js"),
	Daemon        = necronomicon.Daemon,
	CommandScheme = necronomicon.CommandScheme;

(function() {

	var Jarvis = function(daemons) {

		if (false === (this instanceof Jarvis)) {
			console.log('Warning: Jarvis constructor called without "new" operator.');
			return new Jarvis(daemons);
		}

		this.name = "Jarvis";

		this.commandSchema.push(new CommandScheme(".*", "delegate"));

		this.delegate = function(phrase, context, output) {

			var command = phrase[0];

			for (var i = 0; i < daemons.length; i++) {

				if (daemons[i].canHear(command))
					daemons[i].listen(command, context, output)

			};
		}

	}

	Jarvis.prototype = new Daemon();

	module.exports.Jarvis = Jarvis;

})();