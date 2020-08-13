const { gql } = require("apollo-server");

const typeDefs = gql`

  type Query {
    getAllCouriers: [Courier]
    getCourierById(id: ID!): Courier
    getCouriersByCapacity(capacity_required: Int!): [Courier]
    getCouriersByCapacityAndProximity(capacity_required: Int!, position: CoordinatesInput!, radius: Int!): [Courier] 
  }

  type Mutation {
    setCapacity(id: ID!, max_capacity: Int!): Courier
    addCapacity(id: ID!, max_capacity: Int!): Courier
    removeCapacity(id: ID!, max_capacity: Int!): Courier
    createCourier(courier: CourierInput!): Courier
    updateCourier(id: ID!, courier: CourierInput!): Courier
    deleteCourier(id: ID!): TransactionResponse
  }

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
    max_capacity: Int!
    firstName: String!
    lastName: String!
    email: String!
    active: Boolean
    position: CoordinatesInput
  }
`;

module.exports = typeDefs;


