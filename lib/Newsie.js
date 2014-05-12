var necronomicon  = require("./Daemon.js")
  , Daemon        = necronomicon.Daemon
  , CommandScheme = necronomicon.CommandScheme;

var FeedParser = require('feedparser')
  , request    = require('request');


(function() {

	var Newsie = function() {

		if(false === (this instanceof Newsie))
		{
			console.log('Warning: Newsie constructor called without "new" operator.');
			return new Newsie();
		}

		this.name = "Newsie";

		this.commandSchema.push(new CommandScheme("fetch (.*)", "fetchNews"));

		this.fetchNews = function(phrase, context, output) {
			output("<strong>"+phrase[1]+"</strong>");
		}
	}

	Newsie.prototype = new Daemon();

	module.exports.Newsie = Newsie;

})();
