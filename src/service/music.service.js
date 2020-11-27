class MusicService {

    constructor () {
        
    }

    getArtists ( InputValue ) {

        let SpotifyArtists = [
            {
                id: 'id01',
                name:'Cruz Cafune'
            },
            {
                id: 'id02',
                name:'Pedro Ladroga'
            },
            {
                id: 'id03',
                name:'Dellafuente'
            },
            {
                id: 'id04',
                name:'Bad Bunny'
            },
            {
                id: 'id05',
                name:'Kaydy Cain'
            }
        ]

        //console.log('INPUT VALUE '+InputValue)

        //let result = SpotifyArtists.filter( (artist) => artist.name.toLowerCase().includes(InputValue));
        
        let result = [];

        if(InputValue == "") {
            return result;
        }
        
        SpotifyArtists.forEach ( artist => {
            
            if(artist.name.toLowerCase().includes(InputValue)){
                result.push(artist);
            }
        })

        //console.log('SERVICE RESULT'+result)

        return result;
    }

} 
module.exports = MusicService;