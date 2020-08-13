import React, { useEffect } from 'react'
import styled, { css, variant } from '@xstyled/styled-components'
import PropTypes from 'prop-types'

/*


variant (pode receber icon ou major)

size (pode receber small ou big, utilizado para controlar o tamanho do loader caso sua variant seja icon)

percentage (recebe um número inteiro de 0 a 100. caso não receba nenhum valor em percentage, apresentar variação indeterminate)

showPercentage (recebe um boolean que controla se a porcentagem deve ou não ser mostrada no loader)



Definição das variações no Storybook: As seguintes variantes do componente devem estar documentadas no Storybook

Base (apresentar o componente sem nenhuma alteração de prop)

Variant (apresentar as variações icon e major)

Size (apresentar as variações de size)

Percentage (apresentar as variações determinate do componente, com e sem o percentual no centro do loader
*/

const setIntervalPercentage = percentage => {
  let current = 0
  const counter = document.getElementById('counter')
  counter.innerText = '0 %'

  setInterval(() => {
    if (current <= percentage) {
      current++
      const value = ((100 * current) / percentage).toFixed(0)
      counter.innerText = `${value} %`
    } else {
      return
    }
  }, 1000)
}

export const Loader = ({ percentage = 5, showPercentage, size, variant }) => {
  // useEffect(() => {
  //   setIntervalPercentage(percentage)
  // }, [])

  return (
    <LoaderContainer percentage={percentage} variant='icon'>
      <svg>
        <circle cx='60' cy='60' r='50' />
        <circle cx='60' cy='60' r='50' />
      </svg>
      <div id='counter' className='counter'></div>
      <div className='stop'></div>
      <div className='progress'>Progress Bar</div>
    </LoaderContainer>
  )
}

Loader.propTypes = {
  percentage: PropTypes.number,
  showPercentage: PropTypes.bool,
  size: PropTypes.oneOf(['big', 'small']),
  variant: PropTypes.oneOf(['icon', 'major'])
}

Loader.defaultProps = {
  showPercentage: false
}

const LoaderContainer = styled.div`
  /* margin-top: 100px; */
  height: 350px;
  width: 250px;
  background: gray.800;
  position: relative;

  svg {
    width: 120px;
    height: 120px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-90deg);
    fill: transparent;
  }

  svg circle:nth-child(1) {
    stroke: #1565c0;
    opacity: 0.25;
    stroke-width: 10px;
  }

  svg circle:nth-child(2) {
    stroke: #1565c0;
    stroke-width: 10px;
    stroke-linecap: round;
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: animate ${props => props.percentage}s linear infinite;
  }

  @keyframes animate {
    100% {
      stroke-dashoffset: 0;
    }
  }

  .stop {
    height: 110px;
    width: 110px;
    background: transparent;
    border-radius: 50%;
    border: 10px solid #0f0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }

  .progress {
    position: absolute;
    bottom: 60px;
    width: 100%;
    text-align: center;
    font-size: 25px;
    font-weight: 800;
    color: #0f0;
    font-weight: 800;
    font-family: sans-serif;
  }

  .counter {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: 800;
  }

  ${variant({
    default: 'icon',
    variants: {
      icon: css`
        svg circle {
          stroke: #ff00ff !important;
        }
      `,
      major: css``
    }
  })}
`

export default Loader
