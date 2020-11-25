const artistView = require('../view/artist.view')
const artistController = require('../controller/artist.controller')
const artistService = require('../service/artist.service')
const artistStore = require('../db/store/artists.store')
const database = require('../db/database');

new artistController( new artistView(), new artistService( new artistStore( new database('artist')) ));