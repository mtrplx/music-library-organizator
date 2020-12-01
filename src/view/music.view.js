const  accessibleAutocomplete  = require("accessible-autocomplete");

class MusicView {
    
    constructor () {
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
        ul.id = album.id;
        ul.onclick = () => {
            this.showAlbumInfo( getAlbumInfo() );
        }
        ul.textContent = album.title+" - "+album.artist_name
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
        this.AlbumImg.src = AlbumInfo.album_img;
        this.AlbumTitle.textContent = AlbumInfo.title;
        this.AlbumArtist.textContent = AlbumInfo.artist_name;
        this.ReleaseDate.textContent = AlbumInfo.release_date;
        let trackNumber = 1;
        AlbumInfo.tracklist.forEach( track => {
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
            li.textContent = artist.artist_name

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

    OnLoadEvents ( GetAlbumscallback, getAlbumInfoCallback ) {
        window.addEventListener('load', () => {
            this.OpenModal()
            this.CloseModal()
            this.ToggleSearchDropDown()
            this.chargePage( 1, GetAlbumscallback(), getAlbumInfoCallback );
            //this.FocusOut()
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