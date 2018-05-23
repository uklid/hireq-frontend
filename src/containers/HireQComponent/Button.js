import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: #954590;
  color: #fff;
  height: ${props => props.height ? props.height : '35px'};
  width: ${props => props.width ? props.width : '120px'};
  cursor: pointer;

  &:hover {
    background-color: rgb(149, 69, 144, 0.7);
  }
`

export default ({ name, onClick, height, width, children }) => (
  <Button
    onClick={onClick}
    height={height}
    width={width}
  >
    {children}
  </Button>
)