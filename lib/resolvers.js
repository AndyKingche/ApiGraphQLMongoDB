'use strict'
const queries = require('./queries')
const mutations = require('./mutation')
const types = require('./types')
module.exports ={
    Query: queries,
    Mutation: mutations,
    ...types
  }