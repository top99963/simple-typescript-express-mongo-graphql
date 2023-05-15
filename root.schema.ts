import { GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql";
import { collectionSchema } from "./collection/collection.schema";

const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...collectionSchema,
  },
});

const schema = new GraphQLSchema({ query: rootQuery });

export { schema };
