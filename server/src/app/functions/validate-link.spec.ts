import { randomUUID } from 'node:crypto'
import { beforeAll, describe, expect, it } from 'vitest'
import { isLeft, isRight } from '@/infra/shared/either'
import { addLink } from './add-link'
import { validateLink } from './validate-link'
import { id } from 'zod/locales'

describe('redirectionLink', () => {
  let linkShortenedNew: string

  beforeAll(() => {
    linkShortenedNew = `test-${randomUUID().slice(0, 8)}`
  })

  it('should redirect to the original link successfully', async () => {
    await addLink({
      linkOriginal: 'https://example.com',
      linkShortened: linkShortenedNew,
    })

    const result = await validateLink({
      linkShortened: linkShortenedNew,
    })

    expect(isRight(result)).toBe(true)
    if (isRight(result)) {
      expect(result.right.id).toEqual(expect.any(String))
      expect(result.right.linkOriginal).toBe('https://example.com')
      expect(result.right.linkShortened).toBe(linkShortenedNew)
      expect(result.right.numberOfAccesses).toBe(0)
    }
  })

  it('should fail when given a non-existing shortened link', async () => {
    const result = await validateLink({
      linkShortened: `nonexist-${randomUUID().slice(0, 8)}`,
    })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(Error)
    }
  })

  it('should fail when given an invalid shortened link', async () => {
    const result = await validateLink({
      linkShortened: `invalid$%#`,
    })

    expect(isLeft(result)).toBe(true)
    if (isLeft(result)) {
      expect(result.left).toBeInstanceOf(Error)
    }
  })
})
