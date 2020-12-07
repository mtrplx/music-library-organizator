const UserService = require('./user.service');
const SpotifyWebApi = require('spotify-web-api-node')

class SpotifyService {

    constructor ( ) {
        this.SpotifyApi = new SpotifyWebApi();
        this.SpotifyApi.setAccessToken( UserService.getToken().access_token)
    }

    async SearchArtists( input ) {
        const artists = await this.SpotifyApi.searchArtists( input,{limit:10});
            
        return artists;
    }

    async SearchArtistsAlbums ( ArtistID, albumType ) {
        const albums = await this.SpotifyApi.getArtistAlbums( ArtistID,{ album_type : albumType });

        return albums;
    }

    async GetAlbum ( album_id ) {
        const album = await this.SpotifyApi.getAlbum( album_id );

        return album
    }

    async addAlbumToLibrary( album_id ) {
       await this.SpotifyApi.addToMySavedAlbums( [album_id] )
    }



}

module.exports =  new SpotifyService()