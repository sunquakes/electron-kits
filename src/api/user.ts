import { page, getOne, remove, save, updateById } from '../db/sqlite3'
import CryptoJS from 'crypto-js'
import { datetime } from '../utils/date'

const TABLE_NAME = 'user'

export async function pageList(current: number, pageSize: number, where?: string[][], orderBy?: string): Promise<any> {
  return page(TABLE_NAME, current, pageSize, where, orderBy)
}

export async function login(username: string, password: string): Promise<any> {
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

export async function del(where: string[][]): Promise<any> {
  return remove(TABLE_NAME, where)
}

export async function edit(id: number, data: any): Promise<any> {
  if (data.password) {
    const passwordMd5 = CryptoJS.MD5(data.password).toString()
    data.password = passwordMd5
  } else {
    delete data.password
  }
  data.update_time = datetime(new Date())
  return updateById(TABLE_NAME, id, data)
}

export async function add(data: any): Promise<any> {
  const passwordMd5 = CryptoJS.MD5(data.password).toString()
  data.password = passwordMd5
  data.create_time = datetime(new Date())
  return await save(TABLE_NAME, data)
}
