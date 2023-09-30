import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { GET_CONTACT_DETAIL } from '@/services/queries'
import { ContactDetailType, ContactByPk } from '@/types/contact-detail'
import CustomHead from '@/layouts/CustomHead'
import { useRouter } from 'next/router'
import ContactCard from '@/components/Contact/ContactDetail'
import styled from '@emotion/styled'
import { CgProfile } from 'react-icons/cg'
import contactDetail from '@/components/Contact/ContactDetail'
import HeaderDetail from '@/components/Header/HeaderDetail'

const CardContainer = styled.div`
  text-align: center;
  color: #fedd95;
`

const CardHeader = styled.div`
  font-size: 15rem;
`

const CardBody = styled.div``

const CardInformation = styled.div``

const ContactDetail: NextPage = () => {
  const router = useRouter()
  const { xid } = router.query

  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const [contact, setContact] = useState<ContactByPk>()

  const {
    data: contactDetailData,
    loading,
    error,
  } = useQuery<ContactDetailType>(GET_CONTACT_DETAIL, {
    variables: {
      id: xid,
    },
  })

  useEffect(() => {
    if (!!contactDetailData) {
      console.log(contactDetailData)
      setContact(contactDetailData.contact_by_pk)
    }
  }, [contactDetailData, contactDetailData?.contact_by_pk])
  return (
    <CustomHead
      title='Contact Detail'
      description='Contact Detail Page'
    >
      <HeaderDetail />
      {!!contact && <ContactCard contact={contact} />}
    </CustomHead>
  )
}

export default ContactDetail
