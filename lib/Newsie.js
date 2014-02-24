var necronomicon = require("./Daemon.js")
  , Daemon = necronomicon.Daemon
  , CommandScheme = necronomicon.CommandScheme;

var FeedParser = require('feedparser')
  , request = require('request');

request('http://news.google.com?q=wildstar&output=rss')
  .pipe(new FeedParser([]))
  .on('error', function(error) {
    // always handle errors
    console.log(error);
  })
  .on('meta', function (meta) {
    // do something
    console.dir(meta);
  })
  .on('readable', function (some) {
    // do something else, then do the next thing
    console.dir(some);
  })

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
