import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

import { CollectionType } from "../../collection/gateway/collection.type";
import { GraphContext } from "../../type";

const BenefitType: any = new GraphQLObjectType({
  name: "Benefit",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    createdTime: { type: new GraphQLNonNull(GraphQLString) },
    deletedTime: { type: GraphQLString },
    details: { type: BenefitDetailsType },
    collection: {
      type: CollectionType,
      resolve: (benefit, {}, context: GraphContext) => {
        const { collectionLoader } = context;
        if (benefit.collection) {
          return collectionLoader.load(benefit.collection?.collectionId);
        }
        return;
      },
    },
  }),
});

const BenefitDetailsType = new GraphQLObjectType({
  name: "BenefitDetails",
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    imageId: { type: GraphQLString },
  }),
});

const BenefitDetailsInputType = new GraphQLInputObjectType({
  name: "BenefitDetailsInput",
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    imageId: { type: GraphQLString },
  }),
});

const BenefitCollectionInputType = new GraphQLInputObjectType({
  name: "BenefitCollectionInput",
  fields: () => ({
    id: { type: GraphQLString },
  }),
});

export {
  BenefitCollectionInputType,
  BenefitDetailsInputType,
  BenefitDetailsType,
  BenefitType,
};
