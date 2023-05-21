import BenefitManager from "../core/benefit";
import BenefitCollectionManager from "../core/benefit-collection";
import BenefitDetailsManager from "../core/benefit-details";
import BenefitQueryManager from "../core/benefit-query";

const getAll = () => {
  return BenefitQueryManager.getAll();
};

const get = (id: string) => {
  return BenefitQueryManager.get(id);
};
const getByIds = (ids: string[]) => {
  return BenefitQueryManager.getByIds(ids);
};

const create = async () => {
  const { id } = await BenefitManager.create();
  return id;
};

const setDetails = async (id: string, details: any) => {
  await BenefitDetailsManager.set(id, details);
};

const setCollection = async (id: string, collection: any) => {
  await BenefitCollectionManager.set(id, { collectionId: collection.id });
};

const deleteItem = async (id: string) => {
  await BenefitManager.deleteItem(id);
};

export default {
  get,
  getAll,
  getByIds,
  create,
  setDetails,
  setCollection,
  deleteItem,
};
