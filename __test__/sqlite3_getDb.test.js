import sqlite3 from 'sqlite3'
import sqlite3Rewire from '../src/db/sqlite3'
import { mocked } from 'jest-mock'

test('Test getDb', async () => {
  mocked(sqlite3).Database = jest.fn().mockImplementation((filePath, callback) => {
    if (callback !== undefined) {
      callback(new Error('Test'))
    }
  })
  const getDb = sqlite3Rewire.__get__('getDb')
  const result = await getDb()
  expect(result).toBeInstanceOf(sqlite3.Database)
})