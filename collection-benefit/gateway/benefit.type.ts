import {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const BenefitType = new GraphQLObjectType({
  name: "Benefit",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    createdTime: { type: new GraphQLNonNull(GraphQLString) },
    deletedTime: { type: GraphQLString },
    details: { type: BenefitDetailsType },
    collection: { type: BenefitCollectionType },
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

const BenefitCollectionType = new GraphQLObjectType({
  name: "BenefitCollection",
  fields: () => ({
    collectionId: { type: GraphQLString },
  }),
});

const BenefitCollectionInputType = new GraphQLInputObjectType({
  name: "BenefitCollectionInput",
  fields: () => ({
    collectionId: { type: GraphQLString },
  }),
});

export {
  BenefitType,
  BenefitDetailsType,
  BenefitDetailsInputType,
  BenefitCollectionType,
  BenefitCollectionInputType,
};
