// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { ApolloServer, BaseContext } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import typeDefs from "/src/graphql/typeDefs";
import resolvers from "/src/graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const getToken = async (
  req: NextApiRequest
): Promise<{ authorization: string }> => {
  const authorization = req.headers?.authorization?.split("Bearer ")?.[1] ?? "";
  return { authorization };
};

export default startServerAndCreateNextHandler<ResolverContext>(server, {
  context: async (req: NextApiRequest, res: NextApiResponse) => ({
    req,
    res,
    user: getToken(req),
  }),
});
