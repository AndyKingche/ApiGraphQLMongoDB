'use strict'
const connectDB = require('../db/db')
const errores = require('./errores')
const { ObjectID } = require('mongodb');
module.exports = {
    Comentarios :{
        usuariosid: async({ usuariosid }) => {
            console.log("esto son los ",usuariosid)
            let db
            let usuario
            let ids
            try {
                db = await connectDB()
                ids = usuariosid ? usuariosid.map(id => ObjectID(id)) : []
                usuario = ids.length > 0 
                ? await db.collection('usuarios').find(
                    { _id:{ $in: ids } }
                ).toArray()
                : []
               console.log("los usuarios"+ usuario)
            } catch (error) {
                console.log("Error en el resolver de los comentarios")
                errores(error)
            }
            return usuario
        }
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => {
            let db
            let categoria
            let ids 
            console.log("categprias, ", categoriasid)
            try {
                db = await connectDB()
                ids = categoriasid ? categoriasid.map(id => ObjectID(id)) : []
                categoria = ids.length > 0 
                ? await db.collection('categorias').find({ _id: {$in: ids} }).toArray() : []
                console.log("categoria", categoria)
            } catch (error) {
                console.log("Error en el resolver de Posts categorias")
            }

            return categoria
        },
        comentarioid: async ( {comentarioid} ) =>{
            let db 
            let comentario
            let ids 

            try {
                db = await connectDB()
                ids = comentarioid ? comentarioid.map(id => ObjectID(id)) : []
                comentario = ids.length > 0 ? 
                await db.collection('comentarios').find({ _id: {$in: ids} }).toArray() : []
                console.log("comentario", comentario)
            } catch (error) {
                console.log("Error en el resolver de Posts Comentario ")
                errores(error)
            }

            return comentario
        },
        usuariosid: async ( {usuariosid} ) => {
            let db 
            let usuario
            let ids

            try {
                db = await connectDB()
                ids =  usuariosid ? usuariosid.map(id => ObjectID(id)) : []
                usuario = ids.length > 0 
                ? await db.collection('usuarios').find(
                    { _id:{ $in: ids } }
                ).toArray()
                : []
                console.log("usuario", usuario)
            } catch (error) {
                console.log("Error en el resolver de Posts Usuario ")
                errores(error)
            }

            return usuario

        }
    },
    PostEtiquetas: {
        idetiqueta: async ({idetiqueta}) => {
            let db
            let etiqueta
            let ids

            try {
                db = await connectDB()
                ids = idetiqueta != null ? idetiqueta : 0
                etiqueta = ids > 0 ? await db.collection('etiquetas').find({_id: {$in: ids}}).toArray() : []

            } catch (error) {
                console.log("Error en el resolver PostEtiquetas id etiquetas")
                errores (error)
                
            }
            return etiqueta
        },
        idpost: async({idpost}) => {
            let db
            let post
            let ids

            try {
                db = await connectDB()
                ids = idpost != null ? idpost : 0 
                post = ids > 0 ? await db.collection('posts').find({ _id: {$in :ids}}).toArray() : []
                
            } catch (error) {
                console.log("Error en el resolver Postetiquetas id post")
                errores(error)
            }
            return post
        }
    }

}