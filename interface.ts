import { GraphQLFieldConfig, ThunkObjMap } from "graphql";

export type CustomResolveSchema = ThunkObjMap<
  GraphQLFieldConfig<any, any, any>
>;
