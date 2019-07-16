import * as React from 'react'
import Modal from '../../_parts/Modal'
import { object as yupObject, string as yupString } from 'yup'
import { Formik } from 'formik'

interface Props {
  addPath: Array<string | number>
  close: () => void
  submit: (name: string) => void
}

type Value = { name: string }
const initialValue: Value = { name: '' }
const validationSchema = yupObject<Value>({
  name: yupString().required('部署名を入力してください')
})

const UnitModal: React.FunctionComponent<Props> = ({ addPath, close, submit }) => {
  return (
    <Modal isOpen={!!addPath} onRequestClose={close} contentLabel="Unit Modal" ariaHideApp={false}>
      <div className="l_frame">
        <div className="frame_head">
          <h1 className="frame_head__title">部署の新規登録</h1>
          <a className="frame_head__plus" onClick={close} />
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(values: Value) => {
            submit(values.name)
            close()
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <input
                type="text"
                className="u_flat u_w160"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
              />
              <div className="l_switch">
                <div className="l_switch__w2">
                  <button className="u_switch u_switch-white" type="button" onClick={close}>
                    キャンセル
                  </button>
                </div>
                <div className="l_switch__w2">
                  <button className="u_switch u_switch-blue" type="submit">
                    登録
                  </button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </Modal>
  )
}

export default UnitModal
