import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { addLink } from "@/app/functions/add-link";
import { isRight, unwrapEither } from "@/infra/shared/either";

export const addLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/link/add",
    {
      schema: {
        summary: "Add new link",
        tags: ["links"],
        body: z.object({
          linkOriginal: z
            .string()
            .min(3)
            .regex(
              /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
              "Insira um endereço de site válido"
            ),
          linkShortened: z
            .string()
            .min(1)
            .max(100)
            .lowercase()
            .regex(/^[a-z0-9-]+$/),
        }),
        response: {
          201: z.object({
            id: z.string(),
          }),
          422: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { linkOriginal, linkShortened } = request.body;

      const result = await addLink({ linkOriginal, linkShortened });

      if (isRight(result)) {
        const { id } = unwrapEither(result);

        return reply.status(201).send({ id });
      }

      const error = unwrapEither(result);
      switch (error.constructor.name) {
        case "InvalidLinkError":
          return reply.status(422).send({ message: error.message });
      }
    }
  );
};
