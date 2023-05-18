import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { CustomResolveSchema } from "../../interface";

import { CollectionDetailsInputType, CollectionType } from "./collection.type";
import CollectionGateway from "./collection-gateway";

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
    resolve: CollectionGateway.get,
  },
};

const CollectionMutationSchema: CustomResolveSchema = {
  collectionCreate: {
    type: CollectionType,
    resolve: CollectionGateway.create,
  },
  collectionSetDetails: {
    type: CollectionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      detail: { type: CollectionDetailsInputType },
    },
    resolve: CollectionGateway.setDetails,
  },
  collectionDelete: {
    type: CollectionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, { id }) => {
      return { id };
    },
  },
};

export { CollectionMutationSchema, CollectionQuerySchema };
