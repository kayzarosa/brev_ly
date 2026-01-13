import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { stringify } from 'csv-stringify'
import { db, pg } from '@/infra/db'
import { schemas } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { uploadToStorage } from '@/infra/storage/upload-to-storage'

type OutputVariablesFromDatabase = {
  link_original: string
  link_shortened: string
  number_of_accesses: number
  created_at: Date
}

type ExportUploadsOutput = {
  reportUrl: string
}

export async function exportUploads(): Promise<
  Either<never, ExportUploadsOutput>
> {
  const { sql, params } = db
    .select({
      linkOriginal: schemas.links.linkOriginal,
      linkShortened: schemas.links.linkShortened,
      numberOfAccesses: schemas.links.numberOfAccesses,
      createdAt: schemas.links.createdAt,
    })
    .from(schemas.links)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(50)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'link_original', header: 'Link Original' },
      { key: 'link_shortened', header: 'Link encurtado' },
      { key: 'number_of_accesses', header: 'Número de acessos' },
      { key: 'created_at', header: 'Criado em' },
    ],
  })

  const uploadStorageStream = new PassThrough()

  // READABLE / TRANSFORM / TRANSFORM / TRANSFORM => WRITABLE

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: OutputVariablesFromDatabase[], _, callback) {
        for (const chunk of chunks) {
          const formatted = {
            ...chunk,
            created_at: new Intl.DateTimeFormat('pt-BR').format(new Date(chunk.created_at))
          }
          this.push(formatted)
        }

        callback()
      },
    }),
    csv,
    uploadStorageStream
  )

  const upload = uploadToStorage({
    folder: 'report',
    fileName: `brevly-report-${Date.now()}.csv`,
    contentType: 'text/csv',
    contentStream: uploadStorageStream,
  })

  const [{ url }] = await Promise.all([upload, convertToCSVPipeline])

  return makeRight({
    reportUrl: url,
  })
}
