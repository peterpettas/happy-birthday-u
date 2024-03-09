'use client'

import React, { useState, useEffect } from 'react';
import { Contact } from '../types';
import AddContactForm from './AddContactForm';

const ContactsDashboard: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editContact, setEditContact] = useState<Contact | null>(null);


  const addNewContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  }

  const handleAddContactClick = () => {
    console.log("showAddForm:", showAddForm);
    setShowAddForm(true);
  };

  const handleAddOrEditContact = (contact: Contact) => {
    const updatedContacts = contacts.slice();
    const existingIndex = contacts.findIndex((c) => c.id === contact.id);

    if (existingIndex > -1) {
      // Existing contact found, update it
      // const updatedContacts = [...contacts];
      updatedContacts[existingIndex] = contact;
      setContacts(updatedContacts);
    } else {
      // No existing contact found, add as new
      // setContacts([...contacts, contact]);
      updatedContacts.push(contact);
    }

     setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    console.log("New Contact Added", contacts);
    // Reset any states used for editing
    setEditContact(null);
    setShowAddForm(false);
  };

  const startEditContact = (contactId: string) => {
    const contactToEdit = contacts.find((contact) => contact.id === contactId);
    if (contactToEdit) {
      setEditContact(contactToEdit);
      setShowAddForm(true); // Re-use the form for adding a contact, but in edit mode
    }
  };


  const deleteContact = (contactId: string) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
      console.log("storedContacts:", storedContacts);
    }
  }, []); // Empty dependency array: Execute just once on component mount

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">Upcoming Birthdays</h1>
      <button className="btn btn-primary" onClick={handleAddContactClick}>
        Add Contact
      </button>
      <ul className="list-disc list-inside">
        {contacts.map((contact) => (
          <li key={contact.id}>
            <span>
              {contact.name} - {contact.birthday} | ({contact.platform})
            </span>
            <span>
              <button
                className="btn btn-xs btn-info mr-2"
                onClick={() => startEditContact(contact.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-xs btn-error"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
      {showAddForm && (
        <AddContactForm
          contactToEdit={editContact}
          onAddOrEditContact={handleAddOrEditContact}
          onCancelEdit={() => {
            setEditContact(null);
            setShowAddForm(false);
          }}
        />
      )}
    </div>
  );
};

export default ContactsDashboard;
