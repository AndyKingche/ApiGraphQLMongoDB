'use strict'
const { ObjectID, ObjectId } = require('mongodb');
const connectDB = require('../db/db');
const errores = require('./errores')
module.exports = {
    createUsuario: async (root,{input}) => {
      
        const newUsuario = Object.assign(input)

        let db
        let usuarios

        try{
            db = await connectDB()
            usuarios = await db.collection('usuarios').insertOne(newUsuario)
            newUsuario._id = usuarios.insertedId
        }catch(error){
            errores(error)
            console.error("Existe un error al insertar un nuevo curso ")
        }
        return newUsuario
    },editUsuario: async ( root,{id,input} ) => {
        let db
        let usuario
        try {
            db = await connectDB()
            
            usuario = await db.collection("usuarios").updateOne({_id:ObjectID(id)},
            {$set: input})
            input._id = usuario.insertedId
            usuario = await db.collection("usuarios").findOne({_id:ObjectID(id)})
            
        } catch (error) {
            console.log("Error al editar un Usuario ")
            errores(error)
        }
        return usuario
    },deleteUsuario: async (root, {id}) =>{
        let usuario
        let db
        try {
            db = await connectDB()
            usuario = await db.collection("usuarios").findOne({_id:ObjectID(id)}) != null ? 
            await db.collection("usuarios").findOne({_id:ObjectID(id)}) :  null
            if( usuario != null){
                await db.collection("usuarios").remove({_id:ObjectID(id)})
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
        
        let db
        let categoria
 
        try {
            db = await connectDB()
           
            categoria = await db.collection('categorias').insertOne(newCategoria)
            newCategoria._id = categoria.insertedId
        } catch (error) {
            console.log("Error al crear una nueva Categoria")
            
        }

        return newCategoria
    },editCategoria: async (root,{id,input}) => {
        let db
        let categoria
        try {
            db = await connectDB()
            
            categoria = await db.collection('categorias').updateOne({_id:ObjectID(id)},
            {$set: input})
            input._id = categoria.insertedId
            categoria = await db.collection('categorias').findOne({_id:ObjectID(id)})
        } catch (error) {
            console.log("Error al atuclizar una categoria")
            errores(error)
        }
        return categoria
    },deleteCategoria: async(root, {id}) =>{
        let categoria
        let db 
        try {
            db = await connectDB()
           

            categoria = await db.collection("categorias").findOne({_id:ObjectID(id)}) != null ? 
            await db.collection("categorias").findOne({_id:ObjectID(id)}) :  null
            if( categoria != null){
                await db.collection("categorias").remove({_id:ObjectID(id)})
                return categoria
            }else{
                console.log("No existe el Id")
            }
            
        } catch (error) {
            console.log("Error al eliminar una categoria")
            errores(error)
            
        }

    },
    createEtiqueta: async(root,{input}) => {
        const newEtiqueta = Object.assign(input)

        let db
        let etiqueta
        try {
            db = await connectDB()
            etiqueta = await db.collection('etiquetas').insertOne(newEtiqueta)
            newEtiqueta._id = etiqueta.insertedId
        } catch (error) {
            console.log("Error al crear un nueva Etiqueta")
            errores(error)
        }
        return newEtiqueta

    },editEtiqueta: async(root, { id, input }) => {
        let db
        let etiqueta
        try {
            db = await connectDB()
            etiqueta = await db.collection("etiquetas").updateOne({_id:ObjectID(id)},
            {$set: input})
            input._id = etiqueta.insertedId
            etiqueta = await db.collection("etiquetas").findOne({_id:ObjectID(id)})
            
        } catch (error) {
            console.log("Error al editar una Etiqueta")
            errores(error)
        }
        return etiqueta

    },deleteEtiqueta: async (root,{id}) => {
        let etiqueta 
        let db
        try {
            db = await connectDB()
            etiqueta = await db.collection("etiquetas").findOne({_id:ObjectID(id)}) != null ? 
            await db.collection("etiquetas").findOne({_id:ObjectID(id)}) :  null
            if( etiqueta != null){
                await db.collection("etiquetas").remove({_id:ObjectID(id)})
                return etiqueta
            }else{
                console.log("No existe el Id")
            }
            
        } catch (error) {
            console.log("Error al eliminar una etiqueta")
            errores(error)
            
        }
    },
    createComentario: async( root,{input} ) => {
        const newComentario = Object.assign(input)
        
        let db
        let comentario
        let usuarioId
        console.log("todo el comentario ",ObjectID(newComentario.usuariosid))
        try {
            db =await connectDB()
            usuarioId = await db.collection('usuarios').findOne({_id: ObjectID(newComentario.usuariosid)}) !=null ?
            await db.collection('usuarios').findOne({_id: ObjectID(newComentario.usuariosid)}) : null
            
            if(usuarioId != null){
                console.log("SI ENTRE")
                newComentario.usuariosid = ObjectID(newComentario.usuariosid)
                comentario = await db.collection('comentarios').insertOne(
                    {contenido: newComentario.contenido})
                    console.log("este es el comentario:", comentario.insertedId)
                
                console.log("---", comentario)
                newComentario._id = comentario.insertedId
                await db.collection('comentarios').updateOne(
                    {_id: ObjectID(newComentario._id)},{
                        $addToSet: { 
                            usuariosid: ObjectID(newComentario.usuariosid) }
                    })
                return  await db.collection('comentarios').findOne( { _id: ObjectID(newComentario._id) } )
            }else{
                console.log("No existe el id ", newComentario.usuariosid)
                newComentario.contenido = "No existe el id del usuario"
                return newComentario
            }
           
        } catch (error) {
            console.log("Error al crear un comentario")
            errores(error)
        }
    },editComentario: async(root,{ id, input}) => {
        let db
       
        let comentario
        let usuarioId
        const comentarioEdit = Object.assign(input)
        console.log("...", comentarioEdit)
        try {
            db = await connectDB()

            comentario = await db.collection("comentarios").findOne({_id:ObjectID(id)}) != null ? 
            await db.collection("comentarios").findOne({_id:ObjectID(id)}) : null

            usuarioId = await db.collection("usuarios").findOne({_id:ObjectID(comentarioEdit.usuariosid)}) != null ?
            await db.collection("usuarios").findOne({_id:ObjectID(comentarioEdit.usuariosid)}) : null

            if(comentario != null){
                //input.usuarioId = ObjectID(comentarioId.usuaiosid)
                comentario = await db.collection("comentarios").updateOne({_id:ObjectID(id)},
                {$set: input})
                await db.collection('comentarios').updateOne(
                    {_id: ObjectID(id)},{
                        $addToSet: { 
                            usuariosid: ObjectID(comentario.usuariosid) }
                    })

                comentario = await db.collection("comentarios").findOne({_id:ObjectID(id)})
               return comentario
            }else{
                comentarioEdit.contenido = "Mensaje: No sea actualizo por que no existe el id del usuario"
                return comentarioEdit
            }
            
        } catch (error) {
            console.log("Error al editar un comentario")
            errores(error)
        }

    },deleteComentario : async (root,{id}) => {
        let comentario
        let db
        try {
            db = await connectDB()
            comentario = await db.collection("comentarios").findOne({_id:ObjectID(id)}) != null ? 
            await db.collection("comentarios").findOne({_id:ObjectID(id)}) :  null
            if( comentario != null){
                await db.collection("comentarios").remove({_id:ObjectID(id)})
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

        let db 
        let post
        let usuarioId
        let comentarioId
        let categoriaId
        try {
            db = await connectDB()

            usuarioId = await db.collection('usuarios').findOne({_id: ObjectID(newPost.usuariosid)}) !=null ?
            await db.collection('usuarios').findOne({_id: ObjectID(newPost.usuariosid)}) : null

            comentarioId = await db.collection('comentarios').findOne({_id: ObjectID(newPost.comentarioid)}) !=null ?
            await db.collection('comentarios').findOne({_id: ObjectID(newPost.comentarioid)}) : null

            categoriaId = await db.collection('categorias').findOne({_id: ObjectID(newPost.categoriasid)}) !=null ?
            await db.collection('categorias').findOne({_id: ObjectID(newPost.categoriasid)}) : null

            if(usuarioId != null && comentarioId != null && categoriaId != null)
            {
                console.log("Si entre")
                newPost.usuariosid = ObjectID(newPost.usuariosid)
                newPost.categoriasid = ObjectID(newPost.categoriasid)
                newPost.comentarioid = ObjectID(newPost.comentarioid)
                post = await db.collection('posts').insertOne(
                    {titulo: newPost.titulo,
                    estado: newPost.estado,
                fecha_publicacion: newPost.fecha_publicacion
                })
                console.log("-", post)
                newPost._id = post.insertedId
                console.log("..", newPost._id)
                await db.collection('posts').updateOne(
                    {_id: ObjectID(newPost._id)},{
                        $addToSet: { 
                            usuariosid: ObjectID(newPost.usuariosid),
                            comentarioid: ObjectID(newPost.comentarioid),
                            categoriasid : ObjectID(newPost.categoriasid)
                        }
                    })
                    console.log("h ", await db.collection('posts').findOne( { _id: ObjectID(newPost._id) } ))
                    return await db.collection('posts').findOne( { _id: ObjectID(newPost._id) } )
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
        let db 
        let post
        let usuarioId
        let comentarioId
        let categoriaId
        const postEdit = Object.assign(input)
         try {
             db = await connectDB()
             post = await db.collection("posts").findOne({_id:ObjectID(id)}) != null ? 
            await db.collection("posts").findOne({_id:ObjectID(id)}) : null
             console.log("post ", post)

             if(post != null){
               console.log("Si entre")
                post = await db.collection("posts").updateOne({_id:ObjectID(id)},
                {$set: input})
                input._id = post.insertedId
                await db.collection('posts').updateOne(
                    {_id: ObjectID(id)},{
                        $addToSet: { 
                            usuariosid: ObjectID(post.usuariosid),
                            comentarioid: ObjectID(post.comentarioid),
                            categoriasid : ObjectID(post.categoriasid)
                        }
                    })
   
                post = await db.collection('posts').findOne({_id: ObjectID(id)}) 
                return post
             }else{
                 postEdit.titulo = "Mensaje: "
                 return postEdit
             }
                
         } catch (error) {
             console.log("Erro al editar Post")
             errores(error)
         }


    },
    deletePost : async (root, {id}) => {
        let post
        let db
        try {
            db = await connectDB()
            
            post = await db.collection('posts').findOne({_id: ObjectID(id)}) != null ?
            await db.collection('posts').findOne({_id: ObjectID(id)}) : null

            if(post != null){
                await db.collection('posts').remove({_id: ObjectID(id)})
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