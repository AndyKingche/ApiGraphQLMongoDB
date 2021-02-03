'use strict'
const connectDB = require('../db/db')
const { ObjectID } = require('mongodb') 
const errores = require('./errores')

let db

module.exports = {
    getUsuarios:async() => {

        let usuarios= []
        try{
            db= await connectDB()
            usuarios = await db.collection('usuarios').find().toArray()
            return usuarios
        }catch(error){
            errores(error);
            console.log("Error al realizar GetUsuarios")
        }
    },
    getUsuario: async (root,{id}) => {
        let usuarios
        try{
            db = await connectDB()
            usuarios = await db.collection('usuarios').findOne({_id: ObjectID(id)})
            return usuarios
    
        }catch(error){
            errores(error)
            console.error("Error al realizar la consulta a un curso ")
        }
    },
    getCategorias: async() => {
        let categorias=[]
        try{
            db = await connectDB()
            
            categorias = await db.collection('categorias').find().toArray()
            return categorias
        }catch(error){
            console.log("Error al realizar Get Categorias")
            errores(error)
            
        }
    },
    getCategoria: async(root,{id})=>{
        let categoria

        try{
            db = await connectDB()
            
            categoria = await db.collection('categorias').findOne({_id: ObjectID(id)}) != null ? 
            await db.collection('categorias').findOne({_id: ObjectID(id)}) : categoria
            return categoria
        }catch(error){
            console.log("Error al realizar Get Categoria por id")
            errores(error)
        }
    },
    getEtiquetas: async() => {
        let etiquetas = []
        try{   
            db = await connectDB()
            
            etiquetas = await db.collection('etiquetas').find().toArray()
            return etiquetas
        }catch(error){
            console.log("Error al realizar Get Etiquetas")
             errores(error)
        }
    },getEtiqueta:async(root,{id}) => {
        let etiqueta
        try {
            db = await connectDB()
            etiqueta = await db.collection('etiquetas').findOne({_id: ObjectID(id)}) != null ? 
            await db.collection('etiquetas').findOne({_id: ObjectID(id)}) : etiqueta
            return etiqueta
        } catch (error) {
            console.log("Error al realizar Get Etiqueta por id")
            errores(error)
        }
    },
    getComentarios: async() => {
        let comentarios = []

        try {
            db = await connectDB()
            
            comentarios = await db.collection('comentarios').find().toArray()   
            return comentarios
        } catch (error) {
            console.log("Error al realizar el Get Comentarios")
            errores(error)
        }
    },getComentario: async(root, {id}) => {
        let comentario
        try {
            db = await connectDB()
            
            comentario = await db.collection('comentarios').findOne({_id: ObjectID(id)}) !=null ? 
            await db.collection('comentarios').findOne({_id: ObjectID(id)}) : comentario
            return comentario
        } catch (error) {
            console.log("Error al realizar Get Comentario por id")
            errores(error)
            
        }
    },
    getPosts: async() => {
        let posts = []
        try {
            db = await connectDB()
            
            posts = await db.collection('posts').find().toArray()

            return posts
            
        } catch (error) {
            console.log("Error al realizar Get Posts")
            errores(error)
            
        }

    },
    getPost: async (root,{id}) => {
        let post 
        try {
            db = await connectDB()
           
            post = await db.collection('posts').findOne({_id: ObjectID(id)}) != null ? 
            await db.collection('posts').findOne({_id: ObjectID(id)})  : post
            return post
        } catch (error) {
            console.log("Error al realizar get Post por id")
            errores(error)
            
        }
    },
    getPostEtiquetas : async () => {
        let postetiquetas = []

        try {
            db = await connectDB()
            
            postetiquetas = await db.collection('postsetiquetas').find().toArray()

            return postetiquetas
        } catch (error) {
            console.log("Error al realizar get Post Etiquetas")
            errores(error)
            
        }
    }
}