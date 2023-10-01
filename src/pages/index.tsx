import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { GET_CONTACT_LIST } from '@/services/queries';
import { Contact, ContactListType } from '@/types/contact-list';

import CustomHead from '@/layouts/CustomHead';
import ContactList from '@/components/Contact/ContactList';
import useLocalStorage from '@/hooks/useLocalStorage';
import HeaderList, { SubHeader } from '@/components/Header/HeaderList';
import Header from '@/components/Header/Header';

import Modal from '@/components/Base/Modal';
import Button from '@/components/Base/Button';
import AddContactForm from '@/components/Contact/AddContactForm';

const Home: NextPage = () => {
  const [offset, setOffset] = useState<number>(0);
  const [contacts, setContacts, removeContact] = useLocalStorage<Contact[]>('contact list', []);
  const [favorites, setFavorites, removeFavorites] = useLocalStorage<Contact[]>('favorite list', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredFavorites, setFilteredFavorites] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  const {
    data: contactListData,
    loading,
    error,
  } = useQuery<ContactListType>(GET_CONTACT_LIST, {
    variables: {
      limit: 10,
      offset,
    },
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddFavorites = (contact: Contact) => {
    setFavorites([...favorites, contact]);
    const filteredContacts = contacts.filter((c) => c.id !== contact.id);
    setContacts(filteredContacts);
  };

  const handleRemoveFavorites = (contact: Contact) => {
    setContacts([...contacts, contact]);
    const filteredFavorites = favorites.filter((c) => c.id !== contact.id);
    setFavorites(filteredFavorites);
  };



  const handleSearch = (searchInput: string) => {
    // Filter favorites based on the search input
    const filteredFavs = favorites.filter((fav) =>
        (fav.first_name + ' ' + fav.last_name).toLowerCase().includes(searchInput.toLowerCase())
    );

    // Filter contacts based on the search input
    const filteredCont = contacts.filter((contact) =>
        (contact.first_name + ' ' + contact.last_name).toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredFavorites(filteredFavs);
    setFilteredContacts(filteredCont);
  };

  useEffect(() => {
    if (!!contactListData) {
      let favoritesTemp = [...favorites];
      let contactsTemp = [...contactListData.contact];

      const favoritesInTemp = favorites.filter((favorite) =>
          contactListData.contact.some((tempContact) => tempContact.id === favorite.id)
      );
      const noFavorites = contactListData.contact.filter((element) => !favoritesInTemp.includes(element));

      // Remove items from favorites that are not in contactListData.contact
      favoritesTemp = favoritesTemp.filter((favorite) =>
          contactsTemp.some((tempContact) => tempContact.id === favorite.id)
      );

      // Remove items from contactsTemp that are in favorites
      contactsTemp = contactsTemp.filter((tempContact) =>
          !favoritesTemp.some((favorite) => favorite.id === tempContact.id)
      );

      setContacts(contactsTemp);
      setFavorites(favoritesTemp);
    }
  }, [contactListData]);

  return (
      <CustomHead
          title='Home'
          description='Phone Book App'
      >
        <Header />
        <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              const inputValue = e.target.value;
              setSearchValue(inputValue);
              handleSearch(inputValue);
            }}
        />
        <HeaderList title='Favorites' />
        {searchValue ? (
            <>
              {filteredFavorites.length === 0 ? (
                  <SubHeader>No matching favorite contacts found</SubHeader>
              ) : (
                  <ContactList
                      contacts={filteredFavorites}
                      handleFavorites={handleRemoveFavorites}
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
                      handleFavorites={handleAddFavorites}
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
  );
};

export default Home;
