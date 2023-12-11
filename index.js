import { program } from "commander";
import * as contactService from "./contacts.js";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactService.listContacts();
      return console.log(allContacts);
    case "get":
      const contactById = await contactService.getContactById(id);
      return console.log(contactById);
    case "remove":
      const removeContact = await contactService.removeContact(id);
      return console.log(removeContact);
    case "add":
      const newContact = await contactService.addContact(name, email, phone);
      return console.log(newContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);