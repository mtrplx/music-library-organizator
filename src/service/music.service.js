class MusicService {

    constructor ( spotifyService, albumsdb, artistsdb ) {
        this.spotifyService = spotifyService;
        this.albumsdb = albumsdb;
        this.artistsdb = artistsdb;
    }

    formatArtistResponse ( response ) {

        let result = [];

        response.body.artists.items.forEach( artist => {
            result.push({
                id : artist.id,
                name : artist.name
            })
        })

        return result;
    }

   async getArtists ( InputValue ) {

        let response = await this.spotifyService.SearchArtists( InputValue );
        
        response =  this.formatArtistResponse( response )

        return response 
       
    }

    formatNewAlbums ( response ) {
        let result = [];

        response.body.items.forEach( album => {
            result.push({
                id : album.id,
                name : album.name,
                img : album.images[2].url 
            })
        })

        return result;
    }

    async getArtisAlbums ( id, albumType ) {
        let response = await this.spotifyService.SearchArtistsAlbums( id, albumType );

        response = this.formatNewAlbums ( response )

        return response;
    }

    async saveAlbum( album_id ) {
        let response = await this.spotifyService.GetAlbum( album_id )

        await this.spotifyService.addAlbumToLibrary( album_id )

         response = this.formatAlbumData( response )

         return this.albumsdb.create( response )
    }

    formatAlbumData( album ){
        return {
            album_id : album.body.id,
            artist : album.body.artists[0].name,
            title : album.body.name,
            release_date : album.body.release_date,
            image : album.body.images[0].url
        }
    }

    getAlbums () {
        return this.albumsdb.ReadAll()
    }

    getTracksFromResponse( response ){
        let result = []
        response.body.tracks.items.forEach( track => {
            result.push( track.name )
        })
        return result;
    }

   async getAlbumInfo ( album_id ) {
        let response = await this.spotifyService.GetAlbum( album_id )

        let tracks = this.getTracksFromResponse( response )

        response = this.albumsdb.ReadOne( album_id, 'album_id' )

        response[0].tracks = tracks;

        return response[0] 
    }

     async getFirstAlbum () {
         if(this.albumsdb.ReadAll().length == 0) {
             return
         }
         
        let response = this.albumsdb.ReadAll()[0].album_id;

       return await this.getAlbumInfo( response )
    }

} 
module.exports = MusicService;