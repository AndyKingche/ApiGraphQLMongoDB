'use strict'
const {mongodb,modelo} = require('../db/db')
const { ObjectID } = require('mongodb') 
const errores = require('./errores')

let db = mongodb
module.exports = {
    getUsuarios:async(root,{limit}) => {
        let usuarios = []
        limit = limit!= null ? limit : 0
        try{
            
            usuarios = modelo.user.then(res => res.find().limit(limit).toArray())
            
            return usuarios
        }catch(error){
            errores(error);
            console.log("Error al realizar GetUsuarios")
        }
    },
    getUsuario: async (root,{id}) => {
        let usuarios
        try{
            
            usuarios = modelo.user.then(usuarios => usuarios.findOne({_id: ObjectID(id)}))
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
            
            categorias = modelo.category.then(categorias=> categorias.find().limit(limit).toArray())
            
            return categorias
        }catch(error){
            console.log("Error al realizar Get Categorias")
            errores(error)
            
        }
    },
    getCategoria: async(root,{id})=>{
        let categorias

        try{
            categorias = modelo.category.then(categorias => categorias.findOne({_id: ObjectID(id)}))
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
            comentarios = modelo.comentarios.then(comentarios => comentarios.findOne({_id: ObjectID(id)}))
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
            //posts = modelo.posts.then(posts => posts.find().limit(limit).toArray())
            return  modelo.posts.then(posts => posts.find().limit(limit).toArray())
            
        } catch (error) {
            console.log("Error al realizar Get Posts")
            errores(error)
            
        }

    },
    getPost: async (root,{id}) => {
        let posts 
        try {
            posts = modelo.posts.then(posts => posts.findOne({_id: ObjectID(id)}))
            return posts
        } catch (error) {
            console.log("Error al realizar get Post por id")
            errores(error)
            
        }
    }
}