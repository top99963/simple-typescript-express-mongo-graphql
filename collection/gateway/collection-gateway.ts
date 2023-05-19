import CollectionManager from "../core/collection";
import CollectionQueryManager from "../core/collection-query";
import CollectionDetailsManager from "../core/collection-details";

const getAll = () => {
  return CollectionQueryManager.getAll();
};

const get = (id: string) => {
  return CollectionQueryManager.get(id);
};

const create = async () => {
  const { id } = await CollectionManager.create();
  return await CollectionQueryManager.get(id);
};

const setDetails = async (id: string, details: any) => {
  await CollectionDetailsManager.set(id, details);
  return await CollectionQueryManager.get(id);
};

const deleteItem = async (id: string) => {
  await CollectionManager.deleteItem(id);
  return await CollectionQueryManager.get(id);
};

export default {
  get,
  getAll,
  create,
  setDetails,
  deleteItem,
};
