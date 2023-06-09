import { ObjectId } from "mongodb";
import { collections } from "../../db";

export type CollectionDetailsEntity = {
  title: string;
  description: string;
  collectionAddress: string;
};

export type CollectionDetailsMongoEntity = {
  details: CollectionDetailsEntity;
};

const get = async (
  id: string
): Promise<CollectionDetailsEntity | undefined> => {
  const collection = getCollection();

  const isIdValid = ObjectId.isValid(id);
  if (!isIdValid) {
    return undefined;
  }

  const document = await collection.findOne({ _id: new ObjectId(id) });
  if (!document) {
    return undefined;
  }

  return document.details;
};

const getByIds = async (
  ids: string[]
): Promise<(CollectionDetailsEntity | undefined)[]> => {
  const collection = getCollection();

  const mapIds: { [id: string]: CollectionDetailsEntity | undefined } = {};
  const queryIds = ids.filter((id) => ObjectId.isValid(id));

  const documents = await collection
    .find({
      _id: { $in: queryIds.map((id) => new ObjectId(id)) },
    })
    .toArray();
  documents.forEach((document) => {
    mapIds[document._id.toHexString()] = document.details;
  });
  return ids.map((key) => mapIds[key]);
};

const set = async (
  id: string,
  details: CollectionDetailsEntity
): Promise<void> => {
  const collection = getCollection();

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { details: details } }
  );
};

const getCollection = () => {
  if (!collections || !collections.collectionDetails) {
    throw new Error("no database");
  }

  return collections.collectionDetails;
};

export default {
  get,
  getByIds,
  set,
};
