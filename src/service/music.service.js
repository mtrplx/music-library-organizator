class MusicService {

    constructor () {
        
    }

    getArtists ( InputValue ) {
        result = SpotifyArtists.filter(artist => artist.toLowerCase().includes(InputValue));
    }

} 
module.exports = MusicService;