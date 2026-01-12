import { Readable } from "node:stream";
import { Upload } from "@aws-sdk/lib-storage";
import { z } from "zod";
import { env } from "@/env";
import { r2Client } from "./client";

const uploadResponseSchema = z.object({
  folder: z.enum(["report", "image"]),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
});

type UploadResponse = z.infer<typeof uploadResponseSchema>;

export async function uploadToStorage(input: UploadResponse): Promise<{
  key: string;
  url: string;
}> {
  const { folder, fileName, contentType, contentStream } =
    uploadResponseSchema.parse(input);

  const newFileName = `${folder}/${fileName}`;

  const upload = new Upload({
    client: r2Client,
    params: {
      Key: newFileName,
      Bucket: env.CLOUDFLARE_BUCKET,
      Body: contentStream,
      ContentType: contentType,
    },
  });

  await upload.done();

  return {
    key: newFileName,
    url: new URL(newFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
  };
}
