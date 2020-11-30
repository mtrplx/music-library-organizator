class MusicController {
    
    constructor (View, Service) {
        this.View = View;
        this.Service = Service;
        
        this.init();
    }

    init () {
        this.View.OnLoadEvents( this.Service.getAlbums.bind( this.Service)  )
        this.View.OnTypeEvent( this.Service.getArtists.bind( this.Service ) )
        this.View.NextPageClick( this.Service.getAlbums.bind( this.Service ) )
        this.View.PreviousPageClick( this.Service.getAlbums.bind( this.Service ) )
    }
}

module.exports = MusicController;