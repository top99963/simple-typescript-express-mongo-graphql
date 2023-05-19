import { GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { CustomResolveSchema } from "../../interface";

import {
  BenefitCollectionInputType,
  BenefitDetailsInputType,
  BenefitType,
} from "./benefit.type";
import BenefitGateway from "./benefit-gateway";

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
    resolve: (parent, { id, detail }) => {
      return BenefitGateway.get(id);
    },
  },
};

const BenefitMutationSchema: CustomResolveSchema = {
  benefitCreate: {
    type: BenefitType,
    resolve: BenefitGateway.create,
  },
  benefitDetailsSet: {
    type: BenefitType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      detail: { type: BenefitDetailsInputType },
    },
    resolve: (parent, { id, detail }) => {
      return BenefitGateway.setDetails(id, detail);
    },
  },
  benefitCollectionSet: {
    type: BenefitType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
      collection: { type: BenefitCollectionInputType },
    },
    resolve: (parent, { id, collection }) => {
      return BenefitGateway.setCollection(id, collection);
    },
  },
  benefitDelete: {
    type: BenefitType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: (parent, { id }) => {
      return BenefitGateway.deleteItem(id);
    },
  },
};

export { BenefitMutationSchema, BenefitQuerySchema };
