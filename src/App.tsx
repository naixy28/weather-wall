import React, { useState } from 'react'
import styled from 'styled-components'
import { Frame } from './components/Frame'

const AppWrapper = styled.div`
  position: relative;
  background: #fff;
  width: 100vw;
  height: 100vh;
  --window-color: #474E57;
  --window-inner-color: #85a0ab;
  --table-bg: linear-gradient(180deg, #afafaf 0%, #afafaf 53.12%, #dddddd 53.12%, #dddddd 100%);
`

function App() {
  const [count, setCount] = useState(0)

  return (
    <AppWrapper>
      <Frame />
    </AppWrapper>
  )
}

export default App
