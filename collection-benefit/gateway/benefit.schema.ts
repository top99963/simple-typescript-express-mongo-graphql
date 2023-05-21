import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { CustomResolveSchema } from "../../interface";

import { GraphContext } from "../../type";
import BenefitGateway from "./benefit-gateway";
import {
  BenefitCollectionInputType,
  BenefitDetailsInputType,
  BenefitType,
} from "./benefit.type";

const BenefitQuerySchema: CustomResolveSchema = {
  benefits: {
    type: new GraphQLList(BenefitType),
    resolve: BenefitGateway.getAll,
  },
  benefit: {
    type: BenefitType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (benefit, { id }, context: GraphContext) => {
      return context.benefitLoader.load(id);
    },
  },
};

const BenefitMutationSchema: CustomResolveSchema = {
  benefitCreate: {
    type: BenefitType,
    resolve: async (benefit, args, context: GraphContext) => {
      const id = await BenefitGateway.create();
      return context.benefitLoader.load(id);
    },
  },
  benefitDetailsSet: {
    type: BenefitType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      detail: { type: BenefitDetailsInputType },
    },
    resolve: async (benefit, { id, detail }, context: GraphContext) => {
      await BenefitGateway.setDetails(id, detail);
      return context.benefitLoader.load(id);
    },
  },
  benefitCollectionSet: {
    type: BenefitType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      collection: { type: BenefitCollectionInputType },
    },
    resolve: async (benefit, { id, collection }, context: GraphContext) => {
      await BenefitGateway.setCollection(id, collection);
      return context.benefitLoader.load(id);
    },
  },
  benefitDelete: {
    type: BenefitType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async (benefit, { id }, context: GraphContext) => {
      await BenefitGateway.deleteItem(id);
      return context.benefitLoader.load(id);
    },
  },
};

export { BenefitMutationSchema, BenefitQuerySchema };

