import { css } from 'styled-components'

export const media = {
  handheld: (...args) => css`
    @media (min-width: 768px) {
      ${ css(...args) }
    }
  `
}

export function truncate(width) {
  return `
    width: ${width};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
}
