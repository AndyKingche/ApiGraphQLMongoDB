'use strict'
const { ObjectID, ObjectId } = require('mongodb');
const {mongodb} = require('../db/db');
const errores = require('./errores')
let db = mongodb
module.exports = {
    createUsuario: async (root,{input}) => {    
        const newUsuario = Object.assign(input)
        let usuarios
        try{
            usuarios = db('usuarios')
            usuarios = await Promise.resolve(usuarios)
            usuarios = usuarios.insertOne(newUsuario)
            newUsuario._id = usuarios.insertedId
        }catch(error){
            errores(error)
            console.error("Existe un error al insertar un nuevo curso ")
        }
        return newUsuario
    },editUsuario: async ( root,{id,input} ) => {
        let usuario
        let usuarios
        try {
            usuarios = db('usuarios')
            usuarios = await Promise.resolve(usuarios)
            usuarios = usuarios.updateOne({_id:ObjectID(id)},
            {$set: input})
            input._id = usuarios.insertedId
            usuario = usuarios.findOne({_id:ObjectID(id)})
            
        } catch (error) {
            console.log("Error al editar un Usuario ")
            errores(error)
        }
        return usuario
    },deleteUsuario: async (root, {id}) =>{
        let usuario
        let usuarios
        try {
            usuarios = db('usuarios')
            usuarios = await Promise.resolve(usuarios)
            usuario = usuarios.findOne({_id:ObjectID(id)}) != null ? 
            usuario.findOne({_id:ObjectID(id)}) :  null
            if( usuario != null){
                usuarios.remove({_id:ObjectID(id)})
                return usuario
            }else{
                console.log("No existe el Id")
            }
            
        } catch (error) {
            console.log("Error al eliminar un Usuario")
            errores(error)
        }
    },   
    createCategoria: async(root,{input}) => {
        const newCategoria = Object.assign(input)
        let categorias
        try {
            categorias = db('categorias')
            categorias = await Promise.resolve(categorias)
            categorias = categorias.insertOne(newCategoria)
            newCategoria._id = categorias.insertedId
        } catch (error) {
            console.log("Error al crear una nueva Categoria")
            
        }

        return newCategoria
    },editCategoria: async (root,{id,input}) => {
        let categorias
        try {
            categorias = db('categorias')
            categorias = await Promise.resolve(categorias)
            categorias = categorias.updateOne({_id:ObjectID(id)},
            {$set: input})
            input._id = categorias.insertedId
            categorias = categorias.findOne({_id:ObjectID(id)})
        } catch (error) {
            console.log("Error al atuclizar una categoria")
            errores(error)
        }
        return categorias
    },deleteCategoria: async(root, {id}) =>{
        let categoria
        let categorias
        try {
            categorias = db('categorias')
            categorias = await Promise.resolve(categorias)
            categoria = categorias.findOne({_id:ObjectID(id)}) != null ? 
            categorias.findOne({_id:ObjectID(id)}) :  null
            if( categoria != null){
                await categorias.remove({_id:ObjectID(id)})
                return categoria
            }else{
                console.log("No existe el Id")
            }
            
        } catch (error) {
            console.log("Error al eliminar una categoria")
            errores(error)
            
        }

    },
     createComentario: async( root,{input} ) => {
        const newComentario = Object.assign(input)
        let comentarios
        let comentario
        let usuarios
        let posts
        let usuarioId
        let postId
        try {
            comentarios = db('comentarios')
            comentarios = await Promise.resolve(comentarios)
            usuarios = db('usuarios')
            usuarios = await Promise.resolve(usuarios)
            posts = db('posts')
            posts = await Promise.resolve(posts)

            usuarioId = usuarios.findOne({_id: ObjectID(newComentario.usuariosid)}) !=null ?
            usuarios.findOne({_id: ObjectID(newComentario.usuariosid)}) : null
            
            postId = posts.findOne({_id: ObjectID(newComentario.postsid)}) !=null ?
            posts.findOne({_id: ObjectID(newComentario.postsid)}) : null

            if(usuarioId != null && postId != null){
                console.log("SI ENTRE")
                newComentario.usuariosid = ObjectID(newComentario.usuariosid)
                newComentario.postsid = ObjectID(newComentario.postsid)
                comentario = comentarios.insertOne(
                    {contenido: newComentario.contenido})
                
                newComentario._id = comentario.insertedId
                comentarios.updateOne(
                    {_id: ObjectID(newComentario._id)},{
                        $addToSet: { 
                            usuariosid: ObjectID(newComentario.usuariosid),
                            postsid: ObjectID(newComentario.postsid) }
                    })
                return  comentarios.findOne( { _id: ObjectID(newComentario._id) } )
            }else{
                
                return null
            }
           
        } catch (error) {
            console.log("Error al crear un comentario")
            errores(error)
        }
    },editComentario: async(root,{ id, input}) => {  
        const comentarioEdit = Object.assign(input)
        let comentario
        let comentarios
        try {
            comentarios = db('comentarios')
            comentarios = await Promise.resolve(comentarios)

            comentario = comentarios.findOne({_id:ObjectID(id)}) != null ? 
            comentarios.findOne({_id:ObjectID(id)}) : null

            if(comentario != null){
                //input.usuarioId = ObjectID(comentarioId.usuaiosid)
                comentario = comentarios.updateOne({_id:ObjectID(id)},
                {$set: input})
               comentarios.updateOne(
                    {_id: ObjectID(id)})

                comentario = comentarios.findOne({_id:ObjectID(id)})
               return comentario
            }else{
               // comentarioEdit.contenido = "Mensaje: No sea actualizo por que no existe el id del usuario"
                return null
            }
            
        } catch (error) {
            console.log("Error al editar un comentario")
            errores(error)
        }

    },deleteComentario : async (root,{id}) => {
        let comentario
        let comentarios
        try {
            comentarios = db('comentarios')
            comentarios = await Promise.resolve(comentarios)
            comentario = comentarios.findOne({_id:ObjectID(id)}) != null ? 
            comentarios.findOne({_id:ObjectID(id)}) :  null
            if( comentario != null){
                comentarios.remove({_id:ObjectID(id)})
                return comentario
            }else{
                console.log("No existe el Id")
                return null
            }
        } catch (error) {
            console.log("Error al eliminar un comentario")
            errores(error)
        }
        
    },
    createPost: async (root,{ input }) => {
        const newPost = Object.assign(input)
        let post
        let posts
        let categorias
        let usuarios
        let usuarioId
        let comentarioId
        let categoriaId
        try {
            posts = db('posts')
            posts = await Promise.resolve(posts)
            usuarios = db('usuarios')
            usuarios = await Promise.resolve(usuarios)
            
            usuarioId = usuarios.findOne({_id: ObjectID(newPost.usuariosid)}) !=null ?
            usuarios.findOne({_id: ObjectID(newPost.usuariosid)}) : null

            categoriaId = categorias.findOne({_id: ObjectID(newPost.categoriasid)}) !=null ?
            categorias.findOne({_id: ObjectID(newPost.categoriasid)}) : null

            
            if(usuarioId != null && categoriaId != null)
            {
                newPost.usuariosid = ObjectID(newPost.usuariosid)
                newPost.categoriasid = ObjectID(newPost.categoriasid)
                post = posts.insertOne(
                    {titulo: newPost.titulo,
                    estado: newPost.estado,
                fecha_publicacion: newPost.fecha_publicacion,
                keywords: newPost.kewywords
                })
                newPost._id = post.insertedId
                posts.updateOne(
                    {_id: ObjectID(newPost._id)},{
                        $addToSet: { 
                            usuariosid: ObjectID(newPost.usuariosid),
                            categoriasid : ObjectID(newPost.categoriasid)
                        }
                    })
                   
                    return posts.findOne( { _id: ObjectID(newPost._id) } )
                }else{
                    console.log("No existe el id ", newPost.usuariosid)
                newPost.titulo = "No existe el id del usuario"
                return newPost

            }

           
        } catch (error) {
            console.log("Error al crear un Post")
            errores(error)
            
        }

    },editPost: async (root, { id , input}) => {
        const postEdit = Object.assign(input)
        let post
        let posts
         try {
            posts = db('posts')
            posts = await Promise.resolve(posts)

             post =posts.findOne({_id:ObjectID(id)}) != null ? 
            posts.findOne({_id:ObjectID(id)}) : null
 
             if(post != null){
                post = posts.updateOne({_id:ObjectID(id)},
                {$set: input})
                input._id = post.insertedId
                posts.updateOne(
                    {_id: ObjectID(id)},{
                        $addToSet: { 
                            usuariosid: ObjectID(post.usuariosid),
                            comentarioid: ObjectID(post.comentarioid),
                            categoriasid : ObjectID(post.categoriasid)
                        }
                    })
   
                post = posts.findOne({_id: ObjectID(id)}) 
                return post
             }else{
                return null
             }
                
         } catch (error) {
             console.log("Erro al editar Post")
             errores(error)
         }


    },
    deletePost : async (root, {id}) => {
        let post
        let posts
        try {
            posts = db('posts')
            posts = await Promise.resolve(posts)
            
            post = posts.findOne({_id: ObjectID(id)}) != null ?
            posts.findOne({_id: ObjectID(id)}) : null

            if(post != null){
                posts.remove({_id: ObjectID(id)})
                return post

            }else{
                return null
            }
            
        } catch (error) {
            console.log("Error al eliminar un Post")
            errores(error)
        }

    }
}