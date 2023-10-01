import React, { useState, useEffect } from 'react'
import { NextPage } from 'next'
import { useQuery } from '@apollo/client'
import { GET_CONTACT_LIST } from '@/services/queries'
import { Contact, ContactListType } from '@/types/contact-list'

import CustomHead from '@/layouts/CustomHead'
import ContactList from '@/components/Contact/ContactList'
import useLocalStorage from '@/hooks/useLocalStorage'
import HeaderList, { SubHeader } from '@/components/Header/HeaderList'
import Header from '@/components/Header/Header'
import Modal from '@/components/Base/Modal'
import Button from '@/components/Base/Button'
import AddContactForm from '@/components/Contact/AddContactForm'
import { Btn } from '@/components/Base/Button'

const inputStyles = {
  backgroundColor: '#242428',
  border: '1px solid #fedd95',
  padding: '10px',
  margin: '10px 0',
  color: '#fedd95',
  borderRadius: '5px',
}

const paginationStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
}

const Home: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [tempPage, setTempPage] = useState<number>(1)
  const [hasMorePages, setHasMorePages] = useState(false)
  const [contacts, setContacts, removeContact] = useLocalStorage<Contact[]>('contact list', [])
  const [favorites, setFavorites, removeFavorites] = useLocalStorage<Contact[]>('favorite list', [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredFavorites, setFilteredFavorites] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])

  const {
    data: contactListData,
    loading,
    error,
  } = useQuery<ContactListType>(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
      offset: (currentPage - 1) * 10,
    },
  })

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleAddFavorites = (contact: Contact) => {
    setFavorites([...favorites, contact])
    const filteredContactsList = contacts.filter((c) => c.id !== contact.id)
    setContacts(filteredContactsList)
  }

  const handleRemoveFavorites = (contact: Contact) => {
    setContacts([...contacts, contact])
    const filteredFavoritesList = favorites.filter((c) => c.id !== contact.id)
    setFavorites(filteredFavoritesList)
  }

  const handleAddFavoritesSearched = (contact: Contact) => {
    setFavorites([...favorites, contact])
    const filteredContactsSearched = contacts.filter((c) => c.id !== contact.id)
    setContacts(filteredContactsSearched)
    setFilteredContacts(filteredContactsSearched)
  }

  const handleRemoveFavoritesSearched = (contact: Contact) => {
    setContacts([...contacts, contact])
    const filteredFavoritesSearched = favorites.filter((c) => c.id !== contact.id)
    setFavorites(filteredFavoritesSearched)
    setFilteredFavorites(filteredFavoritesSearched)
  }

  const handleSearch = (searchInput: string) => {
    const filteredFavs = favorites.filter((fav) =>
      (fav.first_name + ' ' + fav.last_name).toLowerCase().includes(searchInput.toLowerCase())
    )

    const filteredCont = contacts.filter((contact) =>
      (contact.first_name + ' ' + contact.last_name).toLowerCase().includes(searchInput.toLowerCase())
    )

    setFilteredFavorites(filteredFavs)
    setFilteredContacts(filteredCont)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  useEffect(() => {
    if (!!contactListData && currentPage === tempPage) {
      setHasMorePages(contactListData?.contact.length === 10)

      let favoritesTemp = [...favorites]
      let contactsTemp = [...contactListData.contact]

      favoritesTemp = favoritesTemp.filter((favorite) =>
        contactsTemp.some((tempContact) => tempContact.id === favorite.id)
      )

      contactsTemp = contactsTemp.filter(
        (tempContact) => !favoritesTemp.some((favorite) => favorite.id === tempContact.id)
      )

      setContacts(contactsTemp)
      setFavorites(favoritesTemp)
    } else if (!!contactListData && currentPage !== tempPage) {
      setTempPage(currentPage)
    }
  }, [contactListData, contactListData?.contact, currentPage, tempPage])

  return (
    <CustomHead
      title='Home'
      description='Phone Book App'
    >
      <Header />
      <div style={{ textAlign: 'center' }}>
        <input
          type='text'
          placeholder='Search Contact'
          style={inputStyles}
          value={searchValue}
          onChange={(e) => {
            const inputValue = e.target.value
            setSearchValue(inputValue)
            handleSearch(inputValue)
          }}
        />
      </div>
      <HeaderList title='Favorites' />
      {searchValue ? (
        <>
          {filteredFavorites.length === 0 ? (
            <SubHeader>No matching favorite contacts found</SubHeader>
          ) : (
            <ContactList
              contacts={filteredFavorites}
              handleFavorites={handleRemoveFavoritesSearched}
              isFavorite={true}
            />
          )}
        </>
      ) : (
        <>
          {favorites.length === 0 ? (
            <SubHeader>You have no favorite contacts</SubHeader>
          ) : (
            <ContactList
              contacts={favorites}
              handleFavorites={handleRemoveFavorites}
              isFavorite={true}
            />
          )}
        </>
      )}
      <br />
      <HeaderList title='Contacts' />
      {searchValue ? (
        <>
          {filteredContacts.length === 0 ? (
            <SubHeader>No matching contacts found</SubHeader>
          ) : (
            <ContactList
              contacts={filteredContacts}
              handleFavorites={handleAddFavoritesSearched}
              isFavorite={false}
            />
          )}
        </>
      ) : (
        <>
          {contacts.length === 0 ? (
            <SubHeader>You have no contacts</SubHeader>
          ) : (
            <ContactList
              contacts={contacts}
              handleFavorites={handleAddFavorites}
              isFavorite={false}
            />
          )}
        </>
      )}

      {/*PAGINATION*/}
      <div style={paginationStyles}>
        <Btn
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Btn>
        <p style={{ padding: '0.5rem 1rem', border: '1px solid #fedd95', borderRadius: '5px' }}>{currentPage}</p>
        <Btn
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!hasMorePages}
        >
          Next
        </Btn>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px', marginTop: '10px' }}>
        <Button
          text={'Tambah Kontak'}
          onClick={openModal}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <AddContactForm />
      </Modal>
    </CustomHead>
  )
}

export default Home
