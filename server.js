const SpotifyWebApi = require('spotify-web-api-node')
const fs = require('fs')

if(fs.existsSync('./src/db/databases/user.json')){
  fs.unlinkSync('./src/db/databases/user.json')
  console.log('Archivo Borrado')
}  
const UserService = require('./src/service/user.service')

const express = require('express');


const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];

const spotifyApi = new SpotifyWebApi({
  redirectUri : 'http://localhost:8888/callback',
  clientId : '295612aea12349abaf6ce90688a142ff',
  clientSecret : '153f11af3b6e4704b9cb5cde5ac22184'
})

const app = express();

app.use(express.static('./'))

app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });

app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      let entry = {
        id : "BearerToken",
        access_token : access_token,
        refresh_token : refresh_token,
        expires_in : expires_in,
        authorization_code : code
      }

         
      if(UserService.SaveToken( entry )){
        res.sendFile(__dirname+'/index.html')
      };

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.listen(8888, () =>
    console.log('Servidor levantado en http://localhost:8888')
  ); 