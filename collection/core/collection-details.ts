import { ObjectId, WithId } from "mongodb";
import { collections } from "../../db";

export type CollectionDetailsEntity = {
  details: {
    title: string;
    description: string;
    collectionAddress: string;
  };
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

  return document;
};

const getByIds = async (
  ids: string[]
): Promise<(CollectionDetailsEntity | undefined)[]> => {
  const collection = getCollection();

  const dick: { [id: string]: CollectionDetailsEntity | undefined } = {};
  const mapIds: { [id: string]: CollectionDetailsEntity | undefined } =
    ids.reduce(
      (result, currentValue) => ((result[currentValue] = undefined), result),
      dick
    );
  const queryIds = ids.filter((id) => ObjectId.isValid(id));

  const documents = await collection
    .find({
      _id: { $in: queryIds.map((id) => new ObjectId(id)) },
    })
    .toArray();
  documents.forEach((document) => {
    mapIds[document._id.toHexString()] = document;
  });
  return Object.keys(mapIds).map((key) => mapIds[key]);
};

const getAll = async (): Promise<CollectionDetailsEntity[]> => {
  const collection = getCollection();
  const documents = await collection.find().toArray();
  return documents;
};

const set = async (
  id: string,
  details: CollectionDetailsEntity
): Promise<void> => {
  const collection = getCollection();

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { details: details.details } },
    { upsert: true }
  );
  return;
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
  getAll,
  set,
};
