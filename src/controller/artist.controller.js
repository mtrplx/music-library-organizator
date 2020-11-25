class ArtistController {

    constructor ( ArtistView, ArtistService ) {
        this.ArtistView = ArtistView;
        this.ArtistService = ArtistService;
    }

    init () {
        this.ArtistView.DrawArtist( this.ArtistService.GetAllArtists.bind(this.ArtistService) )
    }

}

module.exports = ArtistController;