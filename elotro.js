const SpotifyWebApi = require('spotify-web-api-node')
const userservice = require('./src/service/user.service')



const spotifyApi = new SpotifyWebApi();


function RetrieveTokenInformation () {
    return userservice.getToken('BearerToken')
}



window.addEventListener('load', () => {

    RetrieveTokenInformation().then( info => {
        setAccessToken( info[0].access_token)
        getAlbums()
    })

})


function setAccessToken ( token ){
    spotifyApi.setAccessToken( token );
}

function createElement ( tag ) {
    return window.document.createElement(tag)
}

async function getAlbums () {
    const albums = await spotifyApi.getMySavedAlbums({limit:50});

    let ul = createElement( "ul" )

    albums.body.items.forEach( element => {

        let li = createElement( "li" )
    
        console.log(element.album.name+' de '+ element.album.artists[0].name)

        li.textContent = element.album.name+' de '+ element.album.artists[0].name;

        ul.appendChild( li )

    })
    
    window.document.getElementById('hola').appendChild( ul )
}

/* 
      (async () => {
            const albums = await spotifyApi.getMySavedAlbums();
    
            console.log(albums.body.items)
            
           // albums.body.items.forEach( element => {
    
                //console.log(element.album.name+ " de "+element.album.artists)
    
                //console.log(element)
    
           // })
    
          })().catch(e => {
            console.error(e);
          });
*/