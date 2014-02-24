(function() {

	var CommandScheme = function( regex, methodName ) {

		if(false === (this instanceof CommandScheme))
		{
			console.log('Warning: CommandScheme constructor called without "new" operator');
			return new CommandScheme( regex, methodName );
		}

		if(false === (regex instanceof RegExp))
			regex = new RegExp( regex, "gi" );

		this.regex = regex;
		this.methodName = methodName;

		var canDo = this.canDo = function( command ) {

			var ret = regex.test( command );
			regex.lastIndex = 0;
			return ret;
			
		}

		var getTokens = this.getTokens = function( command ) {

			var ret = regex.exec( command );
			regex.lastIndex = 0;
			return ret;

		}
	}

	var Daemon = function() {

		if(false === (this instanceof Daemon))
		{
			console.log('Warning: Daemon constructor called without "new" operator.');
			return new Daemon();
		}

		var commandSchema = this.commandSchema = [];

		var vocabulary = this.vocabulary = function() {

			return this.commandSchema.map( function( el ){

				return el.regex;

			});

		}

		var canHear = this.canHear = function( command ) {

			for (var i = 0; i < commandSchema.length; i++) {
				if(commandSchema[i].canDo( command ))
					return true;
			};

			return false;
		}

		var listen = this.listen = function( command, context, output )  {
			//Arg Validation/reassignment (optional context)

			//Screw context for now.
			for (var i = 0; i < commandSchema.length; i++) {
				if(commandSchema[i].canDo( command ))
				{
					this[commandSchema[i].methodName].call( this, commandSchema[i].getTokens( command ), context, output );
				}
			};

		}

		var name = this.name = "Daemon";

	}

	module.exports.CommandScheme = CommandScheme;
	module.exports.Daemon = Daemon;

})();
