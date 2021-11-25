import { LightningElement, wire } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class EventWithData extends LightningElement {
  selectedContact;

  @wire(getContactList) contacts;

  handleSelects(event) {
    const contactId = event.detail;
    console.log(contactId);
    this.selectedContact = this.contacts.data.find(
      (contact) => contact.Id === contactId
    );
    this.tet();
  }

  tet() {
    var compDefinition = {
      componentDef: "c:connectedCallbackLwc",
      attributes: {
        isSpinner: 'true'
      }
    }

    var encodedCompDef = btoa(JSON.stringify(compDefinition));
    console.log("/one/one.app#" + encodedCompDef);
  }
}