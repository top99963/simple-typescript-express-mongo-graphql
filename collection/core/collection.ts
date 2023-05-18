import { ObjectId, WithId } from "mongodb";
import { collections } from "../../db";

export type CollectionEntity = {
  id?: string;
  createdTime: number;
  deletedTime?: number;
};

const parseEntity = (document: WithId<CollectionEntity>): CollectionEntity => {
  return {
    id: document._id.toHexString(),
    createdTime: document.createdTime,
    deletedTime: document.deletedTime,
  };
};

const get = async (id: string): Promise<CollectionEntity | undefined> => {
  const collection = getCollection();

  const isIdValid = ObjectId.isValid(id);
  if (!isIdValid) {
    return undefined;
  }

  const document = await collection.findOne({ _id: new ObjectId(id) });
  if (!document) {
    return undefined;
  }

  return parseEntity(document);
};

const getByIds = async (
  ids: string[]
): Promise<(CollectionEntity | undefined)[]> => {
  const collection = getCollection();

  const mapIds: { [id: string]: CollectionEntity | undefined } = {};

  const queryIds = ids.filter((id) => ObjectId.isValid(id));

  const documents = await collection
    .find({
      _id: { $in: queryIds.map((id) => new ObjectId(id)) },
    })
    .toArray();

  documents.forEach((document) => {
    mapIds[document._id.toHexString()] = parseEntity(document);
  });

  return ids.map((key) => mapIds[key]);
};

const getAll = async (): Promise<CollectionEntity[]> => {
  const collection = getCollection();
  const documents = await collection.find().toArray();
  const parsedDocuments = documents.map((document) => parseEntity(document));
  return parsedDocuments;
};

const create = async (): Promise<{ id: string }> => {
  const collection = getCollection();
  const insertedResult = await collection.insertOne({
    createdTime: Date.now(),
  });
  return { id: insertedResult.insertedId.toHexString() };
};

const deleteItem = async (id: string): Promise<void> => {
  const collection = getCollection();

  const isIdValid = ObjectId.isValid(id);
  if (!isIdValid) {
    return undefined;
  }

  await collection.deleteOne({ _id: new ObjectId(id) });
  return;
};

const getCollection = () => {
  if (!collections || !collections.collection) {
    throw new Error("no database");
  }

  return collections.collection;
};

export default {
  get,
  getByIds,
  getAll,
  create,
  deleteItem,
};
