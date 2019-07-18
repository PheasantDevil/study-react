import { bind } from 'decko'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { removeNodeAtPath, addNodeUnderParent } from 'react-sortable-tree'
import BlockUI from '../../../components/BlockUI'
import CorporateUnits from '../../../components/corporate/organization/CorporateUnits'
import UnitModal from '../../../components/corporate/organization/UnitModal'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import { DepartmentTreeItem } from '../../../if/Department'
import Account from '../../../models/Account'
import User from '../../../models/User'
import {
  getOrganizationUnitsApi,
  putOrganizationUnitsApi
} from '../../../swagger/api/corporate.service'
import { flatToTreeData, getNodeKey, treeToFlatData } from '../../../util/DepartmentHelper'
import * as styles from './style.css'
import LoadingPlaceholder from '../../../components/LoadingPlaceholder'

interface State {
  loaded: boolean
  blocking: boolean
  units: DepartmentTreeItem[]
  addPath: null | Array<string | number>
}

class CorporateUnitsContainer extends React.Component<
  RouteComponentProps<{}> & AuthContext<User>,
  State
> {
  constructor(props: RouteComponentProps<{}> & AuthContext<User>) {
    super(props)
    styles.use()
    this.state = {
      loaded: false,
      blocking: false,
      units: [],
      addPath: null
    }
  }
  async componentDidMount() {
    const flatUnits = await getOrganizationUnitsApi({
      authorization: await this.props.authorizer.getIdToken()
    })
    const units = flatToTreeData(flatUnits.organizationUnits)
    this.setState({
      loaded: true,
      units
    })
  }

  componentWillUnmount() {
    styles.unuse()
  }

  @bind
  async unitsChange(units: DepartmentTreeItem[]) {
    this.setState({
      units
    })
  }

  @bind
  async changePush() {
    this.setState({ blocking: true })
    const unit = treeToFlatData(this.state.units)
    await putOrganizationUnitsApi({
      body: unit,
      authorization: await this.props.authorizer.getIdToken()
    })
    this.setState({ blocking: false })
  }

  @bind
  willAddUnit(path: Array<string | number>) {
    this.setState({ addPath: path })
  }

  @bind
  doneAddUnit(unitName: string) {
    const units = addNodeUnderParent({
      getNodeKey,
      expandParent: true,
      parentKey: this.state.addPath![this.state.addPath!.length - 1],
      treeData: this.state.units,
      newNode: {
        id: Date.now() + '',
        title: unitName,
        expanded: true,
        children: []
      }
    }).treeData as DepartmentTreeItem[]
    this.setState({ units })
  }

  @bind
  closeAddUnit() {
    this.setState({ addPath: null })
  }

  @bind
  removeUnit(path: Array<string | number>) {
    const units = removeNodeAtPath({
      getNodeKey,
      path,
      treeData: this.state.units
    }) as DepartmentTreeItem[]
    this.setState({ units })
  }

  render() {
    const { loaded, units, addPath, blocking } = this.state
    return loaded ? (
      <>
        <CorporateUnits
          units={units}
          unitsChange={this.unitsChange}
          changePush={this.changePush}
          onClickAdd={this.willAddUnit}
          onClickRemove={this.removeUnit}
        />
        {addPath ? (
          <UnitModal addPath={addPath} close={this.closeAddUnit} submit={this.doneAddUnit} />
        ) : null}
        {blocking ? <BlockUI /> : null}
      </>
    ) : (
      <LoadingPlaceholder />
    )
  }
}

export default Account.withAuthConsumer(CorporateUnitsContainer)
