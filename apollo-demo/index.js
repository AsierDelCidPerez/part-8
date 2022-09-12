const { ApolloServer, UserInputError, gql } = require('apollo-server')
const {v1: uuid} = require('uuid')

let persons = [
    {
      name: "Arto Hellas",
      phone: "040-123543",
      street: "Tapiolankatu 5 A",
      city: "Espoo",
      id: "3d594650-3436-11e9-bc57-8b80ba54c431"
    },
    {
        name: "Arturo Hellas",
        phone: "040-123543",
        street: "Tapiolankatu 5 A",
        city: "Espoo",
        id: "3d595650-2436-11e9-bc57-8b00ba54cc31"
    },
    {
      name: "Matti Luukkainen",
      phone: "040-432342",
      street: "Malminkaari 10 A",
      city: "Helsinki",
      id: '3d599470-3436-11e9-bc57-8b80ba54c431'
    },
    {
      name: "Venla Ruuska",
      street: "Nallemäentie 22 C",
      city: "Helsinki",
      id: '3d599471-3436-11e9-bc57-8b80ba54c431'
    },
]

const typeDefs = gql `
    enum YesNo {
        YES
        NO
    }

    type Adress {
        street: String!
        city: String!
    }
    type Mutation {
        addPerson(
            name: String!,
            phone: String,
            street: String!,
            city: String!
        ): Person
        editPhone(
            originalPhone: String!
            name: String!
            newPhone: String!
        ): Person
    }

    type Person {
        name: String!
        phone: String
        adress: Adress
        id: ID!
    }
    type Query {
        personCount: Int!
        allPersons(phone: YesNo): [Person!]!
        findPersonEstrict(name: String!): Person,
        findPerson(name: String!): [Person],
        filter(campo: String!, value: String!): [Person]
    }
`
const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: (root, args) => {
            if(!args.phone) return persons
            return args.phone === 'YES' ? persons.filter(p => p.phone) : persons.filter(p => !p.phone)
        },
        findPersonEstrict: (root, args) => persons.find(p => p.name === args.name),
        findPerson: (root, args) => persons.filter(p => p.name.match(args.name)),
        filter: (root, args) => persons.filter(p => p[args.campo] === args.value)
    },

    Mutation: {
        addPerson: (root, args) => {
            const person = {...args, id: uuid()}
            if(persons.find(p => p.name === person.name)){
                throw new UserInputError("Name must be unique", {
                    invalidArgs: person.name
                })
            }
            persons.push(person)
            return person
        },
        editPhone : (root, args) => {
            const person = persons.find(p => p.name === args.name && p.originalPhone === args.phone)
            const newPerson = {...person, phone: args.newPhone}
            persons = persons.filter(p => p.name !== args.name).concat(newPerson)
            return newPerson
        }
    },

    Person: {
        //Resolutores predeterminados
        name: root => root.name,
        phone: root => root.phone,
        // ...
        adress: root => {
            return {street: root.street, city: root.city}
        }
    }
}

const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen().then(({url}) => {
    console.log(`Apollo ready on url: ${url}`)
})