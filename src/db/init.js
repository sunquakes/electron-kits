import { execute } from './sqlite3'

export function init() {
  const createTableSql = `CREATE TABLE IF NOT EXISTS user (
                            id Integer PRIMARY KEY AUTOINCREMENT,
                            username VARCHAR(255) NOT NULL DEFAULT "",
                            password VARCHAR(255) NOT NULL DEFAULT "",
                            state Integer NOT NULL DEFAULT 0,
                            create_time DATETIME,
                            update_time DATETIME
                          );`
  execute(createTableSql)

  const createUniqueIndexSql = `CREATE UNIQUE INDEX IF NOT EXISTS "idx_user_username" ON "user" ("username");`
  execute(createUniqueIndexSql)

  // Insert a user record, the username is `admin`, the password is `admin`.
  const insertSql = `INSERT INTO user (username, password, state, create_time, update_time) VALUES ('admin', '21232f297a57a5a743894a0e4a801fc3', 1, CURRENT_TIMESTAMP, null);`
  execute(insertSql)
}
