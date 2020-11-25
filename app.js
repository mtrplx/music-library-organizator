const musicView = require("./src/view/music.view");
const musicController = require("./src/controller/music.controller");
const musicService = require("./src/service/music.service");

const app = new musicController( new musicView(), new musicService())