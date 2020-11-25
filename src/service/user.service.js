const Database = require('../db/database.js')

class UserService {

    constructor (  ) {
        this.UserDB = new Database('user');
    }

    SaveToken ( token ) {
        return this.UserDB.create( token )
    }

    getToken ( id ) {
        return this.UserDB.ReadAll()
    }   

    UpdateToken ( id, data ) {
        return this.UserDB.update( id, data )
    }
}

module.exports = new UserService ();