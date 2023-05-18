import CollectionManager from "../core/collection";
import CollectionQueryManager from "../core/collection-query";
import CollectionDetailsManager from "../core/collection-details";

const getAll = () => {
  return CollectionQueryManager.getAll();
};

const get = (parent, { id }) => {
  return CollectionQueryManager.get(id);
};

const create = async () => {
  const { id } = await CollectionManager.create();
  return await CollectionQueryManager.get(id);
};

const setDetails = async (parent, { id, details }) => {
  await CollectionDetailsManager.set(id, details);
  return await CollectionQueryManager.get(id);
};

export default {
  get,
  getAll,
  create,
  setDetails,
};
