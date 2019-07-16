import { find, TreeNode } from 'react-sortable-tree'
import { DepartmentTreeItem, DepartmentFlatItem } from '../if/Department'

export const getNodeKey = ({ node }: TreeNode) => node.id

export function formatDepartment(treeData: DepartmentTreeItem[], departmentId: number) {
  return find({
    treeData,
    getNodeKey,
    searchMethod: ({ node }) => node.id === departmentId
  })
    .matches.map(({ node }) => node.name || '')
    .join(' ')
}

export function treeToFlatData(treeData: DepartmentTreeItem[]): DepartmentFlatItem[] {
  const flatData: DepartmentFlatItem[] = []
  let _num = 0
  function createFlatItem({ id, title, children }: DepartmentTreeItem) {
    const flatNode = {
      id: typeof id === 'number' ? id : void 0, // 新規の場合はnull
      name: typeof title === 'string' ? title : '',
      left: ++_num,
      right: 0 // 一時的に設定
    }
    flatData.push(flatNode)
    if (!children || !children.length) {
      flatNode.right = ++_num
    } else {
      children.forEach(createFlatItem)
      flatNode.right = ++_num
    }
  }

  treeData.forEach(createFlatItem)
  return flatData
}

export function flatToTreeData(flatData: DepartmentFlatItem[]): DepartmentTreeItem[] {
  const path: { right: number; treeItem: DepartmentTreeItem }[] = [
    { right: Number.MAX_VALUE, treeItem: { id: 0, name: 'dummy top', children: [] } }
  ]
  flatData
    .sort((a, b) => a.left - b.left)
    .forEach(({ left, right, id, name }) => {
      while (path[path.length - 1].right < left) {
        path.pop()
      }
      const treeItem = { id: id!, title: name, expanded: true, children: [] }
      path[path.length - 1].treeItem.children!.push(treeItem)
      if (right - left > 1) {
        // 子が存在する場合
        path.push({ right, treeItem })
      }
    })
  return path[0].treeItem.children!
}

export type CombinedUnitPath = { id: number | string; path: string }

export function treeToPaths(treeData: DepartmentTreeItem[]) {
  const paths: CombinedUnitPath[] = []

  function createPath({ id, title, children }: DepartmentTreeItem, parentPath?: string) {
    const path = `${parentPath || ''} ${title || ''}`.trim()
    paths.push({
      id,
      path
    })
    if (children) {
      children.forEach(d => createPath(d, path))
    }
  }

  treeData.forEach(d => createPath(d))
  return paths
}
