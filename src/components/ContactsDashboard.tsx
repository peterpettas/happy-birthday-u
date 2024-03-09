'use client'

import React, { useState, useEffect } from 'react';
import { Contact } from '../types';
import AddContactForm from './AddContactForm';
import Image from 'next/image';

const ContactsDashboard: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [editContact, setEditContact] = useState<Contact | null>(null);


  const addNewContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  }

  const handleAddContactClick = () => {
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
    const modal = document.getElementById("addContactForm");
    if (showAddForm) {
      modal?.showModal();
    } else {
      // Optional: Check if the dialog is already open to avoid errors
      if (modal?.open) {
        modal.close();
      }
    }
  }, [showAddForm]); // Empty dependency array: Execute just once on component mount

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">Upcoming Birthdays</h1>
      <button className="btn btn-primary" onClick={handleAddContactClick}>
        Add Contact
      </button>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birthday</th>
              <th>Platform</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image src={`https://avatar.iran.liara.run/username?username=${contact.name}`} width={48} height={48} alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{contact.name}</div>
                    </div>
                  </div>
                </td>
                <td>{contact.birthday.split("-").reverse().join("/")}</td>
                <td>{contact.platform}</td>
                <th>
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
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>Name</th>
              <th>Birthday</th>
              <th>Platform</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
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
