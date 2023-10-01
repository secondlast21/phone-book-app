import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_PHONE_NUMBER } from '@/services/queries'
import { inputStyles } from '@/components/Contact/AddContactForm'
import Button from '@/components/Base/Button'
import Modal from '@/components/Base/Modal'

interface PhoneData {
  pk_columns: {
    number: string
    contact_id: number
  }
  new_phone_number: string
}

interface EditPhoneProps {
  id: number
}

const EditPhoneNumberForm: FC<EditPhoneProps> = ({ id }) => {
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false)
  const [isModalFailedOpen, setIsModalFailedOpen] = useState(false)
  const [newPhone, setNewPhone] = useState<string>('')

  const [phoneData, setPhoneData] = useState<PhoneData>({
    pk_columns: {
      number: newPhone,
      contact_id: id,
    },
    new_phone_number: '',
  })

  const openSuccessModal = () => setIsModalSuccessOpen(true)
  const closeSuccessModal = () => setIsModalSuccessOpen(false)

  const openFailedModal = () => setIsModalFailedOpen(true)
  const closeFailedModal = () => setIsModalFailedOpen(false)

  const [editPhoneNumber] = useMutation(EDIT_PHONE_NUMBER)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setPhoneData({ ...phoneData, [name]: value })
    if (name === 'number') {
      setNewPhone(value)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({
      variables: {
        pk_columns: phoneData.pk_columns,
        new_phone_number: phoneData.new_phone_number,
      },
    })
    try {
      await editPhoneNumber({
        variables: {
          pk_columns: {
            number: newPhone,
            contact_id: id,
          },
          new_phone_number: phoneData.new_phone_number,
        },
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
      <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Edit Number</h3>
      <div>
        <label>Old Number</label>
        <input
          type='number'
          name='number'
          placeholder={'Old Number'}
          onChange={handleChange}
          style={inputStyles}
        />
      </div>
      <div>
        <label>New Number</label>
        <input
          type='number'
          name='new_phone_number'
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
        <p style={{ textAlign: 'center' }}>Failed to edit your number</p>
      </Modal>
      <Modal
        isOpen={isModalSuccessOpen}
        onClose={closeSuccessModal}
      >
        <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Success</h3>
        <p style={{ textAlign: 'center' }}>Your number is edited</p>
      </Modal>
    </form>
  )
}

export default EditPhoneNumberForm
