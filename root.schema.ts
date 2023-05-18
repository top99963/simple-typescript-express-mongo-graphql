import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  collectionQuerySchema,
  collectionMutationSchema,
} from "./collection/collection.schema";

const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...collectionQuerySchema,
  },
});

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...collectionMutationSchema,
  },
});

const schema = new GraphQLSchema({ query: rootQuery, mutation: rootMutation });

export { schema };
