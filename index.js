#! /usr/bin/env node

//var jsonfile = require('jsonfile');
var Download = require('download');
//var data = require("./data.json")
var util = require('util')
var prompt = require('prompt');

var Storage = require('cli-storage')
  , storage = new Storage('obez', {});


//var maListe = jsonfile.readFileSync( file);


// on supprime les 2 premiers arguments que que donne le tableau 'process.argv'
var userArgs = process.argv.slice(2);


//storage.set( 'dataListe', data )

/*	Traitement des arguments */

var dataListe = storage.get( 'dataListe' );

//console.log( 'foo = ' + data[0].nom );

if (userArgs[0]==="help"){
	//storage.set( 'foo', userArgs[1] );
	console.log("\n Liste des arguments pour la commande. \n");
	process.exit();
}

function onErr(err) {
    console.log(err);
    return 1;
  }

if (userArgs[0]==="add"){

	prompt.start();

  //
  // Get two properties from the user: username and email
  //
  prompt.get(['nom', 'version', 'url'], function (err, result) {
    //
    // Log the results.
    //
    dataListe.push(result);
    storage.set( 'dataListe', dataListe );

    console.log('Vos favoris ont été mis à jour !');
    
  });

  
/*
	console.log("\n name ? : ", util.inspect(dataAjouter.nom));
	console.log("\n version ? : ", util.inspect(dataAjouter.version));
	console.log("\n url ? : ", util.inspect(dataAjouter.url));
*/

	//process.exit()
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
		
		var pos = dataListe.map(function(e){ return e.nom;}).indexOf(userArgs[1]);

		dataListe.splice(pos, 1);
		storage.set( 'dataListe', dataListe );
		console.log('Vos favoris ont été mis à jour !');

	} else {
		console.log("\n Vous avez oublié le nom du fichier à télécharger. \n");
	}
	
}

if (userArgs[0]==="dl"){
	if (userArgs[1]){
		//console.log('dl ' + userArgs[1]);
		var dest = './';
		if (userArgs[2]){
			dest = userArgs[2];
		}
		dataListe.forEach(function(l){
			if (l.nom===userArgs[1]){ 
				console.log("check " + l.url);
				new Download({mode: '755'})
    				.get(l.url)
    				.dest(dest)
    				.run();
			}
			//console.log( " - " + l.nom + " v-" + l.version + "\r");
		});
		//console.log('\n url : ' + maListe[])


	} else {
		console.log("\n Vous avez oublié le nom du fichier à télécharger. \n");
	}
	
}
