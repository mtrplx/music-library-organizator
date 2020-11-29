const  accessibleAutocomplete  = require("accessible-autocomplete");

class MusicView {
    
    constructor () {
        this.AlbumsList = window.document.getElementById('AlbumsList');
        this.PreviousButton = window.document.getElementById('PreviousButton');
        this.NextButton = window.document.getElementById('NextButton');
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
    }

    loadAllAlbums ( albums) {
        albums.forEach( album => {
            let ul = window.document.createElement('ul')
            ul.textContent = album.artist_name+" - "+album.title;
            ul.id = album.id;
            //paginacion
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
        //console.log('NO ENCUENTRA ARTISTA '+li)
    }

    chargeAutocomplete ( artists ) {

        let artistsList = [];

        if(this.ObjLength(artists) == 0){
            artistsList.push(this.NoArtistFound())
        }

        //console.log('ARTISTAS '+artists[0].name)

        artists.forEach( (artist) => {
            let li = window.document.createElement('li');
            li.id = artist.id;
            li.textContent = artist.name

            artistsList.push(li);
        });
        //console.log('RELLENAR AUTOCOMPLETE '+artistsList[0])
        return artistsList;
    }

 /*   FocusOut () {
        this.ModalInputArtisName.addEventListener('focusout', () => {
            this.AutoCompleteUl.style.display = "none"
        })
    } */

    ToggleSearchDropDown () {
        this.DropdownIcon.addEventListener('click', () => {
            this.AutoCompleteUl.style.display = "none"
        })
    }

    OnLoadEvents () {
        window.addEventListener('load', () => {
            this.OpenModal()
            this.CloseModal()
            this.ToggleSearchDropDown()
            //this.FocusOut()
        })
    }

    OnTypeEvent ( callback ) {
        this.ModalInputArtisName.addEventListener('input', event => {
            this.AutoCompleteUl.innerHTML = "";

            let list = this.chargeAutocomplete( callback(event.target.value.toLowerCase()) )
          
            list.forEach( element => {
                element.addEventListener('click', () => {
                    console.log('ENTRA')
                    this.ModalInputArtisName.value = element.textContent;
                    this.ModalInputArtisName.dataset.id = element.id;
                })
                this.AutoCompleteUl.appendChild(element)
            })
            this.AutoCompleteUl.style.display = "block"
        })
    }


    onclickAutocomplete () {
        
    }
}

module.exports = MusicView;