class AlbumController {

    constructor ( view , service ) {
        this.view = view;
        this.service = service;
    }

    init () {
        this.view.OnLoad( this.service.getAlbumsAndArtists.bind(this.service) )
    }
}

module.exports = AlbumController;