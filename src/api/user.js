import { execute, save, list, getOne, updateById, remove } from '../db/sqlite3'
import CryptoJS from 'crypto-js'

export async function userList() {
  return list('user')
}

export async function login(username, password) {
  const user = await getOne('user', [['username', username]])
  if (!user) {
    return new Error('login.username_not_exist')
  }
  const passwordMd5 = CryptoJS.MD5(password).toString()
  if (passwordMd5 !== user.password) {
    return new Error('login.wrong_password')
  }
  return user
}

export async function userRemove(where) {
  return remove('user', where)
}