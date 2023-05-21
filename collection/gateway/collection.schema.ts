import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { CustomResolveSchema } from "../../interface";

import { CollectionDetailsInputType, CollectionType } from "./collection.type";
import CollectionGateway from "./collection-gateway";
import { GraphContext } from "../../type";

const CollectionQuerySchema: CustomResolveSchema = {
  collections: {
    type: new GraphQLList(CollectionType),
    resolve: CollectionGateway.getAll,
  },
  collection: {
    type: CollectionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, { id }, context: GraphContext) => {
      return context.collectionLoader.load(id);
    },
  },
};

const CollectionMutationSchema: CustomResolveSchema = {
  collectionCreate: {
    type: CollectionType,
    resolve: async (colelction, _, context: GraphContext) => {
      const id = await CollectionGateway.create();
      return context.collectionLoader.load(id);
    },
  },
  collectionDetailsSet: {
    type: CollectionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      detail: { type: CollectionDetailsInputType },
    },
    resolve: async (colelction, { id, detail }, context: GraphContext) => {
      await CollectionGateway.setDetails(id, detail);
      return context.collectionLoader.load(id);
    },
  },
  collectionDelete: {
    type: CollectionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (colelction, { id }, context: GraphContext) => {
      await CollectionGateway.deleteItem(id);
      return context.collectionLoader.load(id);
    },
  },
};

export { CollectionMutationSchema, CollectionQuerySchema };
