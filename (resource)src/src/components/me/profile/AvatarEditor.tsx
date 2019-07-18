import React, { useCallback, useState, useEffect, useRef } from 'react'
import ReactAvatarEditor from 'react-avatar-editor'
import Slider from 'rc-slider'
import * as sliderStyles from 'rc-slider/assets/index.css'

interface Props {
  file: File
  completeAvatarEdit: (dataUri: string) => void
  cancel: () => void
}

const white = [255, 255, 255, 0.6]

const AvatarEditor: React.FunctionComponent<Props> = ({
  file,
  completeAvatarEdit: changeDataUri,
  cancel
}) => {
  useEffect(() => {
    sliderStyles.use()
    return () => sliderStyles.unuse()
  }, [])
  const $ref = useRef<ReactAvatarEditor>(null)
  const reflect = useCallback(() => {
    if ($ref.current) {
      return changeDataUri($ref.current.getImage().toDataURL('image/png'))
    }
    return changeDataUri('')
  }, [$ref, $ref.current])
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  return (
    <>
      <ReactAvatarEditor
        ref={$ref}
        image={file}
        width={300}
        height={300}
        borderRadius={150}
        border={0}
        color={white}
        scale={scale}
        rotate={rotate}
      />
      <div>
        <p>拡大</p>
        <div>
          <Slider value={scale} min={1} max={5} step={0.1} onChange={setScale} />
        </div>
      </div>
      <div>
        <p>回転</p>
        <div>
          <Slider value={rotate} min={0} max={360} step={1} onChange={setRotate} />
        </div>
      </div>
      <div className="l_switch">
        <div className="l_switch__w2">
          <button className="u_switch u_switch-blue" type="button" onClick={reflect}>
            反映
          </button>
        </div>
        <div className="l_switch__w2">
          <button className="u_switch u_switch-white" type="button" onClick={cancel}>
            キャンセル
          </button>
        </div>
      </div>
    </>
  )
}

export default AvatarEditor
