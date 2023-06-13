import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const isFirstLaunch = useRef(true);
  
  //   contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],

  const createUser = contact => {
    setContacts(prevContacts => [...prevContacts, { ...contact, id: nanoid() }]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId))
  };

  const onFilter = e => {
    setFilter(e.currentTarget.value);
  };
  
  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    if (isFirstLaunch.current) {
      isFirstLaunch.current = false;
      return;
    }
    const contactList = JSON.stringify(contacts);
    if (contactList) {
      localStorage.setItem('contacts', contactList);
    }
  }, [contacts]);

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm createUser={createUser} />

        <h2>Contacts</h2>
        <Filter filter={filter} onChange={onFilter} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onDelete={deleteContact}
        />
      </div>
    );
  };