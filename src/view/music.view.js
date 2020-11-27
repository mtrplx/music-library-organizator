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



    OnLoadEvents () {
        window.addEventListener('load', () => {
            this.OpenModal()
            this.CloseModal()
        })
    }

    OnTypeEvent ( callback ) {
        this.ModalInputArtisName.addEventListener('input', event => {
            console.log(callback())
            this.chargeAutocomplete( callback(event.target.value) )
        })
    }
}

module.exports = MusicView;