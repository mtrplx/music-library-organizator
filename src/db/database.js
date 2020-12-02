const DataStore = require('electron-db');
const fs = require('fs')
class Database {

    constructor ( DBName ) {

        this.DBName = DBName;

            DataStore.createTable(DBName,__dirname+'/databases/', (success, data) => {
                console.log(data)
            })        
    }

    checkFile (fileName) {
        return fs.existsSync( 'databases/'+fileName )
    }

    isValid () {
        return DataStore.valid( this.DBName, __dirname+'/databases/' )
    }

    create ( data ) {
       if(this.isValid()){
            DataStore.insertTableContent( this.DBName, __dirname+'/databases/' , data , ( succ, msg)  => {})
            return true;
       }
    }

    ReadAll ( ) {
         DataStore.getAll( this.DBName, __dirname+'/databases/' , ( success, data ) => {
            return data;
        })
    }

    ReadOne ( id ) {
       DataStore.search( this.DBName, __dirname+'/databases/' ,'id', id, ( success, data ) => {
            return data;
       } )
    }

    update ( id, data ) {
        console.log(id)
        console.log(data)
        DataStore.updateRow( this.DBName, __dirname+'/databases/' , this.ReadOne(id), data, (success, data) => {
            return success;
        } )
    }

    delete ( id ) {
        DataStore.deleteRow( this.DBName, __dirname+'/databases/', { 'id' : id }, (success, data) => {
                return successç;
        })
    }
}

module.exports = Database;