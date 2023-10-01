import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_CONTACT } from '@/services/queries'
import Button from '@/components/Base/Button'
import Modal from '@/components/Base/Modal'
import { inputStyles } from '@/components/Contact/AddContactForm'

interface FormData {
  id: number
  first_name: string
  last_name: string
}

interface EditContactProps {
  id: number
  first_name: string
  last_name: string
}

const EditContactForm: FC<EditContactProps> = ({ id, first_name, last_name }) => {
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false)
  const [isModalFailedOpen, setIsModalFailedOpen] = useState(false)

  const openSuccessModal = () => setIsModalSuccessOpen(true)
  const closeSuccessModal = () => setIsModalSuccessOpen(false)

  const openFailedModal = () => setIsModalFailedOpen(true)
  const closeFailedModal = () => setIsModalFailedOpen(false)

  const [formData, setFormData] = useState<FormData>({
    id: id,
    first_name: first_name,
    last_name: last_name,
  })

  const [editContact] = useMutation(EDIT_CONTACT)

  const handleKeyPress = (e: any) => {
    const key = e.key

    const alphanumericRegex = /^[a-zA-Z0-9]+$/

    if (!alphanumericRegex.test(key)) {
      e.preventDefault()
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await editContact({
        variables: {
          id: formData.id,
          _set: {
            first_name: formData.first_name,
            last_name: formData.last_name,
          },
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
      <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Edit Contact</h3>
      <div>
        <label>First Name</label>
        <input
          type='text'
          name='first_name'
          value={formData.first_name}
          onChange={handleChange}
          placeholder={first_name}
          style={inputStyles}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type='text'
          name='last_name'
          value={formData.last_name}
          onChange={handleChange}
          placeholder={last_name}
          style={inputStyles}
          onKeyPress={handleKeyPress}
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
        <p style={{ textAlign: 'center' }}>Failed to edit your contact</p>
      </Modal>
      <Modal
        isOpen={isModalSuccessOpen}
        onClose={closeSuccessModal}
      >
        <h3 style={{ textAlign: 'center', margin: '10px 0' }}>Success</h3>
        <p style={{ textAlign: 'center' }}>Your contact is edited</p>
      </Modal>
    </form>
  )
}

export default EditContactForm
