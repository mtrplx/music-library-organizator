class ArtistStore {

    constructor ( ArtistDB ) {
        this.ArtistDB = ArtistDB;
    }

    SaveArtist ( artist ) {
        return this.ArtistDB.create( artist );
    }

    GetAllArtists () {
        return this.ArtistDB.ReadAll();
    }

    GetArtist ( id ) {
        return this.ArtistDB.ReadOne( id );
    }

    UpdateArtist ( artist ) {
        return this.ArtistDB.update(artist.id, artist);
    }

    DeleteArtist ( id ) {
        return this.ArtistDB.delete( id )
    }
}

module.exports = ArtistStore;