import { ObjectId } from "mongodb";
import { collections } from "../../db";

export type BenefitDetailsEntity = {
  title: string;
  description: string;
  imageId: string;
};

export type BenefitDetailsMongoEntity = {
  details: BenefitDetailsEntity;
};

const get = async (id: string): Promise<BenefitDetailsEntity | undefined> => {
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
): Promise<(BenefitDetailsEntity | undefined)[]> => {
  const collection = getCollection();

  const mapIds: { [id: string]: BenefitDetailsEntity | undefined } = {};
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
  details: BenefitDetailsEntity
): Promise<void> => {
  const collection = getCollection();

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { details: details } }
  );
};

const getCollection = () => {
  if (!collections || !collections.benefitDetails) {
    throw new Error("no database");
  }

  return collections.benefitDetails;
};

export default {
  get,
  getByIds,
  set,
};
