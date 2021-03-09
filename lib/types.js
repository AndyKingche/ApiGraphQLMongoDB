'use strict'

const {mongodb} = require('../db/db')
const { dataloaderUsuarios, dataloaderPosts, dataloaderCategoria,dataloaderComentarios } = require('./dataloader-mongodb')


let db = mongodb
module.exports = {
    Comentarios :{
        usuariosid: async({ usuariosid }) => 
        await Array(dataloaderUsuarios.load(usuariosid)),
        postsid:async({postsid})=> await Array(dataloaderPosts.load(postsid))
     }
    ,ComentariosPost :{
        usuariosid: async({ usuariosid }) => await Array(dataloaderUsuarios.load(usuariosid))
    },
    Posts:{
        categoriasid: async ( {categoriasid} ) => await Array(dataloaderCategoria.load(categoriasid)),
        usuariosid: async ( {usuariosid} ) => await Array(dataloaderUsuarios.load(usuariosid)),
        comentarios: async ({_id}) => await Array(dataloaderComentarios.load(_id))
    },
    PostsComentario:{
        categoriasid: async ( {categoriasid} ) => await Array(dataloaderCategoria.load(categoriasid)),
        usuariosid: async ( {usuariosid} ) => await Array(dataloaderUsuarios.load(usuariosid))

}
}