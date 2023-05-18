import { Collection, MongoClient } from "mongodb";
import { CollectionEntity } from "./collection/core/collection";
import {
  CollectionDetailsEntity,
} from "./collection/core/collection-details";

export const connect = async () => {
  const connectionString = "mongodb://localhost:27017";
  const client = await new MongoClient(connectionString).connect();
  const db = client.db("graph");
  collections.collection = db.collection<CollectionEntity>("collection");
  collections.collectionDetails =
    db.collection<CollectionDetailsEntity>("collection");
};

export const collections: {
  collection?: Collection<CollectionEntity>;
  collectionDetails?: Collection<CollectionDetailsEntity>;
} = {};
