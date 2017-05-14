import { css } from 'styled-components'

export const media = {
  handheld: (...args) => css`
    @media (min-width: 768px) {
      ${ css(...args) }
    }
  `
}
