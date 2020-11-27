class MusicController {
    
    constructor (View, Service) {
        this.View = View;
        this.Service = Service;
        
        this.init();
    }

    init () {
        this.View.OnLoadEvents()
        this.View.OnTypeEvent( this.Service.getArtists.bind(this.Service) )
    }
}

module.exports = MusicController;