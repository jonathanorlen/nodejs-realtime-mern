const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');
require('dotenv').config();

//Express Server
const app = express();

//DB
const db = async () => {
     try{
          const succes = await mongoose.connect(process.env.DATABASE_CLOUD, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
               useCreateIndex: true,
               useFindAndModify: true
          });
          console.log('DB Connected');
     }catch(err){
          console.log('DB Connection Error', err);
     }
}

//execute database connectio
db();
const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './typeDefs')));

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const apolloServer = new ApolloServer({
     typeDefs, resolvers
})

//Apply midleware method connect apolloserver to a specific HTPP framework ie: express
apolloServer.applyMiddleware({
     app
})

//server
const httpServer = http.createServer(app)
//res endpoint
app.get('/rest', function (req, res) {
     res.json({
          data: 'you hit the endpoint'
     })
})

//PORT
app.listen(process.env.PORT, function () {
     console.log(`server is ready at http://localhost:${process.env.PORT}`)
     console.log(`graphql serber is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`)
})