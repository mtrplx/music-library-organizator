class AlbumStore {

    constructor ( AlbumDB ) {
        this.AlbumDB = AlbumDB;
    }

    SaveAlbum ( album ) {
        return this.albumDB.create( album );
    }

    GetAllAlbums () {
        return this.albumDB.ReadAll();
    }

    Getalbum ( id ) {
        return this.albumDB.ReadOne( id );
    }

    Updatealbum ( album ) {
        return this.albumDB.update(album.id, album);
    }

    Deletealbum ( id ) {
        return this.albumDB.delete( id )
    }
}

module.exports = AlbumStore;