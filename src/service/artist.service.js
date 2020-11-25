class ArtistService { 

    constructor ( ArtistStore ) {
        this.ArtistStore = ArtistStore;
    } 

    GetAllArtists ( ) {
        this.ArtistStore.GetAllArtists().then( artists => {
            return artists
        })
    }

}

module.exports = ArtistService;