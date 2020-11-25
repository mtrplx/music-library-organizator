const UserService = require('./user.service');
const SpotifyWebApi = require('spotify-web-api-node')

class SpotifyService {

    constructor ( ) {
        this.client_id = "295612aea12349abaf6ce90688a142ff";
        this.client_secret = "153f11af3b6e4704b9cb5cde5ac22184";

        this.UserService = new UserService();
    }



}

module.exports =  new SpotifyService()