import React, { FC } from 'react'
import styled from '@emotion/styled'
import useDeviceType from '@/hooks/useMediaType'
import { BiBookmark, BiSolidBookmark } from 'react-icons/bi'
import { Contact } from '@/types/contact-list'
import Link from 'next/link'

interface ContactListProps {
  contacts: Contact[]
  handleFavorites: (contact: Contact) => void
  isFavorite: boolean
}

const DesktopLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`

const TabletLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`

const MobileLayout = styled.div`
  display: flex;
  flex-direction: column;
`

const ContactListContainer = styled.div`
  margin: 0 20px;
  padding: 0 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ContactItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #fedd95;
  border-radius: 5px;

  strong {
    font-weight: bold;
  }
`

const ContactListList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const ContactName = styled.span`
  color: #fedd95;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ContactPhone = styled.span`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const ContactList: FC<ContactListProps> = ({ contacts, handleFavorites, isFavorite }) => {
  const { isMobile, isTablet, isDesktop } = useDeviceType()

  let layoutComponent
  if (isDesktop) {
    layoutComponent = (
      <ContactListList>
        <DesktopLayout>
          {contacts.map((contact, key) => (
            <ContactItem key={key}>
              <ContactName>
                <div>
                  {contact.first_name} {contact.last_name}
                </div>
                <div>
                  {isFavorite ? (
                    <BiSolidBookmark
                      onClick={() => handleFavorites(contact)}
                      tyle={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <BiBookmark
                      onClick={() => handleFavorites(contact)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </div>
              </ContactName>
              <ContactPhone>
                <div>{contact.phones[0]?.number || 'N/A'}</div>
                <Link
                  style={{ textDecoration: 'none', color: '#fedd95', cursor: 'pointer' }}
                  href={`/detail/${contact.id}`}
                >
                  Detail
                </Link>
              </ContactPhone>
            </ContactItem>
          ))}
        </DesktopLayout>
      </ContactListList>
    )
  } else if (isTablet) {
    layoutComponent = (
      <ContactListList>
        <TabletLayout>
          {contacts.map((contact) => (
            <ContactItem key={contact.id}>
              <ContactName>
                <div>
                  {contact.first_name} {contact.last_name}
                </div>
                <div>
                  {isFavorite ? (
                    <BiSolidBookmark
                      onClick={() => handleFavorites(contact)}
                      tyle={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <BiBookmark
                      onClick={() => handleFavorites(contact)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </div>
              </ContactName>
              <ContactPhone>
                <div>{contact.phones[0]?.number || 'N/A'}</div>
                <Link
                  style={{ textDecoration: 'none', color: '#fedd95', cursor: 'pointer' }}
                  href={`/detail/${contact.id}`}
                >
                  Detail
                </Link>
              </ContactPhone>
            </ContactItem>
          ))}
        </TabletLayout>
      </ContactListList>
    )
  } else if (isMobile) {
    layoutComponent = (
      <ContactListList>
        <MobileLayout>
          {contacts.map((contact) => (
            <ContactItem key={contact.id}>
              <ContactName>
                <div>
                  {contact.first_name} {contact.last_name}
                </div>
                <div>
                  {isFavorite ? (
                    <BiSolidBookmark
                      onClick={() => handleFavorites(contact)}
                      tyle={{ cursor: 'pointer' }}
                    />
                  ) : (
                    <BiBookmark
                      onClick={() => handleFavorites(contact)}
                      style={{ cursor: 'pointer' }}
                    />
                  )}
                </div>
              </ContactName>
              <ContactPhone>
                <div>{contact.phones[0]?.number || 'N/A'}</div>
                <Link
                  style={{ textDecoration: 'none', color: '#fedd95', cursor: 'pointer' }}
                  href={`/detail/${contact.id}`}
                >
                  Detail
                </Link>
              </ContactPhone>
            </ContactItem>
          ))}
        </MobileLayout>
      </ContactListList>
    )
  }

  return <ContactListContainer>{layoutComponent}</ContactListContainer>
}

export default ContactList
