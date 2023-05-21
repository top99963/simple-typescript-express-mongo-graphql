import express from "express";
// import { createHandler } from "graphql-http/lib/use/express";
import { graphqlHTTP as createHandler } from "express-graphql";
import { schema } from "./root.schema";
import { connect } from "./db";
import DataLoader from "dataloader";
import CollectionGateway from "./collection/gateway/collection-gateway";
import BenefitGateway from "./collection-benefit/gateway/benefit-gateway";
import BenefitQuery from "./collection-benefit/core/benefit-query";

const app = express();

const batchBenefitByCollectionId = async (collectionIds: readonly string[]) => {
  const benefits = await BenefitQuery.getByCollectionIds(
    collectionIds as string[]
  );
  const benefitsByCollectionIds: Array<Array<any>> = collectionIds.map(
    () => []
  );
  console.log(benefits)
  benefits.forEach((benefit) => {
    if (benefit?.collection?.collectionId) {
      const index = collectionIds.indexOf(benefit.collection.collectionId);
      if (index !== -1) {
        benefitsByCollectionIds[index].push(benefit);
      }
    }
  });
  // console.log(benefitsByCollectionIds)
  return benefitsByCollectionIds;
};

connect().then(() => {
  app.all(
    "/graphql",
    createHandler({
      schema,
      graphiql: true,
      context: {
        collectionLoader: new DataLoader((keys) => {
          return CollectionGateway.getByIds(keys as string[]);
        }),
        benefitLoader: new DataLoader((keys) => {
          return BenefitGateway.getByIds(keys as string[]);
        }),
        benefitByCollectionIdLoader: new DataLoader(batchBenefitByCollectionId),
      },
    })
  );
  app.listen({ port: 4000 });
  console.log("Listening to port 4000");
});
