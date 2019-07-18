import { TreeItem } from 'react-sortable-tree'

export interface DepartmentTreeItem extends TreeItem {
  id: number | string // サーバから取得した場合はnumber。クライアントから新規作成した場合は、`Date.now() + ''`で文字列とする
  children?: DepartmentTreeItem[]
}

export interface DepartmentFlatItem {
  id?: number
  name: string
  left: number
  right: number
}

export type NodePath = string[] | number[]
