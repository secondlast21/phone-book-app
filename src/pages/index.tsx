import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { GET_CONTACT_LIST } from '@/services/queries'
import { Contact, ContactListType } from '@/types/contact-list'

import CustomHead from '@/layouts/CustomHead'
import ContactList from '@/components/Contact/ContactList'
import useLocalStorage from '@/hooks/useLocalStorage'
import HeaderList, { SubHeader } from '@/components/Header/HeaderList'
import { arraysHaveSameObjects } from '@/utils/checkArray'
import Header from '@/components/Header/Header'
const Home: NextPage = () => {
  const [offset, setOffset] = useState<number>(0)
  const [contacts, setContacts, removeContact] = useLocalStorage<Contact[]>('contact list', [])
  const [favorites, setFavorites, removeFavorites] = useLocalStorage<Contact[]>('favorite list', [])
  const [temp, setTemp, removeTemp] = useLocalStorage<Contact[]>('Temp Check', [])

  const {
    data: contactListData,
    loading,
    error,
  } = useQuery<ContactListType>(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
      offset,
    },
  })

  const handleAddFavorites = (contact: Contact) => {
    setFavorites([...favorites, contact])
    const filteredContacts = contacts.filter((c) => c.id !== contact.id)
    setContacts(filteredContacts)
  }

  const handleRemoveFavorites = (contact: Contact) => {
    setContacts([...contacts, contact])
    const filteredFavorites = favorites.filter((c) => c.id !== contact.id)
    setFavorites(filteredFavorites)
  }

  useEffect(() => {
    if (!!contactListData) {
      console.log(contactListData.contact)
      if (!arraysHaveSameObjects(contactListData.contact, temp)) {
        const noFavorites = contactListData.contact.filter((element) => !favorites.includes(element))
        setFavorites([])
        setContacts(noFavorites)
        setTemp(contactListData.contact)
      }
    }
  }, [contactListData])

  return (
    <CustomHead
      title='Home'
      description='Phone Book App'
    >
      <Header />
      <HeaderList title='Favorites' />
      {favorites.length === 0 ? (
        <SubHeader>You have no favorite contacts</SubHeader>
      ) : (
        <ContactList
          contacts={favorites}
          handleFavorites={handleRemoveFavorites}
          isFavorite={true}
        />
      )}
      <br />
      <HeaderList title='Contacts' />
      {contacts.length === 0 ? (
        <SubHeader>You have no contacts</SubHeader>
      ) : (
        <ContactList
          contacts={contacts}
          handleFavorites={handleAddFavorites}
          isFavorite={false}
        />
      )}
    </CustomHead>
  )
}

export default Home
