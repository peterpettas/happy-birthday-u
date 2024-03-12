import React, { useState, useEffect } from "react";
import { Contact } from "../types";
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

	setNewContact({
		...newContact,
		[event.target.name]: event.target.value
	});
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

	if (!newContact.name || !newContact.birthday) {
		alert("Please fill in all required fields"); // Improve this later
		return;
	}

	const uniqueId = `contact-${Date.now()}`;

	const newContactWithId = {
		...newContact,
		id: newContact.id ? newContact.id : uniqueId,
	};

	console.log('birdthday:', newContactWithId.birthday);

	onAddOrEditContact(newContactWithId);
	console.log("newContact:", newContactWithId);

	setNewContact({
		id: "",
		name: "",
		birthday: "",
		platform: "SMS",
	});
  };

  const modalTitle = contactToEdit ? "Edit Contact" : "Add a New Contact";

useEffect(() => {
  if (contactToEdit) {
    setNewContact(contactToEdit); // This should include the ID
  }
}, [contactToEdit]);

  return (
    <dialog id="addContactForm" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h2 className="text-2xl font-semibold mb-4">{modalTitle}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-control space-y-4">
            <input
              type="text"
              name="name"
              className="input input-bordered"
              value={newContact.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <div className="join join-vertical">
              <label className="label">Birthday</label>
              <input
                type="date"
                name="birthday"
                onChange={handleInputChange}
                value={newContact.birthday}
                className="input input-bordered"
              />
            </div>
            <div className="join join-vertical">
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
          </div>
          {/* Add similar fields for Birthday and Platform */}
          <div className="flex gap-4">
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
          </div>
        </form>
      </div>
    </dialog>
  ); 

};

export default AddContactForm;
