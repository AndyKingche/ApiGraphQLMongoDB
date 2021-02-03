'use strict'
const { MongoClient } = require('mongodb')
const { //aqui ubicamos las variables que se creo en el archivo donde se puso las variables de entorno
DB_USER,
DB_PASSWD,
DB_HOST,
DB_PORT,
DB_NAME,

}=process.env

const mongoUrl = ` mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}` //la cadena de conexion

//`mongodb+srv://${DB_USER}:${DB_PASSWD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
let connection // creamos una variable donde se podra la conexion a la base de datos
async function connectDB(){
if(connection) // sis que esta declarada
{
    return connection
}
let client // la variable client es aquella que recibira la conexion 
try {
    client = await new MongoClient.connect(mongoUrl,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    connection = await client.db(DB_NAME)
} catch (error) {
    console.log('No se pudo conectar a la base de datos de mongo', mongoUrl, error)
        process.exit(1)   // sis que no se pudo conectar se eliminara el proceso.
    
}
return connection
}
module.exports = connectDB