import sqlite3, { Database } from 'sqlite3'
import sqlite3Rewire, {
  options,
  execute,
  save,
  list,
  page,
  count,
  getOne,
  updateById,
  remove
} from '../../src/db/sqlite3'

jest.mock('sqlite3')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Test user api', () => {
  test('Test pageList', async () => {
    const getDb = sqlite3Rewire.__get__('getDb')
    await getDb()
    expect(options.db).toBeInstanceOf(Database)

    sqlite3.Database = jest.fn().mockImplementation((filePath, callback) => {
      if (callback !== undefined) {
        callback(new Error('Test'))
      }
    })

    options.db = undefined
    await getDb()
    expect(options.db).toBeInstanceOf(sqlite3.Database)
  })
})
