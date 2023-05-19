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

const create = async () => {
  const { id } = await BenefitManager.create();
  return await BenefitQueryManager.get(id);
};

const setDetails = async (id: string, details: any) => {
  await BenefitDetailsManager.set(id, details);
  return await BenefitQueryManager.get(id);
};

const setCollection = async (id: string, collection: any) => {
  await BenefitCollectionManager.set(id, collection);
  return await BenefitQueryManager.get(id);
};

const deleteItem = async (id: string) => {
  await BenefitManager.deleteItem(id);
  return await BenefitQueryManager.get(id);
};

export default {
  get,
  getAll,
  create,
  setDetails,
  setCollection,
  deleteItem,
};
