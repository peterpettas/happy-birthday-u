import React, { useState, useEffect } from "react";
import { Contact } from "../types";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse } from 'date-fns'

interface AddContactFormProps {
	contactToEdit?: Contact;
	onAddOrEditContact: (contact: Contact) => void;
	onCancelEdit?: () => void;
}

const AddContactForm: React.FC<AddContactFormProps> = ({ contactToEdit, onAddOrEditContact, onCancelEdit }) => {
  const [newContact, setNewContact] = useState<Contact>({
    id: "", // Leave empty, to be filled later
    name: "",
    birthday: "",
    platform: "SMS", // Default to SMS
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | Date ) => {

	if (event instanceof Date) {
		const offset = event.getTimezoneOffset();
		const localDate = new Date(event.getTime() - (offset * 60 * 1000));
		setSelectedDate(localDate);
		setNewContact({
			...newContact,
			birthday: localDate.toISOString().split('T')[0].split('-').reverse().join('/')
		});
	} else {
		setNewContact({
			...newContact,
			[event.target.name]: event.target.value
		});
	}
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

	if (!newContact.name || !newContact.birthday) {
		alert("Please fill in all required fields"); // Improve this later
		return;
	}

	const uniqueId = `contact-${Date.now()}`;

	// contactToEdit is null if we're adding a new contact
	// If we're editing, contactToEdit will contain the contact being edited
	// Use the ID from contactToEdit if it exists, otherwise use a unique ID
	const newContactWithId = {
		...newContact,
		id: newContact.id ? newContact.id : uniqueId,
	};

	console.log('birdthday:', newContactWithId.birthday);

	onAddOrEditContact(newContactWithId);
	console.log("newContact:", newContactWithId);

    // console.log("Submitted contact:", newContactWithId);
	// // append to local storage instead of replacing
	// const storedContacts = localStorage.getItem("contacts");
	// let newContacts: Contact[] = [];
	// if (storedContacts) {
	//   newContacts = JSON.parse(storedContacts);
	//   if (Array.isArray(newContacts)) {
	// 	newContacts.push(newContactWithId);
	//   } else {
	// 	console.error("Invalid contacts data:", storedContacts);
	//   }
	// } else {
	// 	newContacts.push(newContactWithId);
	// }
	// localStorage.setItem("contacts", JSON.stringify(newContacts));
    // Add logic to reset the form state here (e.g., setNewContact back to initial values)

	setNewContact({
		id: "",
		name: "",
		birthday: "",
		platform: "SMS",
	});
	setSelectedDate(null);
  };

useEffect(() => {
  if (contactToEdit) {
    setNewContact(contactToEdit); // This should include the ID
    const parsedDate = contactToEdit.birthday ? parse(contactToEdit.birthday, "dd/MM/yyyy", new Date()) : null;
    setSelectedDate(parsedDate);
	console.log("parseDate:", parsedDate, contactToEdit.birthday);
  }
}, [contactToEdit]);

  return (
    <form className="card shadow-lg p-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Add a New Contact</h2>
      <div className="form-control">
        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          className="input input-bordered"
          value={newContact.name}
          onChange={handleInputChange}
        />
        <label className="label">Birthday</label>
        <DatePicker
          name="birthday"
          selected={selectedDate}
          onChange={handleInputChange}
          dateFormat="dd/MM/yyyy" // Adjust the date format if needed
          className="input input-bordered"
        />
        <label className="label">Platform</label>
        <select
          name="platform"
          className="select select-bordered"
          value={newContact.platform}
          onChange={handleInputChange}
        >
          <option value="SMS">SMS</option>
          <option value="Messenger">Messenger</option>
          {/* Add more platform options if needed */}
        </select>
      </div>
      {/* Add similar fields for Birthday and Platform */}
      <button type="submit" className="btn btn-primary mt-4">
        Save Contact
      </button>
      <button
        type="button"
        className="btn btn-ghost mt-4"
        onClick={onCancelEdit}
      >
        Cancel
      </button>
    </form>
  ); 

};

export default AddContactForm;
