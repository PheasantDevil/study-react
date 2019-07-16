import * as React from 'react'
import ReactModal, { Props } from 'react-modal'
import * as ModalStyles from '../../styles/frame.scss'
import { ModalCustomStyles } from '../../config/Settings'

class Modal extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    ModalStyles.use()
    this.state = {}
  }
  render() {
    return <ReactModal style={ModalCustomStyles} {...this.props} />
  }
}

export default Modal
