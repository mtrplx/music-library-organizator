class MusicController {
    
    constructor (View, Service) {
        this.View = View;
        this.Service = Service;
        
        this.init();
    }

    init () {
        this.View.OnLoadEvents( this.Service.getAlbums.bind( this.Service), this.Service.getAlbumInfo.bind(this.Service)  )
        this.View.OnTypeEvent( this.Service.getArtists.bind( this.Service ) )
        this.View.NextPageClick( this.Service.getAlbums.bind( this.Service ), this.Service.getAlbumInfo.bind(this.Service) )
        this.View.PreviousPageClick( this.Service.getAlbums.bind( this.Service ), this.Service.getAlbumInfo.bind(this.Service) )
        this.View.SearchArtistAlbums( this.Service.getArtisAlbums.bind(this.Service) )
        this.View.sendAlbumToSave( this.Service.saveAlbum.bind(this.Service), this.Service.getAlbums.bind( this.Service), this.Service.getAlbumInfo.bind(this.Service) )
        this.View.RelaodPage( this.Service.getAlbums.bind( this.Service), this.Service.getAlbumInfo.bind(this.Service) )
        this.View.chargeAlbumDetail( this.Service.getFirstAlbum.bind(this.Service) )
    }
}

module.exports = MusicController;