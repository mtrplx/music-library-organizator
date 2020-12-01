class MusicService {

    constructor () {
        
    }

    getArtists ( InputValue ) {

        let SpotifyArtists = [
            {
                id: 'id01',
                artist_name:'Cruz Cafune'
            },
            {
                id: 'id02',
                artist_name:'Pedro Ladroga'
            },
            {
                id: 'id03',
                artist_name:'Dellafuente'
            },
            {
                id: 'id04',
                artist_name:'Bad Bunny'
            },
            {
                id: 'id05',
                artist_name:'Kaydy Cain'
            }
        ]
        
        let result = [];

        if(InputValue == "") {
            return result;
        }
        
        SpotifyArtists.forEach ( artist => {
            
            if(artist.artist_name.toLowerCase().includes(InputValue)){
                result.push(artist);
            }
        })

        return result;
    }

    getAlbums () {
        let SpotifyAlbums = [
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            },
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            },
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            },
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            },
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            },
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            },
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            },
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            },
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            },
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            },
            {
                id: 'al01',
                artist_name:'Dellafuente',
                title: 'Descanso en poder'
            }
        ]

        return SpotifyAlbums;
    }

    getAlbumInfo () {
        return {
            id : "album_id_01",
            album_img: "src/media/img/descanso-en-poder.webp",
            title : "Descanso en poder",
            artist_name : "Dellafuente",
            release_date : "5 de junio de 2020",
            tracklist : [
                "Intro",
                "Toco el cielo",
                "Yalo Yale",
                "La Recomellía",
                "Saturación",
                "Palante y Patrás",
                "Flores Pa Tu Pelo",
                "Libertad y Salud",
                "Pa Que No Te Duermas",
                "Nubes"
            ]
        }
    }

} 
module.exports = MusicService;