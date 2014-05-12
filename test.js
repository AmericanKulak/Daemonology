var lunr = require('lunr');

var index = lunr(function(){
	this.field('body');
})

index.add({"id": 1, "body":"lunr.js is a simple full text search engine for your client side applications. It is designed to be small, yet full featured, browser enabling you to provide a great search experience without the need for external, server side, search services."});
index.add({"id": 2, "body":"lunr.js has no external dependencies, although it does require a modern browser with ES5 support. In older browsers you can use an ES5 shim, such as augment.js, to provide any missing JavaScript functionality."});

var nuIndex = lunr(function(){
	this.field('body');
})

nuIndex.add({"id": 1, "body":"lunr.js is a simple full text search engine for your client side applications. It is designed to be small, yet full featured, enabling you to provide a great search experience without the need for external, server side, search services."});

//console.dir(index.search(nuIndex.documentStore.store[1].elements));
console.dir(index.search("lunr.j"));
console.dir(index.search("lunr.js ice cream mother father wheeee"));
console.dir(index.documentVector(1));
