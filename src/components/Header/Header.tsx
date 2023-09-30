import React, { FC } from 'react'
import styled from '@emotion/styled'

const HeaderContainer = styled.header`
  padding: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #fedd95;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const Header: FC = () => {
  return (
    <HeaderContainer>
      <Title>Phone Book</Title>
    </HeaderContainer>
  )
}

export default Header
