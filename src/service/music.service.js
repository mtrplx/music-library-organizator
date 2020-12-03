class MusicService {

    constructor ( spotifyService, albumsdb, artistsdb ) {
        this.spotifyService = spotifyService;
        this.albumsdb = albumsdb;
        this.artistsdb = artistsdb;
    }

    formatArtistResponse ( response ) {

        let result = [];

        response.body.artists.items.forEach( artist => {
            result.push({
                id : artist.id,
                name : artist.name
            })
        })

        return result;
    }

   async getArtists ( InputValue ) {

        let response = await this.spotifyService.SearchArtists( InputValue );
        
        response =  this.formatArtistResponse( response )

        return response 
       
    }

    formatNewAlbums ( response ) {
        let result = [];

        response.body.items.forEach( album => {
            result.push({
                id : album.id,
                name : album.name,
                img : album.images[2].url 
            })
        })

        return result;
    }

    async getArtisAlbums ( id ) {
        let response = await this.spotifyService.SearchArtistsAlbums( id );

        response = this.formatNewAlbums ( response )

        return response;
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