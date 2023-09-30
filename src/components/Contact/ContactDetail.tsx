import React, { FC } from 'react'
import { CgProfile } from 'react-icons/cg'
import styled from '@emotion/styled'
import { ContactByPk } from '@/types/contact-detail'
import { BiBookmark, BiSolidBookmark } from 'react-icons/bi'
import Link from 'next/link'
import useMediaType from '@/hooks/useMediaType'

interface ContactDetailProps {
  contact: ContactByPk
}

const CardContainer = styled.div`
  text-align: center;
  color: #fedd95;
`

const CardIcon = styled.div`
  font-size: 100px;
`

const CardBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: center;
  }
`

const CardInformation = styled.div`
  color: #fff;
  padding: 20px;
  border: 1px solid #fedd95;
  border-radius: 5px;
  margin: 0 10px;

  @media (min-width: 640px) {
    width: 300px;
  }
`

const CardTitle = styled.h3`
  text-align: left;
  margin-left: 10px;
`

const CardInfo = styled.p`
  margin-top: 20px;
  margin-left: 10px;
  text-align: left;
`

const ContactCard: FC<ContactDetailProps> = ({ contact }) => {
  return (
    <CardContainer>
      <CardIcon>
        <CgProfile />
      </CardIcon>
      <CardBody>
        <CardInformation>
          <CardTitle>Name</CardTitle>
          <CardInfo>
            {contact.first_name} {contact.last_name}
          </CardInfo>
        </CardInformation>
        <br />
        <CardInformation>
          <CardTitle>Phone Number</CardTitle>
          <CardInfo>
            {contact.phones && contact.phones.map((phoneNumber, key) => <p key={key}>{phoneNumber.number}</p>)}
          </CardInfo>
        </CardInformation>
      </CardBody>
    </CardContainer>
  )
}

export default ContactCard
