import { datetime } from '../../src/utils/date'
describe('Test date utils', () => {
  test('Test datetime', async () => {
    const date = new Date('2024-05-29T00:00:00Z')
    expect(datetime(date)).toBe('2024-05-29 00:00:00')
  })
})
