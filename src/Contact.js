import React, { useState, useEffect } from 'react';
import "./Contact.css"

const ContactForm = ({user}) => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/contacts');
        const data = await response.json();
        setContacts(data.contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddContact = async (e) => {
    e.preventDefault();
    try {
      if (selectedContact) {
        // Update existing contact
        await fetch(`update/${user.username}/${selectedContact._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone }),
        });
        const updatedContact = { ...selectedContact, name, phone };
        setContacts(
          contacts.map((contact) =>
            contact._id === selectedContact._id ? updatedContact : contact
          )
        );
        setSelectedContact(null);
      } else {
        // Add new contact
        const response = await fetch(`http://localhost:4000/add/${user.username}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, phone }),
        });
        const data = await response.json();
        setContacts([...contacts, data.contact]);
      }
      setName('');
      setPhone('');
    } catch (error) {
      console.error('Error adding/updating contact:', error);
    }
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setName(contact.name);
    setPhone(contact.phone);
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await fetch(`http://localhost:4000/delete/${user.username}/${contactId}`, {
        method: 'DELETE',
      });
      setContacts(contacts.filter((contact) => contact._id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div>
      <h1 className="contact-form-heading">Contact Form</h1>
      {contacts.length > 0 && (
        <ul className="contact-list">
          {contacts.map((contact) => (
            <li key={contact._id}className="contact-item">
              {contact.name} - {contact.phone}
              <button className="edit-button" onClick={() => handleEditContact(contact)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteContact(contact._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <h2 className="form-title">{selectedContact ? 'Edit Contact' : 'Add Contact'}</h2>
      <form className="contact-form" onSubmit={handleAddContact}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Phone:
          <input type="number" value={phone} onChange={handlePhoneChange} />
        </label>
        <br />
        <button type="submit" className="confirm-contact">
          {selectedContact ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
