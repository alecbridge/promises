function fetchJSON(url) {
  return fetch(url).then(function(response) {
    var contentType = response.headers.get("content-type");
    if(contentType && contentType.indexOf("application/json") !== -1) {
      return response.json();
    } else {
      console.log("Oops, we haven't got JSON!");
    }
  });
}

function marvelFactory(config) {
  return function(path) {
    var timestamp = new Date().getTime();
    var hash = CryptoJS.MD5(timestamp + config.privateKey + config.publicKey).toString();
    var url = config.hostname + '/v' + config.version + '/public' + path + '?apikey=' + config.publicKey + '&ts=' + timestamp + '&hash=' + hash;
    console.log(url);

    return fetchJSON(url);
  }
}

// Get an instance of the marvel api
var marvel = marvelFactory({
  hostname: 'http://gateway.marvel.com',
  publicKey: '05a3448298ed9a5694ebd41543a831cc',
  privateKey: 'b99daadb62bcad353720f66de1dba592b0604ddf',
  version: '1'
});

// Make a call using the api
marvel('/characters').then(function(response) { 
  response.data.results.map(function(character){
    var img = character.thumbnail.path + '.' + character.thumbnail.extension;
    console.log(img);
  }); 
});

