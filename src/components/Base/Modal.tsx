import React, { FC, ReactNode } from 'react'
import styled from '@emotion/styled'
import Button from '@/components/Base/Button'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const ModalStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ContentStyles = styled.div`
  background-color: #242428;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #fedd95;
  margin: 0 10px;
`

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <ModalStyles>
      <ContentStyles>
        <Button
          text='X'
          onClick={onClose}
        />
        {children}
      </ContentStyles>
    </ModalStyles>
  )
}

export default Modal
