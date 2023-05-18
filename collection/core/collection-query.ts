import CollectionManager, { CollectionEntity } from "./collection";
import CollectionDetailsManager, {
  CollectionDetailsEntity,
} from "./collection-details";

export type CollectionQueryEntity = {
  id?: string;
  createdTime: number;
  deletedTime?: number;
  details?: CollectionDetailsEntity;
};

const parseEntity = (
  collection: CollectionEntity,
  collectionDetails?: CollectionDetailsEntity
) => {
  return {
    id: collection.id,
    createdTime: collection.createdTime,
    deletedTime: collection.deletedTime,
    details: collectionDetails,
  };
};

const get = async (id: string): Promise<CollectionQueryEntity | undefined> => {
  const collection = await CollectionManager.get(id);

  if (!collection) {
    return;
  }

  const collectionDetails = await CollectionDetailsManager.get(id);

  return parseEntity(collection, collectionDetails);
};

const getByIds = async (
  ids: string[]
): Promise<(CollectionQueryEntity | undefined)[]> => {
  const collections = await CollectionManager.getByIds(ids);
  const collectionsDetails = await CollectionDetailsManager.getByIds(ids);
  return collections.map((collection, index) => {
    if (!collection) {
      return;
    }

    return parseEntity(collection, collectionsDetails[index]);
  });
};

export const getAll = async (): Promise<CollectionQueryEntity[]> => {
  const collections = await CollectionManager.getAll();
  const collectionsDetails = await CollectionDetailsManager.getByIds(
    collections.map((collection) => collection.id ?? "")
  );
  return collections.map((collection, index) =>
    parseEntity(collection, collectionsDetails[index])
  );
};

export default {
  get,
  getByIds,
  getAll,
};
