import { ObjectId } from "mongodb";
import { collections } from "../../db";

export type BenefitCollectionEntity = {
  collectionId: string;
};

export type BenefitCollectionMongoEntity = {
  collection: BenefitCollectionEntity;
};

const get = async (
  id: string
): Promise<BenefitCollectionEntity | undefined> => {
  const collection = getCollection();

  const isIdValid = ObjectId.isValid(id);
  if (!isIdValid) {
    return undefined;
  }

  const document = await collection.findOne({ _id: new ObjectId(id) });
  if (!document) {
    return undefined;
  }

  return document.collection;
};

const getByIds = async (
  ids: string[]
): Promise<(BenefitCollectionEntity | undefined)[]> => {
  const collection = getCollection();

  const mapIds: { [id: string]: BenefitCollectionEntity | undefined } = {};
  const queryIds = ids.filter((id) => ObjectId.isValid(id));

  const documents = await collection
    .find({
      _id: { $in: queryIds.map((id) => new ObjectId(id)) },
    })
    .toArray();
  documents.forEach((document) => {
    mapIds[document._id.toHexString()] = document.collection;
  });
  return ids.map((key) => mapIds[key]);
};

const set = async (
  id: string,
  _collection: BenefitCollectionEntity
): Promise<void> => {
  const collection = getCollection();

  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { collection: _collection } }
  );
};

const getCollection = () => {
  if (!collections || !collections.benefitCollection) {
    throw new Error("no database");
  }

  return collections.benefitCollection;
};

export default {
  get,
  getByIds,
  set,
};
