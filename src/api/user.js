import { list, getOne, remove, save, updateById } from '../db/sqlite3'
import CryptoJS from 'crypto-js'
import { datetime } from '../utils/date'

const TABLE_NAME = 'user'

export async function page() {
  return list(TABLE_NAME)
}

export async function login(username, password) {
  const user = await getOne(TABLE_NAME, [['username', username]])
  if (!user) {
    return new Error('login.username_not_exist')
  }
  const passwordMd5 = CryptoJS.MD5(password).toString()
  if (passwordMd5 !== user.password) {
    return new Error('login.wrong_password')
  }
  return user
}

export async function del(where) {
  return remove(TABLE_NAME, where)
}

export async function edit(id, data) {
  if (data.password) {
    const passwordMd5 = CryptoJS.MD5(data.password).toString()
    data.password = passwordMd5
  } else {
    delete data.password
  }
  data.update_time = datetime(new Date())
  return updateById(TABLE_NAME, id, data)
}

export async function add(data) {
  const passwordMd5 = CryptoJS.MD5(data.password).toString()
  data.password = passwordMd5
  data.create_time = datetime(new Date())
  return await save(TABLE_NAME, data)
}
