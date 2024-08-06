// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { nanoid } from 'nanoid';
// import Notiflix from 'notiflix';
// import Section from './Section/Section';
// import ContactForm from './ContactForm/ContactForm';
// import ContactList from './ContactList/ContactList';
// import Filter from './Filter/Filter';
// import { addTask, deleteContact, setContacts } from './redux/taskSlice';
// import { setFilter } from './redux/filtersSlice';

// export const App = () => {
//   const contacts = useSelector(state => state.task || []);
//   const filterStatus = useSelector(state => state.filters.status);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);

//   useEffect(() => {
//     const savedContacts = localStorage.getItem('contacts');
//     if (savedContacts) {
//       dispatch(setContacts(JSON.parse(savedContacts)));
//     }
//   }, [dispatch]);

//   const handleAddContact = (name, number) => {
//     const contactExists = contacts.some(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (contactExists) {
//       Notiflix.Report.failure('Error', `${name} is already in contacts`, 'OK');
//       return;
//     }

//     const newContact = { id: nanoid(), name, number };
//     dispatch(addTask(newContact));
//   };

//   const handleFilterChange = event => {
//     dispatch(setFilter(event.target.value));
//   };

//   const getFilteredContacts = () => {
//     const normalizedFilter = filterStatus.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   const handleDeleteContact = id => {
//     dispatch(deleteContact(id));
//   };

//   return (
//     <div className="div-contact">
//       <Section title="Phonebook">
//         <ContactForm onAddContact={handleAddContact} />
//       </Section>
//       <Section title="Contacts">
//         <Filter filter={filterStatus} onFilterChange={handleFilterChange} />
//         <ContactList
//           contacts={getFilteredContacts()}
//           onDeleteContact={handleDeleteContact}
//         />
//       </Section>
//     </div>
//   );
// };

// export default App;

////////////   refactorizacion

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Notiflix from 'notiflix';
import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { fetchContacts, addContact, deleteContact } from './redux/taskSlice';
import { setFilter } from './redux/filtersSlice';

export const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.tasks.contacts.items);
  const filterStatus = useSelector(state => state.filter); // Asegúrate de usar `state.filter`
  const isLoading = useSelector(state => state.tasks.contacts.isLoading);
  const error = useSelector(state => state.tasks.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    const contactExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (contactExists) {
      Notiflix.Report.failure('Error', `${name} is already in contacts`, 'OK');
      return;
    }

    dispatch(addContact({ name, number }));
  };

  const handleFilterChange = event => {
    if (event && event.target) {
      dispatch(setFilter(event.target.value));
    } else {
    }
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filterStatus.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="div-contact">
      <Section title="Phonebook">
        <ContactForm onAddContact={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <Filter filter={filterStatus} onFilterChange={handleFilterChange} />
        <ContactList
          contacts={getFilteredContacts()}
          onDeleteContact={handleDeleteContact}
        />
      </Section>
    </div>
  );
};

export default App;
