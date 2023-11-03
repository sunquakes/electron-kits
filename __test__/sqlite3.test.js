import { execute, save, list, getOne, updateById, remove } from '../src/db/sqlite3'

test('Create Table', () => {
  const sql =
    'CREATE TABLE IF NOT EXISTS test (' +
    'id Integer PRIMARY KEY AUTOINCREMENT,' +
    'content VARCHAR(255) NOT NULL DEFAULT ""' +
    ')'
  execute(sql).then((err) => {
    expect(err).toBe(undefined)
  })
})

test('CRUD', async () => {
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
  // Test delete records.
  remove('test', ['id', insertId])
})
