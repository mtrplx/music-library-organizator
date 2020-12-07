const  accessibleAutocomplete  = require("accessible-autocomplete");

class MusicView {
    
    constructor ( ) {
        this.AlbumsList = window.document.getElementById('AlbumsList');
        this.PreviousButton = window.document.getElementById('PreviousButton');
        this.NextButton = window.document.getElementById('NextButton');
        this.PageNumber = window.document.getElementById('PageNumber')
        this.AlbumImg = window.document.getElementById('AlbumImage');
        this.AlbumTitle = window.document.getElementById('AlbumTitle');
        this.AlbumArtist = window.document.getElementById('AlbumArtist');
        this.ReleaseDate = window.document.getElementById('ReleaseDate');
        this.TrackList = window.document.getElementById('TrackList');
        this.AddNewAlbumButton = window.document.getElementById('AddNewAlbumButton');
        this.modalBox = window.document.getElementById('myModal');
        this.CloseModalButton = window.document.getElementById('closeModal');
        this.ModalInputArtisName = window.document.getElementById('ModalInputArtisName');
        this.AddAlbumSelect = window.document.getElementById('AlbumSelect');
        this.AcceptAlbumButton = window.document.getElementById('AcceptButton');
        this.AutoCompleteUl = window.document.getElementById('AutoCompleteResults')
        this.DropdownIcon = window.document.getElementById('dropdown-icon')
        this.searchButton = window.document.getElementById('searchButton')
        this.AlbumTypeSelect = window.document.getElementById('AlbumType')
        this.notify = window.document.getElementById('notify')
        this.notifyType = window.document.getElementById('notifyType')
        this.reloadButton = window.document.getElementById('reload')
        this.current_page = 1;
        this.records_per_page = 10;
    }
    numberOfPages ( albums) {
        return Math.ceil( this.ObjLength( albums ) / this.records_per_page )
    }

    prevPage ( albums, getAlbumInfo ) {
        if(this.current_page > 1) {
            this.current_page--;
            this.chargePage(this.current_page, albums, getAlbumInfo)
        }
    }

    nextPage ( albums, getAlbumInfo ) {
        if(this.current_page < this.numberOfPages( albums )){
            this.current_page++;
            this.chargePage(this.current_page, albums, getAlbumInfo)
        }
    }

    createAlbumUl ( album, getAlbumInfo ) {
        let ul = window.document.createElement('ul');
        ul.id = album.album_id;
        ul.onclick = async () => {
            let result = await getAlbumInfo( ul.id );
            this.showAlbumInfo( result );
        }
        ul.textContent = album.title+" - "+album.artist
        return ul;
    }
    

    chargePage ( page, albums, getAlbumInfo ) {

        if( page < 1) page = 1;
        if( page > this.numberOfPages( albums ) ) page = this.numberOfPages( albums )

        this.AlbumsList.innerHTML = "";

        for( let i = ( page - 1 ) * this.records_per_page; i < ( page * this.records_per_page ) && i < this.ObjLength( albums ) ; i++ ){
            this.AlbumsList.appendChild( this.createAlbumUl( albums[i], getAlbumInfo) )
        }

        this.PageNumber.textContent = page;

        page == 1 ? this.PreviousButton.style.visibility = 'hidden' : this.PreviousButton.style.visibility = 'visible'

        page == this.numberOfPages() ? this.NextButton.style.visibility = 'hidden' : this.NextButton.style.visibility = 'visible'

    }

    clearDetails() {
        this.AlbumImg.src = "";
        this.AlbumTitle.textContent = "";
        this.AlbumArtist.textContent = "";
        this.ReleaseDate.textContent = "";
        this.TrackList.innerHTML = "";
    }

    showAlbumInfo( AlbumInfo ) {
        this.clearDetails()

        this.AlbumImg.src = AlbumInfo.image;
        this.AlbumTitle.textContent = AlbumInfo.title;
        this.AlbumArtist.textContent = AlbumInfo.artist;
        this.ReleaseDate.textContent = AlbumInfo.release_date;
        let trackNumber = 1;
        AlbumInfo.tracks.forEach( track => {
            let ul = window.document.createElement('ul');
            ul.textContent = trackNumber+"-"+track;
            this.TrackList.appendChild(ul)
            trackNumber++;
        })
    }

    OpenModal () {
        this.AddNewAlbumButton.addEventListener('click' , () => {
            this.modalBox.style.display = "block";
        })
    }

    CloseModal () {
        this.CloseModalButton.addEventListener('click', () => {
            this.modalBox.style.display = "none"
        })
    }

    ObjLength ( object ) {
        return Object.keys(object).length
    }

    NoArtistFound () {
        let li = window.document.createElement('li')
        li.textContent = 'No se han encontrado artistas'
        li.style.fontSize = "large"
        li.className = "noHover"
        return li;
    }

