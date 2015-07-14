#! /usr/bin/env node

var Download = require('download');
var downloadStatus = require('download-status');
var prompt = require('prompt');
var mkdirp = require('mkdirp');
var Storage = require('cli-storage')
  , storage = new Storage('bisCli', {});

// on supprime les 2 premiers arguments que donne le tableau 'process.argv'
var userArgs = process.argv.slice(2);

var data = storage.get( 'dataListe' );
var dataListe = (data) ? data : [];

function bisFindIndex(key){
	return dataListe.map(function(e){ return e.nom;}).indexOf(key);
}

if (userArgs[0]==="help" || !userArgs[0]){
	console.log("\n Commands for Bis : \n");
	console.log("add         add a url for a file in your favorite's list");
	console.log("rm <name>   remove a url in your favorite");
	console.log("list        list your favorite");
	console.log("dl <name>   download a file from your favorite \n");
	process.exit();
}

if (userArgs[0]==="add"){

	prompt.start();

	prompt.get(['nom', 'version', 'url'], function (err, result) {

		if (result.nom && result.url){
	    	dataListe.push(result);
	    	storage.set( 'dataListe', dataListe );

	    	console.log('Your favorites list has been updated !');
	    } else {
	    	console.log('The name or url was empty !');
	    }
  	});
}

if (userArgs[0]==="list"){
	
	if (dataListe.length>0){
		console.log("Your favorite list : \r");
		dataListe.forEach(function(l){
			console.log( " - " + l.nom + " v-" + l.version + "\r");
		});
	} else {
		console.log('Your favorite list is empty.')
	}

}

if (userArgs[0]==="rm"){
	if (userArgs[1]){
		var pos = bisFindIndex(userArgs[1]);
		dataListe.splice(pos, 1);
		storage.set( 'dataListe', dataListe );
		console.log('Your favorites list has been updated !');

	} else {
		console.log("\n You forget the name. \n");
	}
	
}

if (userArgs[0]==="dl"){
	if (userArgs[1]){
		var dest = './';
		if (userArgs[2]){
			dest =  './' + userArgs[2] + "/";
		}
		var pos = bisFindIndex(userArgs[1]);
		var fileUrl = dataListe[pos].url;
		//var fileFs = dest + fileUrl.split("/").pop();

		var download = new Download({ extract: true, strip: 1 })
	    .get(fileUrl)
	    .dest(dest)
	    .use(downloadStatus())
	    .run(function(){
	    	console.log('Done !');
	    });

	} else {
		console.log("\n You forget the name to download \n");
	}
	
}
