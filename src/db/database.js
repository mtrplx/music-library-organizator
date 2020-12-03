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
        let result;
         DataStore.getAll( this.DBName, __dirname+'/databases/' , ( success, data ) => {
            result = data;
        })
        return result;
    }

    ReadOne ( id ) {
        let result;
       DataStore.search( this.DBName, __dirname+'/databases/' ,'id', id, ( success, data ) => {
            result = data;
       } )
       return result;
    }

    update ( id, data ) {
        DataStore.updateRow( this.DBName, __dirname+'/databases/' , this.ReadOne(id), data, () => {})
        return true;
    }

    delete ( id ) {
        DataStore.deleteRow( this.DBName, __dirname+'/databases/', { 'id' : id }, () => {})
        return true;
    }
}

module.exports = Database;