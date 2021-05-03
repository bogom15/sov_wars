const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
  type Person {
    name: String
    height: String
    mass: String
    gender: String
  }

  type Query {
    people: [Person]
  }
`;

const resolvers = {
  Query: {
    people: async () => {
      try {
        const people = await axios.get('https://swapi.dev/api/people')

        return people.data.results.map(({ name, birth_year, height, mass, hair_color, gender }) => ({
          name,
          height,
          mass,
          gender
        }))
      } catch (error) {
        throw error
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen()
.then(({ url }) => console.log(`Server is ready at ${url}`))
