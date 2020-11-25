const DataStore = require('nedb-promises');

class Database {

    constructor ( DBName ) {

        this.db = DataStore.create({
            filename : __dirname+'/databases/'+DBName+'.db',
            autoload : true
        })

         this.db.load({
            filename : __dirname+'/databases/'+DBName+'.db'
        }) 
        
    }

    create ( data ) {
       return this.db.insert( data )
    }

    ReadAll ( ) {
        return this.db.find().exec()
    }

    ReadOne ( id ) {
       return this.db.findOne({_id : id})
    }

    update ( id, data ) {
        return this.db.update({_id : id}, {$set : data})
    }

    delete ( id ) {
        return this.db.remove({_id: id})
    }
}

module.exports = Database;