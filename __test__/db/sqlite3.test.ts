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

test('Test getDb', async () => {
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

test('Test Create Table', async () => {
  const sql =
    'CREATE TABLE IF NOT EXISTS test (' +
    'id Integer PRIMARY KEY AUTOINCREMENT,' +
    'content VARCHAR(255) NOT NULL DEFAULT ""' +
    ')'
  sqlite3.Database = jest.fn().mockImplementation((filePath, callback) => {
    return {
      exec: jest.fn((sql, callback) => {})
    }
  })
  options.db = undefined

  execute(sql).then((err) => {
    expect(err).toBe(undefined)
  })

  sqlite3.Database = jest.fn().mockImplementation((filePath, callback) => {
    return {
      exec: jest.fn((sql, callback) => {
        callback('Test')
      })
    }
  })
  options.db = undefined
  try {
    await execute(sql)
  } catch (e) {
    expect(e.message).toBe('Test')
  }
})

test('Test options', async () => {
  // expect(options.db).toBeInstanceOf(Object)
  options.before = () => {}

  const getDb = sqlite3Rewire.__get__('getDb')
  await getDb()

  options.after = () => {}
})

test('Test CRUD', async () => {
  // Mock database instance
  sqlite3.Database = jest.fn().mockImplementation(() => {
    return {
      run: jest.fn(function (sql, callback) {
        this.lastID = 1
        callback.apply(this)
      }),
      all: jest.fn(function (sql, callback) {
        callback(undefined, [{ name: 'John Doe', age: 30 }])
      }),
      get: jest.fn(function (sql, callback) {
        callback(undefined, { id: 1, content: 'Hello World!', count: 1 })
      })
    }
  })
  options.db = undefined

  // Call the save function
  const insertId = await save('test_table', { name: 'John Doe', age: 30 })

  // Assertions
  expect(insertId).toBe(1)

  // Test select list.
  const rows = await list('test')
  expect(rows.length).toBeGreaterThan(0)

  // Test page.
  const pageList = await page('test')
  expect(pageList.total).toBeGreaterThan(0)

  // Test records count.
  const total = await count('test')
  expect(total).toBeGreaterThan(0)

  // Test select one record.
  let row = await getOne('test', [['id', insertId]])
  expect(row.content).toBe('Hello World!')

  row = await getOne('test', [['id', '=', insertId]])
  expect(row.content).toBe('Hello World!')

  // Test update records.
  const updateId = await updateById('test', insertId, { content: 'Hello China!' })
  expect(updateId).toBe(insertId)

  // Test delete records.
  remove('test', ['id', insertId])
})

test('Test CRUD error', async () => {
  // Test error.
  sqlite3.Database = jest.fn().mockImplementation(() => {
    return {
      run: jest.fn(function (sql, callback) {
        callback('Test')
      }),
      all: jest.fn(function (sql, callback) {
        callback('Test')
      }),
      get: jest.fn(function (sql, callback) {
        callback('Test')
      })
    }
  })
  options.db = undefined

  try {
    await save('test_table', { name: 'John Doe', age: 30 })
  } catch (e) {
    expect(e.message).toBe('Test')
  }

  try {
    await list(
      'test',
      [
        ['id', 1],
        ['content', 'Hello China!']
      ],
      'id ASC',
      0,
      10
    )
  } catch (e) {
    expect(e.message).toBe('Test')
  }

  try {
    await count('test', [['id', 1]])
  } catch (e) {
    expect(e.message).toBe('Test')
  }

  try {
    await getOne('test', [['content', '=', 'Hello China!']])
  } catch (e) {
    expect(e.message).toBe('Test')
  }

  try {
    await updateById('test', 1, { content: 'Hello China!' })
  } catch (e) {
    expect(e.message).toBe('Test')
  }

  try {
    await remove('test', ['id', 1])
  } catch (e) {
    expect(e.message).toBe('Test')
  }
})
