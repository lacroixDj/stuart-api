/** 
 * index.js
 * 
 * Welcome to the stuart-api! This is our application entry point.
 * If you want to a look under the hood then you can check the lib/ folder. 
 * 
 * About .ENV vars: When we run the app via docker-compose up, 
 * enviroments variables in the .env are mapped "automatically" via docker-compose.yml.
 * 
 * However, we need to provide a fallback method to load .env vars for those scenarios
 * where we are not using Docker. In this case we are using dotenv lib 
 * in order to load .env vars "manually".
 * 
 */ 
if (process.env.DOCKER_SETUP !== 'true') require('dotenv').config({ path: '../' });


/**
 *  Here we are loading apollo-server dependencies.
 * 
 *  We have also decoupled our schema definition and resolvers 
 *  into separate files for better code organization
 */
const { ApolloServer, gql } = require("apollo-server");
const typeDefs  = require("./lib/schema");
const resolvers = require("./lib/resolvers"); 

// This is our ApolloServer instance: 
const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

// In this line we start and run the server:
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// End.