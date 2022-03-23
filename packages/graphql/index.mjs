
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema.mjs';
import { Query } from './resolvers/Query.mjs';
import { Mutation } from './resolvers/Mutation.mjs';

const resolvers = { Query, Mutation };
const context =  {};
const ApolloServerArguments = { typeDefs, resolvers, context };
const server = new ApolloServer(ApolloServerArguments);

export default server;