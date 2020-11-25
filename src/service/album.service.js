class AlbumService {

    constructor ( AlbumStore, ArtistStore ) {
        this.AlbumStore = AlbumStore;
        this.ArtistStore = ArtistStore;
    }

    getAlbumsAndArtists (  ) {
        this.AlbumStore.getAllAlbums().then( albums => {

            let data = []; 

            albums.forEach( album => {
                data += {
                    id : album.id,
                    name : album.name,
                    artist : this.getArtistById( album.artistId )
                } 
            });
            return data;
        })
    }

    GetAllArtists ( ) {
        this.ArtistStore.GetAllArtists().then( artists => {
            return artists
        })
    }

    getArtistById ( id ) {

        let artists = this.GetAllArtists();

        artists.forEach( artist => {
            if(artist.id == id) {
                return artist.name
            }
        })
    }
}

module.exports = AlbumService;