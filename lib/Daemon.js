(function() {

	var CommandScheme = function( regex, methodName ) {

		if(false === (this instanceof CommandScheme))
		{
			console.log('Warning: CommandScheme constructor called without "new" operator');
			return new CommandScheme( regex, methodName );
		}

		if(false === (regex instanceof RegExp))
			regex = new RegExp( regex, "i" );

		this.regex = regex;
		this.methodName = methodName;

		this.canDo = function( command ) {

			var ret = regex.test( command );
			regex.lastIndex = 0;
			return ret;
			
		}

		this.getTokens = function( command ) {

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

		this.commandSchema = [];

		this.vocabulary = function() {

			return this.commandSchema.map( function( el ){

				return el.regex;

			});

		}

		this.canHear = function( command ) {

			for (var i = 0; i < this.commandSchema.length; i++) {
				if(this.commandSchema[i].canDo( command ))
					return true;
			};

			return false;
		}

		this.listen = function( command, context, output )  {
			//Arg Validation/reassignment (optional context)

			//Screw context for now.
			for (var i = 0; i < this.commandSchema.length; i++) {
				if(this.commandSchema[i].canDo( command ))
				{
					this[this.commandSchema[i].methodName].call( this, this.commandSchema[i].getTokens( command ), context, output );
				}
			};

		}

		this.name = "Daemon";
	}

	module.exports.CommandScheme = CommandScheme;
	module.exports.Daemon = Daemon;

})();
