import CollectionManager from "../core/collection";
import CollectionQueryManager from "../core/collection-query";
import CollectionDetailsManager from "../core/collection-details";

const getAll = () => {
  return CollectionQueryManager.getAll();
};

const get = (id: string) => {
  return CollectionQueryManager.get(id);
};

const getByIds = (ids: string[]) => {
  return CollectionQueryManager.getByIds(ids);
};

const create = async () => {
  const { id } = await CollectionManager.create();
  return id;
};

const setDetails = async (id: string, details: any) => {
  await CollectionDetailsManager.set(id, details);
};

const deleteItem = async (id: string) => {
  await CollectionManager.deleteItem(id);
};

export default {
  get,
  getByIds,
  getAll,
  create,
  setDetails,
  deleteItem,
};
