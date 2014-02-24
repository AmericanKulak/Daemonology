// require( './lib' )
// 	.set( 'httpPort', 8787 )
// 	.start();

var Launchie = require('./lib/Launchie.js').Launchie;



var baseURL = 'https://www.google.com/search?q='

var search = ['TRANSIT LABS','CollegeSnapps','Degree Prospects','Edbacker','Flat World Knowledge','Flat World Knowledge, Inc.','Linked Senior','TypingClub','VentureBoard','Vibeffect','visitdays'];

for (var i = 0; i < search.length; i++) {
	var temp = search[i].replace(' ', '+');

	console.log(temp);

	var launchie = new Launchie();

	launchie.listen("launch " + baseURL + temp + "+founder");
};

