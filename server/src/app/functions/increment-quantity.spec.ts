import { randomUUID } from 'node:crypto'
import { uuidv7 } from 'uuidv7'
import { describe, expect, it } from 'vitest'
import { isRight } from '@/infra/shared/either'
import { addLink } from './add-link'
import { incrementQuantity } from './increment-quantity'

describe('incrementQuantity', () => {
  it('should increment the number of accesses for a given link', async () => {
    const addResult = await addLink({
      linkOriginal: 'https://example.com/to-increment',
      linkShortened: `test-${randomUUID().slice(0, 8)}`,
    })

    expect(isRight(addResult)).toBe(true)
    if (isRight(addResult)) {
      const { id } = addResult.right

      const incrementResult = await incrementQuantity({ linkId: id })

      expect(isRight(incrementResult)).toBe(true)
      if (isRight(incrementResult)) {
        expect(incrementResult.right.linkId).toBe(id)
        expect(incrementResult.right.numberOfAccesses).toBe(1)
      }
    }
  })

  it('should return an error if the link does not exist', async () => {
    const incrementResult = await incrementQuantity({ linkId: uuidv7() })

    expect(isRight(incrementResult)).toBe(false)
  })

  it('should return a validation error for invalid UUID', async () => {
    const incrementResult = await incrementQuantity({ linkId: '@@' })

    expect(isRight(incrementResult)).toBe(false)
  })
})
