class AlbumService {

    constructor ( albumsdb ) {
        this.albumsdb = albumsdb;
    }

    async getAlbums () {
        let result = await this.albumsdb.ReadAll();

        return result;
    }

    deleteElement ( album_id ) {
        this.albumsdb.delete( album_id )
    }
}

module.exports = AlbumService;