import { pageList, login, del, edit, add } from '../../src/api/user'

jest.mock('../../src/db/sqlite3', () => {
  return {
    page: jest.fn().mockResolvedValue({
      records: [
        {
          id: 1,
          username: 'admin',
          password: '123456',
          nickname: '管理员'
        }
      ],
      total: 1
    }),
    getOne: jest.fn().mockResolvedValue({
      id: 1,
      username: 'admin',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      nickname: '管理员'
    }),
    remove: jest.fn().mockResolvedValue(1),
    updateById: jest.fn().mockResolvedValue(1),
    save: jest.fn().mockResolvedValue(1)
  }
})

describe('Test user api', () => {
  test('Test pageList', async () => {
    const res = await pageList(1, 10)
    expect(res.total).toBe(1)
  })

  test('Test login', async () => {
    let res = await login('admin', '123456')
    expect(res.username).toBe('admin')

    res = await login('admin', '1234567')
    expect(res).toBeInstanceOf(Error)
  })

  test('Test del', async () => {
    const res = await del([['id', '=', 1]])
    expect(res).toBe(1)
  })

  test('Test edit', async () => {
    const res = await edit(1, { nickname: '管理员' })
    expect(res).toBe(1)
  })

  test('Test add', async () => {
    const res = await add({ username: 'admin', nickname: '管理员' })
    expect(res).toBe(1)
  })
})
