const { gql } = require("apollo-server");

const typeDefs = gql`

  type TransactionResponse {
    status: Int!
    message: String!
  }
  
  type Coordinates {
    lat: Float!
    lng: Float!
  }

  type Courier {
    id: ID!
    max_capacity: Int!
    firstName: String
    lastName: String
    email: String
    active: Boolean
    position: Coordinates
  }
  
  input CoordinatesInput {
    lat: Float!
    lng: Float!
  }

  input  CourierInput {
    id: ID!
    max_capacity: Int!
    firstName: String
    lastName: String
    email: String
    active: Boolean
    position: CoordinatesInput
  }

  type Query {
    getAllCouriers: [Courier]
    getCouriersByCapacity(capacity_required: Int!): [Courier]
    getCouriersByCapacityAndProximity(capacity_required: Int!, position: CoordinatesInput!, radius: Int!): [Courier] 
  }

  type Mutation {
    setCapacity(id: ID!, max_capacity: Int!): Courier
    addCapacity(id: ID!, max_capacity: Int!): Courier
    removeCapacity(id: ID!, max_capacity: Int!): Courier
    createCourier(courier: CourierInput!) Courier
    updateCourier(courier: CourierInput!) Courier
    deleteCourrier(id: ID!) TransactionResponse
  }
 
`;


module.exports = typeDefs;


