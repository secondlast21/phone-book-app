import React, { FC, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import styled from '@emotion/styled'
import { ContactByPk } from '@/types/contact-detail'
import Button from '@/components/Base/Button'
import Modal from '@/components/Base/Modal'
import EditContactForm from '@/components/Contact/EditContactForm'
import EditPhoneNumberForm from '@/components/Contact/EditPhoneNumberForm'
import AddPhoneNumberForm from '@/components/Contact/AddPhoneNumberForm'

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
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isModalEditNumberOpen, setIsModalEditNumberOpen] = useState(false)
  const [isModalAddNumberOpen, setIsModalAddNumberOpen] = useState(false)
  const openEditModal = () => setIsModalEditOpen(true)
  const closeEditModal = () => setIsModalEditOpen(false)

  const openEditNumberModal = () => setIsModalEditNumberOpen(true)
  const closeEditNumberModal = () => setIsModalEditNumberOpen(false)

  const openAddNumberModal = () => setIsModalAddNumberOpen(true)
  const closeAddNumberModal = () => setIsModalAddNumberOpen(false)

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
      <div
        style={{
          marginBottom: '20px',
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <Button
          text={'Edit Contact'}
          onClick={openEditModal}
        />
        <Button
          text={'Edit Phone Number'}
          onClick={openEditNumberModal}
        />
        <Button
          text={'Add Phone Number'}
          onClick={openAddNumberModal}
        />
      </div>

      <Modal
        isOpen={isModalAddNumberOpen}
        onClose={closeAddNumberModal}
      >
        <AddPhoneNumberForm id={contact.id} />
      </Modal>
      <Modal
        isOpen={isModalEditOpen}
        onClose={closeEditModal}
      >
        <EditContactForm
          id={contact.id}
          first_name={contact.first_name}
          last_name={contact.last_name}
        />
      </Modal>
      <Modal
        isOpen={isModalEditNumberOpen}
        onClose={closeEditNumberModal}
      >
        <EditPhoneNumberForm id={contact.id} />
      </Modal>
    </CardContainer>
  )
}

export default ContactCard
