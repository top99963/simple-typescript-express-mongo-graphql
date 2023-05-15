import express from "express";
// import { createHandler } from "graphql-http/lib/use/express";
import { graphqlHTTP as createHandler } from "express-graphql";
import { schema } from "./root.schema";
import { connect } from "./db";

const app = express();
connect().then(() => {
  app.all("/graphql", createHandler({ schema, graphiql: true }));
  app.listen({ port: 4000 });
  console.log("Listening to port 4000");
});
