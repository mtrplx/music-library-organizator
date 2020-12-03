const musicView = require("./src/view/music.view");
const musicController = require("./src/controller/music.controller");
const musicService = require("./src/service/music.service");
const spotifyservice = require("./src/service/spotify.service")
const database = require('./src/db/database')

const app = new musicController( new musicView(), new musicService( spotifyservice, new database('albums'), new database('artists')))