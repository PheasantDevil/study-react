import * as React from 'react'
import withQueryUpdate, { WithQueryProps } from '../../../framework/hocs/withQueryUpdate'
import queryString from 'query-string'
import { bind } from 'decko'
import { PageLimit } from '../../../config/Settings'
import EmployeesDetail from '../../../components/corporate/employees/EmployeesList'
import BlockUI from '../../../components/BlockUI'
import { compose } from 'recompose'
import { AuthContext } from '../../../framework/auth/AuthTypes'
import User from '../../../models/User'
import Account from '../../../models/Account'
import FileSaver from 'file-saver'
import EmployeeListResult from '../../../swagger/model/employeeListResult'
import {
  getEmployeesApi,
  getEmployeesExcelApi,
  putEmployeesExcelApi
} from '../../../swagger/api/corporate.service'
import format from 'date-fns/format'
import Pager from '../../../components/_parts/Pager'
import { corporateEmployeeDetailUrl } from '../../../config/Url'

interface State {
  loaded: boolean
  perPage: number
  employeeListResult: EmployeeListResult | null
  pageCount: number
  selected: number
}

const querySearchFirst = {
  employeeCode: '',
  name: '',
  selected: 0
}

class CorporateEmployeeDetailContainer extends React.Component<
  WithQueryProps<{}> & AuthContext<User>,
  State
> {
  constructor(props: WithQueryProps<{}> & AuthContext<User>) {
    super(props)
    this.state = {
      loaded: false,
      perPage: PageLimit,
      employeeListResult: null,
      pageCount: 0,
      selected: 0
    }
  }

  async componentDidMount() {
    await this.fetchResult('componentDidMount')
  }

  async componentDidUpdate(prevProps: WithQueryProps<{}> & AuthContext<User>) {
    if (this.props.location.query !== prevProps.location.query) {
      await this.fetchResult('componentDidUpdate')
    }
  }

  @bind
  async fetchResult(exeLoc: string) {
    const querySearched = queryString.parse(location.search)
    const querySearch = {
      ...querySearchFirst,
      ...querySearched
    }

    if (exeLoc !== 'upload') {
      this.setState({
        loaded: false
      })
    }

    const employeeListResult = await getEmployeesApi({
      employeeCode: this.props.location.search['employeeCode'],
      name: this.props.location.search['name'],
      perPage: this.state.perPage,
      pageSkip: querySearch.selected ? Number(querySearch.selected) : 0,
      ...querySearch,
      authorization: await this.props.authorizer.getIdToken()
    })
    const remainderBool = employeeListResult.count % this.state.perPage ? 1 : 0

    this.setState({
      loaded: true,
      employeeListResult,
      pageCount: Math.floor(employeeListResult.count / this.state.perPage) + remainderBool
    })
  }

  @bind
  handlePageClick(selectedItem: { selected: number }) {
    const searchQuery = queryString.parse(location.search)
    this.props.history.push({
      search: queryString.stringify({ ...searchQuery, selected: selectedItem.selected })
    })
  }

  @bind
  handleRowClick(e: React.MouseEvent<HTMLDivElement>) {
    this.props.history.push(
      corporateEmployeeDetailUrl(e.currentTarget.dataset['employeeId'] as any)
    )
  }

  @bind
  async download() {
    const pdfSave = await getEmployeesExcelApi({
      authorization: await this.props.authorizer.getIdToken()
    })
    const today = format(new Date(), 'yyyyMMddmmss')
    FileSaver.saveAs(pdfSave, '従業員メンテナンス-' + today + '.xlsx')
  }

  @bind
  async upload(file: File) {
    await putEmployeesExcelApi({
      file,
      authorization: await this.props.authorizer.getIdToken()
    })
    await this.fetchResult('upload')
  }

  render() {
    const querySearch = queryString.parse(location.search) as any

    const { loaded, employeeListResult } = this.state
    return loaded ? (
      <>
        {this.state.employeeListResult ? (
          <EmployeesDetail
            {...this.state.employeeListResult}
            handleRowClick={this.handleRowClick}
            employeesList={employeeListResult!.employees}
            organizationList={employeeListResult!.organizationUnits}
            download={this.download}
            upload={this.upload}
          />
        ) : null}
        <Pager
          pageCount={this.state.pageCount}
          pageSelect={Number(querySearch.selected)}
          handlePageClick={this.handlePageClick}
        />
      </>
    ) : (
      <BlockUI />
    )
  }
}
export default compose<WithQueryProps<{}> & AuthContext<User>, {}>(
  withQueryUpdate,
  Account.withAuthConsumer
)(CorporateEmployeeDetailContainer)
