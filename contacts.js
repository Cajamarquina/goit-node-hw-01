import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateListContacts = (allContacts) => fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactResult = allContacts.find((item) => item.id === contactId);
  return contactResult || null;
}

export async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [newListContacts] = allContacts.splice(index, 1);
  await updateListContacts(allContacts);
  return newListContacts;
}

export async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  allContacts.push(newContact);
  await updateListContacts(allContacts);
  return newContact;
}