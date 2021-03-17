'use strict'
require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { readFile, readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')
const cors = require('cors')
const app = express()
const port = process.env.port || 4000

const typeDefs = readFileSync(
    join(
        __dirname,'lib','schema.graphql'),'utf-8')
const schema = makeExecutableSchema({typeDefs,resolvers})

app.use(cors())
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`El servidor se esta ejecutando en : http://localhost:${port}/api/mongodb`)
})