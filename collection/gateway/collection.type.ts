import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { BenefitType } from "../../collection-benefit/gateway/benefit.type";
import BenefitQueryManager from "../../collection-benefit/core/benefit-query";
import { GraphContext } from "../../type";

const CollectionType: any = new GraphQLObjectType({
  name: "Collection",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    createdTime: { type: new GraphQLNonNull(GraphQLString) },
    deletedTime: { type: GraphQLString },
    details: { type: CollectionDetailsType },
    benefits: {
      type: new GraphQLList(BenefitType),
      resolve: async (collection, _, context: GraphContext) => {
        return context.benefitByCollectionIdLoader.load(collection.id);
      },
    },
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

export { CollectionType, CollectionDetailsType, CollectionDetailsInputType };
