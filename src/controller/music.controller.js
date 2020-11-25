class MusicController {
    
    constructor (View, Service) {
        this.View = View;
        this.Service = Service;
        
        this.init();
    }

    init () {
        this.View.OnLoadEvents()
    }
}

module.exports = MusicController;