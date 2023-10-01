import React, { FC, ReactNode } from 'react'
import styled from '@emotion/styled'
import { MouseEvent } from 'react'
import { css } from '@emotion/react'

interface ButtonProps {
  text?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  icon?: ReactNode
  btnType?: 'button' | 'submit' | 'reset'
}

export const Btn = styled.button`
  color: #242428;
  border-radius: 5px;
  border: none;
  background-color: #fedd95;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;

  ${(props) =>
    props.disabled &&
    css`
      background-color: #f4f4f4;
      color: gray;
      cursor: not-allowed;
    `}
`

const Button: FC<ButtonProps> = ({ text, onClick, icon, btnType }) => {
  return (
    <>
      {!!btnType ? (
        <Btn
          onClick={onClick}
          type={btnType}
        >
          {icon && <span>{icon}</span>}
          {text && <span>{text}</span>}
        </Btn>
      ) : (
        <Btn onClick={onClick}>
          {icon && <span>{icon}</span>}
          {text && <span>{text}</span>}
        </Btn>
      )}
    </>
  )
}

export default Button
