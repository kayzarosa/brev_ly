import { randomUUID } from 'node:crypto'
import { beforeAll, describe, expect, it } from 'vitest'
import { isLeft, isRight } from '@/infra/shared/either'
import { addLink } from './add-link'
import { deleteLink } from './delete-link'

describe('deleteLink', () => {
  let idToDelete: string

  beforeAll(async () => {
    const linkShortenedNew = `test-${randomUUID().slice(0, 8)}`
    const addResult = await addLink({
      linkOriginal: 'https://example.com/to-delete',
      linkShortened: linkShortenedNew,
    })

    if (isRight(addResult)) {
      idToDelete = addResult.right.id
    } else {
      throw new Error('Failed to set up test: could not add link to delete.')
    }
  })

  it('should delete an existing link successfully', async () => {
    const deleteResult = await deleteLink({ id: idToDelete })

    expect(isRight(deleteResult)).toBe(true)
    if (isRight(deleteResult)) {
      expect(deleteResult.right).toHaveProperty('id', idToDelete)
    }
  })

  it('should fail to delete a non-existing link', async () => {
    const deleteResult = await deleteLink({ id: randomUUID() })

    expect(isLeft(deleteResult)).toBe(true)
    if (isLeft(deleteResult)) {
      expect(deleteResult.left).toBeInstanceOf(Error)
    }
  })

  it('should fail when given invalid id', async () => {
    const deleteResult = await deleteLink({ id: '@@' })

    expect(isLeft(deleteResult)).toBe(true)
    if (isLeft(deleteResult)) {
      expect(deleteResult.left).toBeInstanceOf(Error)
    }
  })
})
