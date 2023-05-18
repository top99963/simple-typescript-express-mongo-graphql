import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const CollectionType = new GraphQLObjectType({
  name: "Collection",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    createdTime: { type: new GraphQLNonNull(GraphQLString) },
    deletedTime: { type: GraphQLString },
    details: { type: CollectionDetailsType },
  }),
});

const CollectionDetailsType = new GraphQLObjectType({
  name: "CollectionDetails",
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    collectionAddress: { type: GraphQLString },
  }),
});

const CollectionDetailsInputType = new GraphQLInputObjectType({
  name: "CollectionDetailsInput",
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    collectionAddress: { type: GraphQLString },
  }),
});

export {
  CollectionType,
  CollectionDetailsType,
  CollectionDetailsInputType,
};
