'use strict'
const {mongodb} = require('../db/db')
const { ObjectID } = require('mongodb') 
const errores = require('./errores')

let db = mongodb
module.exports = {
    getUsuarios:async(root,{limit}) => {
        let usuarios = []
        limit = limit!= null ? limit : 0
        try{
            usuarios = db('usuarios')
            usuarios = await Promise.resolve(usuarios)
            usuarios = usuarios.find().limit(limit).toArray()
            
            return usuarios
        }catch(error){
            errores(error);
            console.log("Error al realizar GetUsuarios")
        }
    },
    getUsuario: async (root,{id}) => {
        let usuarios
        try{
            usuarios = db('usuarios')
            usuarios = await Promise.resolve(usuarios)
            usuarios = usuarios.findOne({_id: ObjectID(id)})
            return usuarios
        }catch(error){
            errores(error)
            console.error("Error al realizar la consulta a un curso ")
        }
    },
    getCategorias: async(root,{limit}) => {
        let categorias=[]
        limit = limit != null ? limit : 0
        try{
            categorias = db('categorias')
            categorias = await Promise.resolve(categorias)
            categorias = categorias.find().limit(limit).toArray()
            
            return categorias
        }catch(error){
            console.log("Error al realizar Get Categorias")
            errores(error)
            
        }
    },
    getCategoria: async(root,{id})=>{
        let categorias

        try{
            categorias = db('categorias')
            categorias = await Promise.resolve(categorias)
            categorias = categorias.findOne({_id: ObjectID(id)}) != null ? 
             categorias.findOne({_id: ObjectID(id)}) : categorias
            return categorias
        }catch(error){
            console.log("Error al realizar Get Categoria por id")
            errores(error)
        }
    },
    
    getComentarios: async(root,{limit}) => {
        let comentarios = []
        limit = limit!= null ? limit : 0
        try {
            comentarios = db('comentarios')
            comentarios = await Promise.resolve(comentarios)
            comentarios = comentarios.find().limit(limit).toArray()   
            return comentarios
        } catch (error) {
            console.log("Error al realizar el Get Comentarios")
            errores(error)
        }
    },getComentario: async(root, {id}) => {
        let comentarios
        try {
            comentarios = db('comentarios')
            comentarios = await Promise.resolve(comentarios)
            comentarios = comentarios.findOne({_id: ObjectID(id)}) !=null ? 
            comentarios.findOne({_id: ObjectID(id)}) : comentarios
            return comentarios
        } catch (error) {
            console.log("Error al realizar Get Comentario por id")
            errores(error)
            
        }
    },
    getPosts: async(root,{limit}) => {
        let posts = []
        limit = limit != null ? limit : 0
        try {
            posts = db('posts')
            posts = await Promise.resolve(posts)
            posts = posts.find().limit(limit).toArray()
            return posts
            
        } catch (error) {
            console.log("Error al realizar Get Posts")
            errores(error)
            
        }

    },
    getPost: async (root,{id}) => {
        let posts 
        try {
            posts = db('posts')
            posts = await Promise.resolve(posts)
            posts = posts.findOne({_id: ObjectID(id)}) != null ? 
            posts.findOne({_id: ObjectID(id)})  : posts
            return posts
        } catch (error) {
            console.log("Error al realizar get Post por id")
            errores(error)
            
        }
    }
}