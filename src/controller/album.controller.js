class AlbumController {

    constructor ( view , service ) {
        this.view = view;
        this.service = service;

        this.init()
    }

    init () {
        this.view.OnLoad( this.service.getAlbums.bind(this.service), this.service.deleteElement.bind(this.service) )
    }
}

module.exports = AlbumController;