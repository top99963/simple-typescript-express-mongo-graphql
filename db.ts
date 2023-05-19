import { Collection, MongoClient } from "mongodb";
import { BenefitMongoEntity } from "./collection-benefit/core/benefit";
import { CollectionMongoEntity } from "./collection/core/collection";
import { CollectionDetailsMongoEntity } from "./collection/core/collection-details";
import { CollectionQueryMongoEntity } from "./collection/core/collection-query";
import { BenefitDetailsMongoEntity } from "./collection-benefit/core/benefit-details";
import { BenefitQueryMongoEntity } from "./collection-benefit/core/benefit-query";
import { BenefitCollectionMongoEntity } from "./collection-benefit/core/benefit-collection";

export const connect = async () => {
  const connectionString = "mongodb://localhost:27017";
  const client = await new MongoClient(connectionString).connect();
  const db = client.db("graph");
  collections.collection = db.collection<CollectionMongoEntity>("collection");
  collections.collectionDetails =
    db.collection<CollectionDetailsMongoEntity>("collection");
  collections.collectionQuery =
    db.collection<CollectionQueryMongoEntity>("collection");
  collections.benefit = db.collection<BenefitMongoEntity>("benefit");
  collections.benefitDetails =
    db.collection<BenefitDetailsMongoEntity>("benefit");
  collections.benefitCollection =
    db.collection<BenefitCollectionMongoEntity>("benefit");
  collections.benefitQuery = db.collection<BenefitQueryMongoEntity>("benefit");
};

export const collections: {
  collection?: Collection<CollectionMongoEntity>;
  collectionDetails?: Collection<CollectionDetailsMongoEntity>;
  collectionQuery?: Collection<CollectionQueryMongoEntity>;
  benefit?: Collection<BenefitMongoEntity>;
  benefitDetails?: Collection<BenefitDetailsMongoEntity>;
  benefitCollection?: Collection<BenefitCollectionMongoEntity>;
  benefitQuery?: Collection<BenefitQueryMongoEntity>;
} = {};
