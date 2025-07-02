const typeDefs = `
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    cars: [Car]
  }

  type Car {
    id: ID!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
  }

  type Query {
    people: [Person]
    cars: [Car]
    personWithcars(id: ID!): Person
  }

  type Mutation {
    addPerson(firstName: String!, lastName: String!): Person
    updatePerson(id: ID!, firstName: String, lastName: String): Person
    deletePerson(id: ID!): Person
    deleteAllPeople: Boolean!

    addCar(
      year: Int!
      make: String!
      model: String!
      price: Float!
      personId: ID!
    ): Car

    updateCar(
      id: ID!
      year: Int
      make: String
      model: String
      price: Float
      personId: ID
    ): Car

    deleteCar(id: ID!): Car
    deleteAllCars: Boolean!
  }
`;

module.exports = { typeDefs };