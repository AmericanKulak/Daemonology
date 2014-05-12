var FeedParser = require('feedparser')
  , request = require('request')
  , S = require('string');

request('https://news.google.com/news/feeds?q=visual+studio&output=rss')
  .pipe(new FeedParser([]))
  .on('error', function (error) {
    console.error(error);
  })
  .on('meta', function (meta) {
    console.log('===== %s =====', meta.title);
  })
  .on('readable', function() {
    var stream = this, item;
    while (item = stream.read()) {
      //console.log('Got article: %s', item.title + " - " + S(item.description).stripTags().decodeHTMLEntities().s);
      //console.log(Object.keys(item))

      //var regex = /url=(.*)/i;

      //console.log(regex.exec(item.link)[1]);
    }
  })
  .on('end', function() {
    console.log("ended");
  });