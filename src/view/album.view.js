class AlbumView {

    constructor ( ) {
      this.Table = window.document.getElementById('table')
      this.Table.innerHTML = '';
      //this.deleteButton = 
    }

    CreateTable ( albums, deleteFunction ) {

        albums.forEach( album => {
            let tr = window.document.createElement('tr')

            let thAlbum = window.document.createElement('th')
            thAlbum.dataset.label = 'Título del album'
            thAlbum.id = album.album_id;
            thAlbum.textContent = album.title;

            let thArtist = window.document.createElement('th')
            thArtist.dataset.label = 'Artistas'
            thArtist.textContent = album.artist
            
            tr.appendChild(thAlbum)
            tr.appendChild(thArtist)

            let thDelete = window.document.createElement('th')

            let i = window.document.createElement('i')
            i.className = 'far fa-trash-alt'
            i.id = 'deleteButton'
            i.dataset.AlbumId = album.album_id;
            i.onclick =   event => {
                deleteFunction( album.album_id )
              this.Table.deleteRow(event.target.parentNode.parentNode.rowIndex-1)
                
            }
            thDelete.dataset.label = 'Borrar'
            
            thDelete.appendChild(i)

            tr.appendChild(thDelete)

            this.Table.appendChild(tr)

        });

    }

   async  OnLoad ( callback, deleteFunction ) {
         let result = await callback();
            this.CreateTable( result, deleteFunction )
    }

}

module.exports = AlbumView;