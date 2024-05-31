export function execute(sql: string): Promise<any>

export function save(tableName: string, data: any): Promise<any>

export function updateById(tableName: string, id: any, data: any): Promise<any>

export function list(
  tableName: string,
  where: string[][],
  orderBy: string,
  offset: number,
  limit: number
): Promise<any>

export function count(tableName: string, where: string[][]): Promise<any>

export function getOne(tableName: string, where: string[][]): Promise<any>

export function remove(tableName: string, where: string[][]): Promise<any>

export function page(
  tableName: string,
  current: number,
  pageSize: number,
  where: string[][],
  orderBy: string
): Promise<any>
