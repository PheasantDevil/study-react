import * as PickerStyles from 'flatpickr/dist/themes/airbnb.css'
import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { corporate } from '../config/Url'
import * as PcStyle from '../styles/index.scss'
import * as PickerOverrideStyles from '../styles/picker.scss'
import * as ResponsiveStyles from '../styles/responsive.scss'

const withStyleSwitch = <P, M>(Component: React.ComponentType<P & RouteComponentProps<M>>) => {
  class WithStyleSwitch extends React.Component<P & RouteComponentProps<any>> {
    constructor(props: P & RouteComponentProps<any>) {
      super(props)
      PickerStyles.use()
      PickerOverrideStyles.use()
      if (props.location.pathname.startsWith(corporate)) {
        PcStyle.use()
      } else {
        ResponsiveStyles.use()
      }
    }

    getSnapshotBeforeUpdate(prevProps: RouteComponentProps<any>) {
      if (
        this.props.location.pathname.startsWith(corporate) !==
        prevProps.location.pathname.startsWith(corporate)
      ) {
        if (this.props.location.pathname.startsWith(corporate)) {
          ResponsiveStyles.unuse()
          PcStyle.use()
        } else {
          PcStyle.unuse()
          ResponsiveStyles.use()
        }
        return true
      }
      return false
    }

    componentDidUpdate(prevProps: any, prevState: any, needRefresh: any) {
      if (needRefresh) {
        this.forceUpdate()
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }
  return WithStyleSwitch
}

export default withStyleSwitch
