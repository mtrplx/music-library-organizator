class AlbumView {

    constructor ( ) {
        this.AlbumsTable = document.getElementById('AlbumsTable');
    }

    DrawAlbums ( albums ) {
        let tr = this.CreateTR( albums )
        
        this.AlbumsTable.appendChild(tr)
    }

    CreateTR ( albums ) {
        
        let rows = []

        albums.forEach( album => {
            let tr = window.document.createElement('tr');
            
            let AlbumNameth = window.document.createElement('th')
            AlbumNameth.textContent = album.name;
            AlbumNameth.id = album.id;
            
            let ArtistNameth = window.document.createElement('th')
            ArtistNameth.textContent = album.artist;

            tr.appendChild(AlbumNameth, ArtistNameth);

            rows += tr;
        });
    }

    OnLoad ( callback ) {
        window.document.addEventListener('load', () => {
            this.DrawAlbums( callback() )
        })
    }

}

module.exports = AlbumView;