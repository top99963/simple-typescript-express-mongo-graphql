import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  CollectionMutationSchema,
  CollectionQuerySchema,
} from "./collection/gateway/collection.schema";
import {
  BenefitMutationSchema,
  BenefitQuerySchema,
} from "./collection-benefit/gateway/benefit.schema";

const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    ...CollectionQuerySchema,
    ...BenefitQuerySchema,
  }),
});

const rootMutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    ...CollectionMutationSchema,
    ...BenefitMutationSchema,
  }),
});

const schema = new GraphQLSchema({ query: rootQuery, mutation: rootMutation });

export { schema };
