export async function pageList(
  current: number,
  pageSize: number,
  where: string[][],
  orderBy: string
): Promise<any>

export async function login(username: string, password: string): Promise<any>

export async function del(where: string[][]): Promise<any>

export async function edit(id: number, data: any): Promise<any>

export async function add(data: any): Promise<any>
