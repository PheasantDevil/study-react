import * as React from 'react'
import ReactLoading from 'react-loading'

const LoadingPlaceholder = React.memo(() => (
  <div style={{ width: '100vw', position: 'absolute', top: '40%', left: '45%' }}>
    <ReactLoading type={'spin'} color={'#00aae7'} height={'10%'} width={'10%'} />
  </div>
))

export default LoadingPlaceholder
