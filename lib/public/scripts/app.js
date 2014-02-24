
var socket = io.connect('http://localhost');
socket.on('output', function (obj) {
	$("#output").html(obj.html);
});

$(function(){

	$("#commandText").on('submit', function(e){
		e.preventDefault();

		var command = $("#command").val();
		$("#command").val("");

		$.ajax("/command", {
			type: "POST",
			data: { "command" : command }
		}).done(function( res ) {
			console.log(res);
		});
	});
});