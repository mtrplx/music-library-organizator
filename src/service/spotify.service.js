const UserService = require('./user.service');
const SpotifyWebApi = require('spotify-web-api-node')

class SpotifyService {

    constructor ( ) {
        this.SpotifyApi = new SpotifyWebApi();
        console.log('ACCESS TOKEN EN CONSTRUCTOR '+ UserService.getToken().access_token )
        this.SpotifyApi.setAccessToken( UserService.getToken().access_token)
    }

    async SearchArtists( input ) {
        const artists = await this.SpotifyApi.searchArtists( input,{limit:10});
            
        return artists;
    }

    async SearchArtistsAlbums ( ArtistID ) {
        const albums = await this.SpotifyApi.getArtistAlbums( ArtistID,{ album_type:'album'});

        return albums;
    }



}

module.exports =  new SpotifyService()