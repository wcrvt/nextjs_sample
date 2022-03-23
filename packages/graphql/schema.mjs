import { gql } from 'apollo-server-express';


const typeDef = `
`;

const inputDef = `
`;

const queryDef = `
	type Query {
		samples: [[Float]]
	}
`;

const mutationDef = `
	type Mutation {
		samples: [[Float]]
	}
`;

export const typeDefs = gql(typeDef + inputDef + queryDef + mutationDef);