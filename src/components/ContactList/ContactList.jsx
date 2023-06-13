import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { Contact } from 'components/Contact/Contact';

import css from './ContactList.module.css';

export const ContactList = () => {

    const contacts = useSelector(state => state.contacts);
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const filteredContacts = () => 
        contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()));

    const removeContact = id => dispatch(deleteContact(id));

    return (
        <ul className={css.contactList}>
            {filteredContacts().map(contact => (
                <li key={contact.id} className={css.contactListItem}>
                    <Contact 
                    contact={contact} 
                    deleteContact={removeContact} />
                </li>
            ))}
        </ul>
    );
};