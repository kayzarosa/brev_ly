import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { boolean, z } from "zod";
import { validateLink } from "@/app/functions/validate-link";
import { isRight, unwrapEither } from "@/infra/shared/either";

export const validateLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/link/validate",
    {
      schema: {
        summary: "Redirect Link",
        tags: ["links"],
        querystring: z.object({
          shortened: z
            .string()
            .min(3)
            .max(100)
            .regex(/^[a-zA-Z0-9_-]+$/),
        }),
        response: {
          200: z.object({
            id: z.string(),
            linkOriginal: z.string(),
            linkShortened: z.string(),
            numberOfAccesses: z.number(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortened } = request.query;

      const result = await validateLink({ linkShortened: shortened });

      if (isRight(result)) {
        const { id, linkOriginal, linkShortened, numberOfAccesses } =
          unwrapEither(result);

        return reply.status(200).send({
          id,
          linkOriginal,
          linkShortened,
          numberOfAccesses,
        });
      }

      const error = unwrapEither(result);
      switch (error.constructor.name) {
        case "ValidateLinkError":
          return reply.status(401).send({ message: error.message });
      }
    },
  );
};
