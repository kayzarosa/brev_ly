import { describe, it, expect } from 'vitest'
import { addLink } from './add-link'
import { isRight, isLeft } from '@/shared/either'

describe('addLink', () => {

  it('should add a new link successfully', async () => {
    const result = await addLink({
      linkOriginal: 'https://example.com',
      linkShortened: 'exmpl',
    });

    expect(isRight(result)).toBe(true);
    if (isRight(result)) {
      expect(result.right).toHaveProperty('id');
    }
  });
});