import { ObjectId, WithId } from "mongodb";
import { collections } from "../db";

export type CollectionEntity = {
  id?: string;
  createdTime: number;
  deletedTime?: number;
};

const parseEntity = (
  CollectionEntity: WithId<CollectionEntity>
): CollectionEntity => {
  return {
    id: CollectionEntity._id.toHexString(),
    createdTime: CollectionEntity.createdTime,
    deletedTime: CollectionEntity.deletedTime,
  };
};

export const get = async (
  id: string
): Promise<CollectionEntity | undefined> => {
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

export const getByIds = async (
  ids: string[]
): Promise<(CollectionEntity | undefined)[]> => {
  const collection = getCollection();

  const dick: { [id: string]: CollectionEntity | undefined } = {};
  const mapIds: { [id: string]: CollectionEntity | undefined } = ids.reduce(
    (result, currentValue) => ((result[currentValue] = undefined), result),
    dick
  );
  const queryIds = ids.filter((id) => ObjectId.isValid(id));

  const CollectionEntitys = await collection
    .find({
      _id: { $in: queryIds.map((id) => new ObjectId(id)) },
    })
    .toArray();
  CollectionEntitys.forEach((CollectionEntity) => {
    mapIds[CollectionEntity._id.toHexString()] = parseEntity(CollectionEntity);
  });
  return Object.keys(mapIds).map((key) => mapIds[key]);
};

export const create = async (): Promise<{ id: string }> => {
  const collection = getCollection();

  const CollectionEntity = await collection.insertOne({
    createdTime: Date.now(),
  });
  return { id: CollectionEntity.insertedId.toHexString() };
};

export const getAll = async (): Promise<CollectionEntity[]> => {
  const collection = getCollection();
  const CollectionEntitys = await collection.find().toArray();
  const parsedCollectionEntity = CollectionEntitys.map((CollectionEntity) =>
    parseEntity(CollectionEntity)
  );
  return parsedCollectionEntity;
};

const getCollection = () => {
  if (!collections || !collections.collection) {
    throw new Error("no database");
  }

  return collections.collection;
};
