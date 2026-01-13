import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '@/infra/db'
import { schemas } from '@/infra/db/schemas'
import { isRight, unwrapEither } from '@/infra/shared/either'
import * as upload from '@/infra/storage/upload-to-storage'
import { makeLink } from '@/test/factories/make-link.js'
import { exportUploads } from './export-uploads.js'

describe('exportUploads', () => {
  beforeEach(async () => {
    await db.delete(schemas.links).execute()
  })

  it('should export uploads and return a report URL', async () => {
    const uploadStub = vi
      .spyOn(upload, 'uploadToStorage')
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'http://example.com/file.csv',
        }
      })

    const link1 = await makeLink()
    const link2 = await makeLink()
    const link3 = await makeLink()
    const link4 = await makeLink()
    const link5 = await makeLink()

    const result = await exportUploads()

    const generateCSVStream = uploadStub.mock.calls[0][0].contentStream
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generateCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generateCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generateCSVStream.on('error', err => {
        reject(err)
      })
    })

    const csvArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    expect(isRight(result)).toBe(true)
    expect(unwrapEither(result)).toEqual({
      reportUrl: 'http://example.com/file.csv',
    })

    const links = [link1, link2, link3, link4, link5].sort((a, b) =>
      a.linkOriginal.localeCompare(b.linkOriginal)
    )

    // Faça o mesmo com o conteúdo do CSV (pulando o cabeçalho)
    const csvBody = csvArray.slice(1).sort((a, b) => a[0].localeCompare(b[0]))

    expect(csvArray[0]).toEqual([
      'Link Original',
      'Link encurtado',
      'Número de acessos',
      'Criado em',
    ])

    expect(csvBody).toEqual(
      links.map(link => [
        link.linkOriginal,
        link.linkShortened,
        link.numberOfAccesses.toString(),
        expect.any(String),
      ])
    )
  })
})
