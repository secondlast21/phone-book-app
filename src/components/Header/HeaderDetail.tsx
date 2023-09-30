import React, { FC } from 'react'
import styled from '@emotion/styled'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'

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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`

const HeaderDetail: FC = () => {
  return (
    <HeaderContainer>
      <Title>
        <Link
          style={{ textDecoration: 'none', color: '#fedd95', cursor: 'pointer' }}
          href='/'
        >
          <BiArrowBack />
        </Link>
        <div>Phone Book</div>
      </Title>
    </HeaderContainer>
  )
}

export default HeaderDetail
