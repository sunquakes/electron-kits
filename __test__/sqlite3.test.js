import sqlite3 from 'sqlite3'
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
} from '../src/db/sqlite3'

test('Test Create Table', async () => {
  const sql =
    'CREATE TABLE IF NOT EXISTS test (' +
    'id Integer PRIMARY KEY AUTOINCREMENT,' +
    'content VARCHAR(255) NOT NULL DEFAULT ""' +
    ')'
  execute(sql).then((err) => {
    expect(err).toBe(undefined)
  })
})

test('Test options', async () => {
  expect(options.db).toBeInstanceOf(sqlite3.Database)
  options.before = () => {}
  options.after = () => {}
})

test('Test CRUD', async () => {
  // Test insert.
  const insertId = await save('test', { content: 'Hello World!' })
  expect(insertId).toBeGreaterThan(0)

  // Test select list.
  const rows = await list('test')
  expect(rows.length).toBeGreaterThan(0)

  // Test select one record.
  let row = await getOne('test', [['id', insertId]])
  expect(row.content).toBe('Hello World!')

  // Test update records.
  const updateId = await updateById('test', insertId, { content: 'Hello China!' })
  expect(updateId).toBe(insertId)
  row = await getOne('test', [['id', insertId]])
  expect(row.content).toBe('Hello China!')

  // Test records count.
  const total = await count('test')
  expect(total).toBeGreaterThan(0)

  // Test page.
  const pageList = await page('test')
  expect(pageList.total).toBeGreaterThan(0)

  // Test delete records.
  remove('test', ['id', insertId])
})
