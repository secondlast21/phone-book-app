import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_PHONE_NUMBER } from '@/services/queries'
import { inputStyles } from '@/components/Contact/AddContactForm'
import Button from '@/components/Base/Button'
import Modal from '@/components/Base/Modal'

interface PhoneData {
  contact_id: number
  phone_number: string
}

interface AddPhoneProps {
  id: number
}

const AddPhoneNumberForm: FC<AddPhoneProps> = ({ id }) => {
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false)
  const [isModalFailedOpen, setIsModalFailedOpen] = useState(false)
  const [newPhone, setNewPhone] = useState<string>('')

  const [phoneData, setPhoneData] = useState<PhoneData>({
    contact_id: id,
    phone_number: '',
  })

  const openSuccessModal = () => setIsModalSuccessOpen(true)
  const closeSuccessModal = () => setIsModalSuccessOpen(false)

  const openFailedModal = () => setIsModalFailedOpen(true)
  const closeFailedModal = () => setIsModalFailedOpen(false)

  const [addPhoneNumber] = useMutation(ADD_PHONE_NUMBER)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPhoneData({ ...phoneData, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({
      variables: phoneData,
    })
    try {
      await addPhoneNumber({
        variables: phoneData,
      })
      setIsModalSuccessOpen(true)
    } catch (error) {
      setIsModalFailedOpen(true)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ borderColor: '#fedd95', color: '#fedd95', backgroundColor: '#242428' }}
    >
      <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Add Number</h3>
      <div>
        <label>New Number</label>
        <input
          type='number'
          name='phone_number'
          placeholder={'New Number'}
          onChange={handleChange}
          style={inputStyles}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button
          text={'Edit'}
          btnType={'submit'}
        />
      </div>
      <Modal
        isOpen={isModalFailedOpen}
        onClose={closeFailedModal}
      >
        <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Failed</h3>
        <p style={{ textAlign: 'center' }}>Failed to add new number</p>
      </Modal>
      <Modal
        isOpen={isModalSuccessOpen}
        onClose={closeSuccessModal}
      >
        <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Success</h3>
        <p style={{ textAlign: 'center' }}>Your new number is submitted</p>
      </Modal>
    </form>
  )
}

export default AddPhoneNumberForm
