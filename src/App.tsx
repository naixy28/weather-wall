import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Frame } from './components/Frame'
import { Source, EventType } from './utils/eventSource'

const AppWrapper = styled.div`
  position: relative;
  background: #fff;
  width: 100vw;
  height: 100vh;
  &.light {
    --window-color: #474e57;
    --window-inner-color: #85a0ab;
    --table-bg: linear-gradient(180deg, #afafaf 0%, #afafaf 53.12%, #dddddd 53.12%, #dddddd 100%);
    --light-gradient: linear-gradient(238.46deg, #989494 -0.14%, rgba(255, 255, 255, 0) 96.93%);
    --sky-bg: linear-gradient(180deg, rgba(255, 255, 255, 0) 50.07%, rgba(255, 255, 255, 0.5) 100%),
      linear-gradient(168.19deg, #46bcff 1.34%, #bfe8ff 95.48%);
  }
  &.dark {
    --window-color: #949189;
    --window-inner-color: #6a6a6a;
    --table-bg: linear-gradient(180deg, #6a6a6a 0%, #6a6a6a 0.01%, #6a6a6a 53.12%, #cdc2a4 100%);
    --light-gradient: linear-gradient(238.46deg, #989494 -0.14%, rgba(255, 255, 255, 0) 96.93%);
    --sky-bg: linear-gradient(180deg, rgba(255, 255, 255, 0) 50.07%, rgba(255, 255, 255, 0.5) 100%),
      linear-gradient(168.19deg, #60747e 1.34%, #93aebd 95.48%);
  }
`

const Switch = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 150px;
  z-index: 100;
`

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const initConnection = useCallback(async () => {
    const source = new Source()
    source.on(EventType.MSG, ({ mood }) => {
      if (mood === 'happy') {
        setTheme('light')
        return
      }
      if (mood === 'sad') {
        setTheme('dark')
        return
      }
    })
    await source.connect()
  }, [])

  useEffect(() => {
    initConnection()
  }, [])

  return (
    <AppWrapper className={theme}>
      <Frame theme={theme} />
      <Switch
        onClick={() => {
          setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        }}
      >
        Change
      </Switch>
    </AppWrapper>
  )
}

export default App
