import DataLoader from "dataloader";
import { CollectionQueryEntity } from "./collection/core/collection-query";
import { BenefitQueryEntity } from "./collection-benefit/core/benefit-query";

export type GraphContext = {
  collectionLoader: DataLoader<
    unknown,
    CollectionQueryEntity | undefined,
    unknown
  >;
  benefitLoader: DataLoader<unknown, BenefitQueryEntity | undefined, unknown>;
  benefitByCollectionIdLoader: DataLoader<unknown, BenefitQueryEntity | undefined, unknown>
};
