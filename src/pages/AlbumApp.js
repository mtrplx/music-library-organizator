const albumView = require('../view/album.view')
const albumController = require('../controller/album.controller')
const albumService = require('../service/album.service')
const database = require('../db/database');

const app = new albumController( new albumView(), new albumService( new database( 'albums' ) ))