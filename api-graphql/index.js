const { ApolloServer, gql } = require("apollo-server");
const typeDefs  = require("./lib/schema");
const resolvers = require("./lib/resolvers"); 

const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});