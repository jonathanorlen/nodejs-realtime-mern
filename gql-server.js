const { ApolloServer } = require('apollo-server');

require('dotenv').config();

//type query / mutation / subscription
const typeDefs = `
     type Query {
          totalPosts: Int!
     }
`
const resolvers = {
     Query: {
          totalPosts: () => 42
     }
}

const apolloServer = new ApolloServer({
     typeDefs, resolvers
})

apolloServer.listen(process.env.PORT, function () {
     console.log(`server is read at http://localhost:${process.env.PORT}`)
})