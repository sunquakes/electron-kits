import { execute } from '../src/db/sqlite3'

test('Create table', () => {
  const sql =
    'CREATE TABLE IF NOT EXISTS test (' +
    'id Integer PRIMARY KEY AUTOINCREMENT,' +
    'content VARCHAR(255) NOT NULL DEFAULT ""' +
    ')'
  execute(sql).then((err) => {
    expect(undefined).toBe(err)
  })
})
