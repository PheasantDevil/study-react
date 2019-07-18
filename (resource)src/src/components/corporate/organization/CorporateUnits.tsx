import * as React from 'react'
import SortableTree from 'react-sortable-tree'
import { DepartmentTreeItem } from '../../../if/Department'
import { getNodeKey } from '../../../util/DepartmentHelper'
import { HierarchyNum } from '../../../config/Settings'

interface Props {
  units: DepartmentTreeItem[]
  unitsChange(units: DepartmentTreeItem[]): void
  changePush(): void
  onClickAdd: (path: Array<string | number>) => void
  onClickRemove: (path: Array<string | number>) => void
}

const CorporateUnits: React.FunctionComponent<Props> = ({
  units,
  unitsChange,
  changePush,
  onClickAdd,
  onClickRemove
}) => (
  <>
    <div className="head">
      <h1 className="head__title">企業情報</h1>
    </div>
    <div className="l_grid l_grid-border l_grid-spaceL">
      <div className="department">
        <p className="u_slogan">
          登録されている部署一覧がご確認いただけます。下記の内容をご確認ください。
        </p>
        <div className="headLine">
          <h2 className="headLine__title">部署一覧</h2>
        </div>
        <div style={{ height: 790 }}>
          <SortableTree
            treeData={units}
            onChange={unitsChange}
            getNodeKey={getNodeKey}
            maxDepth={HierarchyNum}
            generateNodeProps={({ path }) => ({
              buttons: [
                <button
                  type="button"
                  className="department__list_icon department__list_icon_plus"
                  onClick={() => onClickAdd(path)}
                />,
                <button
                  type="button"
                  className="department__list_icon department__list_icon_minus"
                  onClick={() => onClickRemove(path)}
                />
              ]
            })}
          />
        </div>
        <div className="l_switch">
          <div className="l_switch__w2">
            <button className="u_switch u_switch-blue" type="button" onClick={changePush}>
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
)

export default CorporateUnits
