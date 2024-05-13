import { execute, save, list, getOne, updateById, remove } from '../db/sqlite3'

export function getList() {
  return list('user')
}
