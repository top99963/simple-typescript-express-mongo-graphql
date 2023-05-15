import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { getAll } from "./collection";

const collection = new GraphQLObjectType({
  name: "Collection",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    createdTime: { type: new GraphQLNonNull(GraphQLString) },
    deletedTime: { type: GraphQLString },
  },
});

const collectionSchema = {
  collections: {
    type: new GraphQLList(collection),
    resolve: () => getAll(),
  },
};

export { collectionSchema };
