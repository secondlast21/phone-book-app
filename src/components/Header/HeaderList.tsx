import React, { FC } from 'react'
import styled from '@emotion/styled'

interface HeaderListProps {
  title: string
}

const HeaderContainer = styled.header`
  padding: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #fedd95;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`
export const SubHeader = styled.p`
  text-align: center;
`

const HeaderList: FC<HeaderListProps> = ({ title }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
    </HeaderContainer>
  )
}

export default HeaderList
