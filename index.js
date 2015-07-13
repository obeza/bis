#! /usr/bin/env node

var fs = require('fs');
var request = require('request');
var progress = require('request-progress');
var util = require('util')
var prompt = require('prompt');
var mkdirp = require('mkdirp');
var Storage = require('cli-storage')
  , storage = new Storage('obez', {});

// on supprime les 2 premiers arguments que donne le tableau 'process.argv'
var userArgs = process.argv.slice(2);


var dataListe = storage.get( 'dataListe' );

function onErr(err) {
    console.log(err);
    return 1;
}

function bisFindIndex(key){
	return dataListe.map(function(e){ return e.nom;}).indexOf(key);
}

var bisCreationFichier = function(){
	console.log("creation");
};

if (userArgs[0]==="help"){
	console.log("\n Commands for Bis : \n");
	console.log("add         add a url for a file in your favorite's list");
	console.log("rm <name>   remove a url in your favorite");
	console.log("list        list your favorite");
	console.log("dl <name>   download a file from your favorite");
	process.exit();
}

if (userArgs[0]==="add"){

	prompt.start();

	prompt.get(['nom', 'version', 'url'], function (err, result) {

    dataListe.push(result);
    storage.set( 'dataListe', dataListe );

    console.log('Vos favoris ont été mis à jour !');
    
  	});
}

if (userArgs[0]==="list"){
	console.log("Ma liste : \r");
	dataListe.forEach(function(l){
		console.log( " - " + l.nom + " v-" + l.version + "\r");
	});

	process.exit()
}

if (userArgs[0]==="rm"){
	if (userArgs[1]){
		var pos = bisFindIndex(userArgs[1]);
		dataListe.splice(pos, 1);
		storage.set( 'dataListe', dataListe );
		console.log('Vos favoris ont été mis à jour !');

	} else {
		console.log("\n Vous avez oublié le nom du fichier à télécharger. \n");
	}
	
}

if (userArgs[0]==="dl"){
	if (userArgs[1]){
		var dest = './';
		if (userArgs[2]){
			dest =  userArgs[2] + "/";
		}
		var pos = bisFindIndex(userArgs[1]);
		var fileUrl = dataListe[pos].url;
		var fileFs = dest + fileUrl.split("/").pop();
		console.log('filefs ' + fileFs);
		var mkdir = 'mkdir -p ' + dest;

		// on check s'il y a un répertoire,
		// si oui, on le créé
		mkdirp(dest, function (err) {
		    if (err) console.error(err)
		});

process.stdout.write('Downloading...');
intervalId = setInterval(function() { process.stdout.write('.'); }, 1000);

// Note that the options argument is optional 
var request = request(fileUrl);
progress(request, {
    throttle: 2000,  // Throttle the progress event to 2000ms, defaults to 1000ms 
    delay: 1000      // Only start to emit after 1000ms delay, defaults to 0ms 
})
.on('progress', function (state) {
    console.log('received size in bytes', state.received);
    // The properties bellow can be null if response does not contain 
    // the content-length header 
    console.log('total size in bytes', parseInt(request.response.headers['content-length']));
    console.log('percent', state.percent);
})
.on('error', function (err) {
    // Do something with err 
})
.pipe(fs.createWriteStream(fileFs))
.on('error', function (err) {
    // Do something with err 
})
.on('close', function (err) {
    // Saved to doogle.png!
    process.stdout.write(' done!\n');
    clearInterval(intervalId);
})

/*
fs.readdir( dest,function(err, file){
	console.log("no exist");
	//fs.createWriteStream(dest + "/" + fileFs));
	})
*/




	} else {
		console.log("\n Vous avez oublié le nom du fichier à télécharger. \n");
	}
	
}
