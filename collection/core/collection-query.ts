import { ObjectId, WithId } from "mongodb";
import CollectionManager, { CollectionEntity } from "./collection";
import CollectionDetailsManager, {
  CollectionDetailsEntity,
} from "./collection-details";
import { collections } from "../../db";

export type CollectionQueryEntity = {
  id: string;
  createdTime: number;
  deletedTime?: number;
  details?: CollectionDetailsEntity;
};

export type CollectionQueryMongoEntity = {
  createdTime: number;
  deletedTime?: number;
  details?: CollectionDetailsEntity;
};

const parseEntity = (collection: WithId<CollectionQueryMongoEntity>) => {
  return {
    id: collection._id.toHexString(),
    createdTime: collection.createdTime,
    deletedTime: collection.deletedTime,
    details: collection.details,
  };
};

const get = async (id: string): Promise<CollectionQueryEntity | undefined> => {
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
): Promise<(CollectionQueryEntity | undefined)[]> => {
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

export const getAll = async (): Promise<CollectionQueryEntity[]> => {
  const collection = getCollection();
  const documents = await collection.find().toArray();
  const parsedDocuments = documents.map((document) => parseEntity(document));
  return parsedDocuments;
};

const getCollection = () => {
  if (!collections || !collections.collectionQuery) {
    throw new Error("no database");
  }

  return collections.collectionQuery;
};

export default {
  get,
  getByIds,
  getAll,
};
