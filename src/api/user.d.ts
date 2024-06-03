export function pageList(
  current: number,
  pageSize: number,
  where: string[][],
  orderBy: string
): Promise<any>

export function login(username: string, password: string): Promise<any>

export function del(where: string[][]): Promise<any>

export function edit(id: number, data: any): Promise<any>

export function add(data: any): Promise<any>

export function doCount(data: any): Promise<number>
