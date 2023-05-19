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
    resolve: (parent, { id, detail }) => {
      return CollectionGateway.get(id);
    },
  },
};

const CollectionMutationSchema: CustomResolveSchema = {
  collectionCreate: {
    type: CollectionType,
    resolve: CollectionGateway.create,
  },
  collectionDetailsSet: {
    type: CollectionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      detail: { type: CollectionDetailsInputType },
    },
    resolve: (parent, { id, detail }) => {
      return CollectionGateway.setDetails(id, detail);
    },
  },
  collectionDelete: {
    type: CollectionType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, { id }) => {
      return CollectionGateway.deleteItem(id);
    },
  },
};

export { CollectionMutationSchema, CollectionQuerySchema };
