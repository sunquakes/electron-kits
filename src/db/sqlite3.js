const path = require('path')
const sqlite3 = require('sqlite3')
const dbFile = path.join(process.resourcesPath || '', 'sqlite3.db')

export const options = { db: undefined, before: undefined, after: undefined }

const getDb = async () => {
  const res = await new Promise((resolve, reject) => {
    if (options.before != undefined && typeof options.before == 'function') {
      options.before(resolve, reject)
    }
    if (options.db !== undefined) {
      resolve(options.db)
    } else {
      options.db = new sqlite3.Database(dbFile, (err) => {
        if (err !== null) {
          options.db = new sqlite3.Database(':memory:')
          resolve(options.db)
        }
      })
      resolve(options.db)
    }
  })
  return res
}

export async function execute(sql) {
  const db = await getDb()
  return await new Promise((resolve, reject) => {
    db.exec(sql, function (err) {
      if (err != null) {
        reject(new Error(err))
      } else {
        resolve()
      }
    })
  })
}

export async function save(tableName, data) {
  let fieldArray = []
  let valueArray = []
  for (let key in data) {
    let value = data[key]
    if (typeof value === 'string') {
      value = `'${value}'`
    }
    fieldArray.push(key)
    valueArray.push(value)
  }
  let fields = '(' + fieldArray.join(',') + ')'
  let values = '(' + valueArray.join(',') + ')'
  let sql = `INSERT INTO ${tableName} ${fields} VALUES ${values}`
  const db = await getDb()
  return await new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err != null) {
        reject(new Error(err))
      } else {
        resolve(this.lastID)
      }
    })
  })
}

export async function updateById(tableName, id, data) {
  let fieldArray = []
  for (let key in data) {
    let value = data[key]
    if (typeof value === 'string') {
      value = `'${value}'`
    }
    fieldArray.push(`${key} = ${value}`)
  }
  let fields = fieldArray.join(',')
  let sql = `UPDATE ${tableName} SET ${fields} WHERE id = ${id}`
  const db = await getDb()
  return await new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err != null) {
        reject(new Error(err))
      } else {
        resolve(id)
      }
    })
  })
}

export async function list(tableName, where, orderBy, offset, limit) {
  let sql = `SELECT * FROM ${tableName}`
  if (where) {
    sql = parseWhere(sql, where)
  }
  if (orderBy) {
    sql = `${sql} ORDER BY ${orderBy}`
  }
  if (offset !== undefined && limit !== undefined) {
    sql = `${sql} LIMIT ${offset}, ${limit}`
  }
  const db = await getDb()
  return await new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err != null) {
        reject(new Error(err))
      } else {
        resolve(rows)
      }
    })
  })
}

export async function count(tableName, where) {
  let sql = `SELECT COUNT(*) AS count FROM ${tableName}`
  if (where) {
    sql = parseWhere(sql, where)
  }
  const db = await getDb()
  return await new Promise((resolve, reject) => {
    db.get(sql, (err, row) => {
      if (err != null) {
        reject(new Error(err))
      } else {
        resolve(row.count)
      }
    })
  })
}

function parseWhere(sql, where) {
  let whereArray = []
  for (let item of where) {
    if (!(item instanceof Array)) continue
    if (item.length === 2) {
      let field = item[0]
      let value = item[1]
      if (typeof value === 'string') {
        value = `'${value}'`
      }
      whereArray.push(`${field} = ${value}`)
    } else if (item.length === 3) {
      let field = item[0]
      let symbol = item[1]
      let value = item[2]
      if (typeof value === 'string') {
        value = `'${value}'`
      }
      whereArray.push(`${field} ${symbol} ${value}`)
    }
  }
  if (whereArray.length > 0) {
    let where = whereArray.join(' AND ')
    sql = `${sql} WHERE ${where}`
  }
  return sql
}

export async function getOne(tableName, where) {
  let sql = `SELECT * FROM ${tableName}`
  if (where) {
    sql = parseWhere(sql, where)
  }
  const db = await getDb()
  return await new Promise((resolve, reject) => {
    db.get(sql, (err, row) => {
      if (err != null) {
        reject(new Error(err))
      } else {
        resolve(row)
      }
    })
  })
}

export async function remove(tableName, where) {
  let sql = `DELETE FROM ${tableName}`
  if (where) {
    sql = parseWhere(sql, where)
  }
  const db = await getDb()
  return await new Promise((resolve, reject) => {
    db.get(sql, (err, row) => {
      if (err != null) {
        reject(new Error(err))
      } else {
        resolve(row)
      }
    })
  })
}

export async function page(tableName, current, pageSize, where, orderBy) {
  const offset = (current - 1) * pageSize
  const total = await count(tableName, where)
  const records = await list(tableName, where, orderBy, offset, pageSize)
  return { current, pageSize, total, records }
}
