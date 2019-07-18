import * as React from 'react'
import ReactLoading from 'react-loading'

const BlockUI = React.memo(() => (
  <div
    style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      overflow: 'visible',
      zIndex: 1000,
      backgroundColor: 'rgba(255, 255, 255, 0.6)'
    }}
  >
    <div style={{ width: '100vw', position: 'absolute', top: '40%', left: '45%' }}>
      <ReactLoading type={'spin'} color={'#00aae7'} height={'10%'} width={'10%'} />
    </div>
  </div>
))

export default BlockUI