    chargeAutocomplete ( artists ) {

        let artistsList = [];

        if(this.ObjLength(artists) == 0){
            artistsList.push(this.NoArtistFound())
        }

        artists.forEach( (artist) => {
            let li = window.document.createElement('li');
            li.id = artist.id;
            li.textContent = artist.name

            artistsList.push(li);
        });

        return artistsList;
    }

    changeListElementsBackgroundColor( color ) {
        this.AddAlbumSelect.querySelectorAll('ul').forEach( element => {
            element.style.backgroundColor = color;
        })
    }

    createArtistAlbumsList ( albums ) {
        this.AddAlbumSelect.innerHTML = ""
        albums.forEach( album => {
            let ul = window.document.createElement('ul');
            let img = window.document.createElement('img');
            img.id = "AlbumImg";
            img.src = album.img;
            let label = window.document.createElement('label');
            label.for = 'AlbumImg';
            label.textContent = album.name;
            label.id = album.id;
            ul.id = album.id;
            ul.appendChild(img)
            ul.appendChild(label)
            ul.onclick = () => {
                this.changeListElementsBackgroundColor('white')
                ul.style.backgroundColor = "blue"
                this.AcceptAlbumButton.dataset.album_id = ul.id;
            }
            this.AddAlbumSelect.appendChild(ul)
        })
    }

    SearchArtistAlbums ( callback ) {
        this.searchButton.addEventListener( 'click', async () => {
            let id = this.ModalInputArtisName.dataset.id;
            let albumType = this.AlbumTypeSelect.value;
            let albums = await callback( id, albumType )

            this.createArtistAlbumsList( albums )
        })
    }

    ToggleSearchDropDown () {
        this.DropdownIcon.addEventListener('click', () => {
            this.AutoCompleteUl.style.display = "none"
        })
    }

    OnLoadEvents ( GetAlbumscallback, getAlbumInfoCallback ) {
        window.addEventListener('load', () => {
            this.OpenModal()
            this.CloseModal()
            this.ToggleSearchDropDown()
            this.chargePage( 1, GetAlbumscallback(), getAlbumInfoCallback );
        })
    }

   async chargeAlbumDetail ( getFirstAlbumCallback ) {
       window.addEventListener('load', async () => {
        let album = await getFirstAlbumCallback()
        if(!album){
            this.showAlbumInfo({
                title : 'No hay álbumes añadidos',
                artist : 'No hay álbumes añadidos',
                release_date : 'No hay álbumes añadidos'
            })
        }
        this.showAlbumInfo( album )
       })
        
    }

    RelaodPage ( GetAlbumscallback, getAlbumInfoCallback ){
        this.reloadButton.addEventListener('click', () => {
            this.current_page = 1;
            this.chargePage( 1, GetAlbumscallback(), getAlbumInfoCallback );
        })
    }

    NextPageClick ( callback, getAlbumInfoCallback ) {
        this.NextButton.addEventListener( 'click', () => {
            this.nextPage( callback(), getAlbumInfoCallback )
        })
    }

    PreviousPageClick ( callback, getAlbumInfoCallback ) {
        this.PreviousButton.addEventListener( 'click' , () => {
            this.prevPage( callback(), getAlbumInfoCallback )
        })
    }

     OnTypeEvent ( callback ) {
        this.ModalInputArtisName.addEventListener('input', async event => {

            this.AutoCompleteUl.innerHTML = "";


            let callbackResult = await callback(event.target.value.toLowerCase());

            let list = this.chargeAutocomplete( callbackResult )
          
            list.forEach( element => {
                element.addEventListener('click', () => {
                    
                    this.ModalInputArtisName.value = element.textContent;
                    this.ModalInputArtisName.dataset.id = element.id;
                    this.AutoCompleteUl.style.display = "none"
                    this.searchButton.disabled = false;
                })
                this.AutoCompleteUl.appendChild(element)
            })
            this.AutoCompleteUl.style.display = "block"
        })
    }

    showSuccessNotification(){
        setTimeout(function() { alert("Álbum guardado correctamente"); }, 1000);
    }

    showFailureNotification(){
        setTimeout(function() { alert("Error. Ha habido un problema guardando el álbum"); }, 1000);
    }

    sendAlbumToSave( callback, GetAlbumscallback, getAlbumInfoCallback ){
        this.AcceptAlbumButton.addEventListener('click', () => {
            this.modalBox.style.display = "none"
            if(callback( this.AcceptAlbumButton.dataset.album_id )){
                this.showSuccessNotification();
                this.current_page = 1;
                this.chargePage( 1, GetAlbumscallback(), getAlbumInfoCallback );
                return;
            }
            this.showFailureNotification();
        })
    }

}

module.exports = MusicView;