const {mongodb} = require('../db/db')
const errores = require('./errores')
const { ObjectID } = require('mongodb');
const DataLoader = require('dataloader')
let db = mongodb

async function user (keys) {
  let usuarios = db('usuarios')
  usuarios = await Promise.resolve(usuarios)
  return await usuarios.find({_id: {$in: keys}}).toArray();
}
async function category (keys) {
  let categorias = db('categorias')
  categorias = await Promise.resolve(categorias)
  return await categorias.find({_id: {$in: keys}}).toArray();
}
async function comment (keys) {
  let comentarios = db('comentarios')
  comentarios = await Promise.resolve(comentarios)
  return await comentarios.find({postsid: {$in: keys}}).toArray();
}
async function posteo (keys) {
  let posts = db('posts')
  posts = await Promise.resolve(posts)
  return await posts.find({_id: {$in: keys}}).toArray();
}
const loaderCategorias = new DataLoader(keys=>category(keys),
{cacheKeyFn: key => key.toString()},
);

const loaderComentarios = new DataLoader(keys=>comment(keys),
{cacheKeyFn: key => key.toString()},
);

const loaderPosts = new DataLoader(keys=>posteo(keys),
{cacheKeyFn: key => key.toString()},
);

const loaderUsuarios = new DataLoader(keys=>user(keys),
  {cacheKeyFn: key => key.toString()},
);
module.exports={
dataloaderUsuarios:loaderUsuarios,
dataloaderCategoria:loaderCategorias,
dataloaderPosts: loaderPosts,
dataloaderComentarios: loaderComentarios
}

