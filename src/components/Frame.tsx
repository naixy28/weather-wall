import React, { FC, useEffect, useCallback, useRef } from 'react'
import styled from 'styled-components'
import keke from '../assets/keke.svg'
import guoguo from '../assets/guoguo.svg'
import bgSun from '../assets/bg-sun.svg'
import bgRain from '../assets/bg-rain.svg'
import bgRainImg from '../assets/bg-rain.png'
import light from '../assets/light.png'
import cloud from '../assets/cloud.svg'
import cls from 'classnames'
import RaindropFX from 'raindrop-fx'

const FrameWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  line-height: 0;
  display: flex;
  flex-flow: column nowrap;
  background: var(--sky-bg);
  .light-wrapper,
  .dark-wrapper {
    opacity: 0;
    transition: opacity 1s linear;
    will-change: opacity;
  }
  .visible {
    opacity: 1;
  }

  @keyframes float {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(150vw, 0, 0);
    }
  }

  .cloud {
    position: absolute;
    animation-name: float;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    will-change: transform;
  }
  .cloud-0 {
    animation-duration: 20s;
    width: 53vw;
    left: -53vw;
    top: 24vw;
  }
  .cloud-1 {
    animation-duration: 30s;
    animation-delay: 5s;
    width: 45vw;
    left: -53vw;
    top: 54vw;
  }
  .light {
    pointer-events: none;
    position: absolute;
    z-index: 10;
    width: 93.3vw;
    left: 0;
    top: 8vw;
    opacity: 0.4;
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .mask {
    position: absolute;
    /* background: red; */
    width: 100%;
    height: 100%;
    backdrop-filter: blur(0.6vw);
  }
  #raindrop {
    position: absolute;
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
  .cat-guoguo {
    width: 50.5vw;
    right: 0;
    bottom: 0;
  }
`

const Window1 = styled.div`
  position: relative;
  border-top: 6.2vw solid var(--window-color);
  border-left: 4.8vw solid var(--window-color);
  border-right: 4.8vw solid var(--window-color);
  z-index: 10;
  transition: border 1s ease-in-out;
  .inner {
    height: 30.9vw;
    border-top: 2vw solid var(--window-inner-color);
    border-left: 2vw solid var(--window-inner-color);
    border-right: 2vw solid var(--window-inner-color);
    position: relative;
    /* &::after {
      outline: none;
      opacity: 0.3;
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      width: 100vw;
      height: 100vw;
      background: var(--light-gradient);
      clip-path: polygon(14% 0, 100% 0, 100% 31%, 0 100%, 0 10%);
    } */
  }
`
const Window2 = styled.div`
  position: relative;
  border-top: 10.4vw solid var(--window-color);
  border-left: 4.8vw solid var(--window-color);
  border-right: 4.8vw solid var(--window-color);
  border-bottom: 6.2vw solid var(--window-color);
  z-index: 9;
  transition: border 1s ease-in-out;
  .inner {
    height: 107vw;
    border-top: 2vw solid var(--window-inner-color);
    border-left: 2vw solid var(--window-inner-color);
    border-right: 2vw solid var(--window-inner-color);
    border-bottom: 2vw solid var(--window-inner-color);
    position: relative;
    /* &::after {
      outline: none;
      opacity: 0.4;
      content: '';
      display: block;
      position: absolute;
      right: 0;
      top: 0;
      width: 100vw;
      height: 200vw;
      background: var(--light-gradient);
      clip-path: polygon(14% 0, 100% 0, 100% 53.5%, 0 87%, 0 6%);
    } */
  }
`

const Table = styled.div`
  position: relative;
  flex: 1;
  background: var(--table-bg);
`

const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: 1;
  /* transition: opacity 1s ease-in-out;
  &.visible {
    opacity: 1;
  } */
`

export const Frame: FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const rainRef = useRef<RaindropFX>()
  const initRain = useCallback(() => {
    const canvas = document.querySelector('#raindrop') as HTMLCanvasElement
    canvas.width = 375 * 2
    canvas.height = 667 * 2
    const raindropFx = new RaindropFX({
      canvas,
      background: bgRainImg,
      // backgroundBlurSteps: 2,
      // mistTime: 3,
      mist: false,
      // spawnSize: [30, 40],
      // spawnLimit: 200,
      // dropletSize: [50, 80],
      // spawnInterval: [0.4, 0.7],
      // mistBlurStep: 5,
    })
    raindropFx.start()
    rainRef.current = raindropFx
  }, [])
  useEffect(() => {
    if (theme === 'dark') {
      initRain()
    }
    return () => {
      rainRef?.current?.stop()
    }
  }, [theme])
  return (
    <FrameWrapper>
      <div className={cls('light-wrapper', theme === 'light' && 'visible')}>
        <Bg
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0) 50.07%, rgba(255, 255, 255, 0.5) 100%), linear-gradient(168.19deg, #46bcff 1.34%, #bfe8ff 95.48%)',
          }}
        />
        <div>
          <img className="cloud cloud-0" src={cloud} />
          <img className="cloud cloud-1" src={cloud} />
          <img className="bg" src={bgSun} />
        </div>
      </div>
      <div className={cls('dark-wrapper', theme === 'dark' && 'visible')}>
        <Bg
          style={{
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0) 50.07%, rgba(255, 255, 255, 0.5) 100%),linear-gradient(168.19deg, #60747e 1.34%, #93aebd 95.48%)',
          }}
        />
        <img className="bg" src={bgRain} />
        <div className="mask"></div>
        <canvas id="raindrop" />
      </div>
      <Window1>
        <div className="inner" />
      </Window1>
      <Window2>
        <div className="inner" />
      </Window2>
      <Table
        style={{ background: 'linear-gradient(180deg, #afafaf 0%, #afafaf 53.12%, #dddddd 53.12%, #dddddd 100%)' }}
      />
      <div className={cls('light-wrapper', theme === 'light' && 'visible')} style={{ zIndex: 10 }}>
        <img className={cls('light')} src={light} />
        <img className="cat-keke cat" src={keke} />
      </div>
      <div className={cls('dark-wrapper', theme === 'dark' && 'visible')} style={{ zIndex: 10 }}>
        <img className="cat-guoguo cat" src={guoguo} />
      </div>
      {/* <Btn>shot</Btn> */}
    </FrameWrapper>
  )
}

const Btn = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 150px;
  z-index: 100;
`
