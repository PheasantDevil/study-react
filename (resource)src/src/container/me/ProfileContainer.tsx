import { bind } from 'decko'
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import BlockUI from '../../components/BlockUI'
import AvatarEditor from '../../components/me/profile/AvatarEditor'
import ProfileBase from '../../components/me/profile/ProfileBase'
import ProfileEdit from '../../components/me/profile/ProfileEdit'
import { me } from '../../config/Url'
import { AuthContext } from '../../framework/auth/AuthTypes'
import Account from '../../models/Account'
import User from '../../models/User'
import { putProfileApi } from '../../swagger/api/employee.service'

type Props = RouteComponentProps & AuthContext<User>

interface State {
  file: File | null
  imgSrc: string
  blocking: boolean
}

class ProfileContainer extends React.Component<Props, State> {
  state = { file: null, imgSrc: this.props.user!.avatar || '', blocking: false }

  @bind
  onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      file: e.target.files && e.target.files.length ? e.target.files[0] : null
    })
  }

  @bind
  completeAvatarEdit(imgSrc: string) {
    this.setState({ imgSrc, file: null })
  }

  @bind
  cancelAvatarEdit() {
    this.setState({ file: null })
  }

  @bind
  async handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!this.state.imgSrc) {
      return
    }
    this.setState({ blocking: true })
    const body = { avatar: this.state.imgSrc }
    await putProfileApi({
      body,
      authorization: await this.props.authorizer.getIdToken()
    })
    this.props.setUser(this.props.user!.update(body))
    this.setState({ blocking: false })
  }

  @bind
  cancel() {
    this.props.history.push(me)
  }

  render() {
    const { file, imgSrc, blocking } = this.state
    return (
      <ProfileBase>
        {blocking ? <BlockUI /> : null}
        {file ? (
          <AvatarEditor
            file={file}
            completeAvatarEdit={this.completeAvatarEdit}
            cancel={this.cancelAvatarEdit}
          />
        ) : (
          <ProfileEdit
            user={this.props.user!}
            onChangeFile={this.onChangeFile}
            imgSrc={imgSrc}
            submit={this.handleSubmit}
            cancel={this.cancel}
          />
        )}
      </ProfileBase>
    )
  }
}

export default Account.withAuthConsumer(ProfileContainer)
