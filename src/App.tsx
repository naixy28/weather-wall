import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Frame } from './components/Frame'
import { Source, EventType } from './utils/eventSource'
import santa from './assets/santa.png'

const AppWrapper = styled.div`
  position: relative;
  background: #fff;
  width: 100vw;
  height: 177.778vw;
  overflow: hidden;
  .santa {
    width: 100%;
    height: 100%;
  }
  * {
    outline: none;
  }
  &.light {
    --window-color: #474e57;
    --window-inner-color: #85a0ab;
    --table-bg: linear-gradient(180deg, #afafaf 0%, #afafaf 53.12%, #dddddd 53.12%, #dddddd 100%);
    --light-gradient: linear-gradient(238.46deg, #ffc9c6 -0.14%, rgba(255, 215, 213, 0) 96.93%);
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
  all: unset;
  position: fixed;
  top: 10px;
  left: 10px;
  width: 150px;
  z-index: 100;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
  text-transform: uppercase;
  color: white;
  background: hsla(0, 0%, 20%, 0.5);
  padding: 2px;
  text-align: center;
  border-radius: 4px;
  opacity: 0.3;
  transition: all 0.3s ease-in-out;
  :hover {
    opacity: 1;
  }
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
    // initConnection()
  }, [])

  return (
    <>
      <AppWrapper className={theme}>
        {/* <img className="santa" src={santa} /> */}
        <Frame theme={theme} />
      </AppWrapper>
      <Switch
        onClick={() => {
          setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        }}
      >
        Switch weather
      </Switch>
    </>
  )
}

export default App
