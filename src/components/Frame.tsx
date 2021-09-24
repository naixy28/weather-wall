import React, { FC } from 'react'
import styled from 'styled-components'
import keke from '../assets/keke.svg'
import guoguo from '../assets/guoguo.svg'
import bgSun from '../assets/bg-sun.svg'
import bgRain from '../assets/bg-rain.svg'
import { AnimatePresence, motion } from 'framer-motion'

// TODO
const FrameWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  line-height: 0;
  display: flex;
  flex-flow: column nowrap;
  background: var(--sky-bg);

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
  transition: border 1s ease-in-out;
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
      background: var(--light-gradient);
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
  transition: border 1s ease-in-out;
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
      width: 100vw;
      height: 200vw;
      background: var(--light-gradient);
      clip-path: polygon(14% 0, 100% 0, 100% 53.5%, 0 87%, 0 6%);
    }
  }
`

const Table = styled(motion.div)`
  position: relative;
  flex: 1;
  background: var(--table-bg);
`

const Bg = styled(motion.div)`
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

const variants = {
  hidden: {
    opacity: 0,
    transition: { duration: 1 },
  },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
}

export const Frame: FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  return (
    <FrameWrapper>
      <AnimatePresence>
        {theme === 'light' && (
          <Bg
            key="b0"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 50.07%, rgba(255, 255, 255, 0.5) 100%), linear-gradient(168.19deg, #46bcff 1.34%, #bfe8ff 95.48%)',
            }}
          />
        )}
        {theme === 'dark' && (
          <Bg
            key="b1"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 50.07%, rgba(255, 255, 255, 0.5) 100%),linear-gradient(168.19deg, #60747e 1.34%, #93aebd 95.48%)',
            }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {theme === 'light' && (
          <motion.img
            key="s0"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg"
            src={bgSun}
          />
        )}
        {theme === 'dark' && (
          <motion.img
            key="s1"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg"
            src={bgRain}
          />
        )}
      </AnimatePresence>
      {theme === 'dark' && <div className="mask"></div>}
      <Window1>
        <div className="inner" />
      </Window1>
      <Window2>
        <div className="inner" />
      </Window2>
      <Table
        style={{ background: 'linear-gradient(180deg, #afafaf 0%, #afafaf 53.12%, #dddddd 53.12%, #dddddd 100%)' }}
      />
      <AnimatePresence>
        {theme === 'light' && (
          <motion.img
            key="c0"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="cat-keke cat"
            src={keke}
          />
        )}
        {theme === 'dark' && (
          <motion.img
            key="c1"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="cat-guoguo cat"
            src={guoguo}
          />
        )}
      </AnimatePresence>
    </FrameWrapper>
  )
}
