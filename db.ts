import { Collection, MongoClient } from "mongodb";
import { CollectionEntity } from "./collection/collection";

export const connect = async () => {
  const connectionString = "mongodb://localhost:27017";
  const client = await new MongoClient(connectionString).connect();
  const db = client.db("graph");
  collections.collection = db.collection<CollectionEntity>("collection");
};

export const collections: { collection?: Collection<CollectionEntity> } = {};
