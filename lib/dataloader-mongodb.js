const {mongodb,modelo} = require('../db/db')
const errores = require('./errores')
const { ObjectID } = require('mongodb');
const DataLoader = require('dataloader')
let db = mongodb

async function user (keys) {
 return await modelo.user.then(usuarios=> usuarios.find({_id: {$in: keys}}).toArray());
}
async function category (keys) {
  
  return await modelo.category.then(categorias => categorias.find({_id: {$in: keys}}).toArray());
}

async function posteo (keys) {
  return await modelo.posts.then(posts => posts.find({_id: {$in: keys}}).toArray());
}
const loaderCategorias = new DataLoader(keys=>category(keys),
{cacheKeyFn: key => key.toString()},
);

const loaderComentarios = new DataLoader(async (keys)=>{
  return await  modelo.comentarios.then(posts => posts.find({_id: {$in: keys}}).toArray());
}
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

