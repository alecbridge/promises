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
  publicKey: '9228da88dd1a2a154f40ddbaf5f7d37b',
  privateKey: '1a274b4e099b1110ac94cb3772e82705be286c3f',
  version: '1'
});

// 1. Sign up for the marvel api: https://developer.marvel.com  </DONE>
// 2. Get your public and private key from: https://developer.marvel.com/account  </DONE>
// 3. Replace the above config with your own public and private key </DONE>
// 4. On the account page, a new allowed referer: localhost </DONE>
// 5. Make sure you hit update! </DONE>
// 6. Fork jimthedev/promises on github  </DONE>
// 7. Clone <<yourusername>>/promises from github to your computer </DONE>
// 8. cd in your promises folder and run `npm install`. </DONE>
// 9. Modify marvel.js to add the name of the character as well. </DONE>
// 10.You can run a server with: `./node_modules/.bin/http-server`  </DONE>
// 11.Once the server is running, you can see the code at:  </DONE>
//       http://localhost:8080/marvel.html
//

// Make a call using the api
marvel('/characters').then(function(json) { 
  json.data.results.map(function(character){
    
    var characterContainer = document.createElement('character');
    var imgPath = character.thumbnail.path + '.' + character.thumbnail.extension;
    var name = character.name;

    var img = document.createElement('img'); // Create an element node
    img.setAttribute('src', imgPath); // Set some properties on the node
  //  document.querySelector('body').appendChild(img); // Attached the node to the document

    var nameTag = document.createElement('character-name');
    var nameTextNode = document.createTextNode(name);
    
    var nameLinkNode = document.createElement('a');
    nameLinkNode.setAttribute('href', 'https://www.google.com/#q=' + encodeURIComponent(name));
    nameLinkNode.appendChild(nameTextNode);

    nameTag.appendChild(nameLinkNode);

    document.querySelector('body').appendChild(nameTag);

    characterContainer.appendChild(nameTag);
    characterContainer.appendChild(img);

    var container = document.querySelector('characters');
    container.appendChild(characterContainer);

  }); 
});



