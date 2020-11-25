class ArtistView {

    constructor () {
        this.ArtistsTable = window.document.getElementById('ArtistsTable')
    }

    DrawArtist ( artists ) {
        this.ArtistsTable.appendChild( this.CreateTR( artists ) )
    }

    CreateTR ( artists ) {
        let tr = window.document.createElement('tr');
        let count = 0;

        artists.forEach( element => {
          if( count == 3 ){ 
              tr = window.document.createElement('tr');
              count = 0;
             };

             let th = window.document.createElement('th')
             th.textContent = artists.name;
             th.id = artist.id;
             tr.appendChild( th )

             count++;
        });

        return tr;
    }

    OnLoadDrawTable ( callback ) {
        window.document.addEventListener('load', () => {
           this.DrawArtist( callback() )
        })
    }
}

module.exports = ArtistView;