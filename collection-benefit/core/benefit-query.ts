import { ObjectId, WithId } from "mongodb";
import { collections } from "../../db";
import { BenefitDetailsEntity } from "./benefit-details";
import { BenefitEntity } from "./benefit";
import { BenefitCollectionEntity } from "./benefit-collection";

export type BenefitQueryEntity = {
  id: string;
  createdTime: number;
  deletedTime?: number;
  details?: BenefitDetailsEntity;
  collection?: BenefitCollectionEntity;
};

export type BenefitQueryMongoEntity = {
  createdTime: number;
  deletedTime?: number;
  details?: BenefitDetailsEntity;
  collection?: BenefitCollectionEntity;
};

const parseEntity = (collection: WithId<BenefitQueryMongoEntity>) => {
  return {
    id: collection._id.toHexString(),
    createdTime: collection.createdTime,
    deletedTime: collection.deletedTime,
    details: collection.details,
    collection: collection.collection,
  };
};

const get = async (id: string): Promise<BenefitQueryEntity | undefined> => {
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
): Promise<(BenefitQueryEntity | undefined)[]> => {
  const collection = getCollection();

  const mapIds: { [id: string]: BenefitEntity | undefined } = {};

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

export const getAll = async (): Promise<BenefitQueryEntity[]> => {
  const collection = getCollection();
  const documents = await collection.find().toArray();
  const parsedDocuments = documents.map((document) => parseEntity(document));
  return parsedDocuments;
};

const getCollection = () => {
  if (!collections || !collections.benefitQuery) {
    throw new Error("no database");
  }

  return collections.benefitQuery;
};

export default {
  get,
  getByIds,
  getAll,
};
