import React, { FC } from 'react'
import styled from 'styled-components'
import keke from '../assets/keke.svg'
import bgSun from '../assets/bg-sun.svg'
import light from '../assets/light.svg'

const FrameWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 0;
  display: flex;
  flex-flow: column nowrap;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 50.07%, rgba(255, 255, 255, 0.5) 100%),
    linear-gradient(168.19deg, #46bcff 1.34%, #bfe8ff 95.48%);

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .cat {
    position: absolute;
    z-index: 10;
  }
  .cat-keke {
    width: 34.5vw;
    left: 4.8vw;
    bottom: 0;
  }
  .light {
    position: absolute;
    left: 0;
    top: 7.6vw;
    width: 93.2vw;
    opacity: 0.7;
    mix-blend-mode: overlay;
  }
`

const Window1 = styled.div`
  position: relative;
  border-top: 6.2vw solid var(--window-color);
  border-left: 4.8vw solid var(--window-color);
  border-right: 4.8vw solid var(--window-color);
  z-index: 10;
  .inner {
    height: 30.9vw;
    border-top: 2vw solid var(--window-inner-color);
    border-left: 2vw solid var(--window-inner-color);
    border-right: 2vw solid var(--window-inner-color);
    position: relative;
    &::after {
      mix-blend-mode: overlay;
      opacity: 0.4;
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      width: 100vw;
      height: 100vw;
      background: linear-gradient(238.46deg, #ffc9c6 -0.14%, rgba(255, 215, 213, 0) 96.93%);
      clip-path: polygon(14% 0, 100% 0, 100% 31%, 0 100%, 0 10%);
    }
  }
`
const Window2 = styled.div`
  position: relative;
  border-top: 10.4vw solid var(--window-color);
  border-left: 4.8vw solid var(--window-color);
  border-right: 4.8vw solid var(--window-color);
  border-bottom: 6.2vw solid var(--window-color);
  z-index: 9;
  .inner {
    height: 107vw;
    border-top: 2vw solid var(--window-inner-color);
    border-left: 2vw solid var(--window-inner-color);
    border-right: 2vw solid var(--window-inner-color);
    border-bottom: 2vw solid var(--window-inner-color);
    position: relative;
    &::after {
      mix-blend-mode: overlay;
      opacity: 0.4;
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      background: red;
      width: 100vw;
      height: 200vw;
      background: linear-gradient(238.46deg, #ffc9c6 -0.14%, rgba(255, 215, 213, 0) 96.93%);
      clip-path: polygon(14% 0, 100% 0, 100% 53.5%, 0 87%, 0 6%);
    }
  }
`

const Table = styled.div`
  position: relative;
  /* height: 11.4vw; */
  flex: 1;
  background: var(--table-bg);
`

export const Frame: FC = () => {
  return (
    <FrameWrapper>
      <img className="bg" src={bgSun} />
      <Window1>
        <div className="inner" />
      </Window1>
      <Window2>
        <div className="inner" />
      </Window2>
      <Table></Table>
      <img className="cat-keke cat" src={keke} />
      {/* <img className="light" src={light} /> */}
    </FrameWrapper>
  )
}
