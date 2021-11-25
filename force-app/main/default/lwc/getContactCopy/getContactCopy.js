import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import {ShowToastEvent } from 'lightning/platformShowToastEvent';
import obname from '@salesforce/schema/Contact';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
const FIELDS = [CONTACT_NAME_FIELD, CONTACT_PHONE_FIELD];

export default class GetContactCopy extends LightningElement {
    @api recordId;

    objectApiName = obname;
    fields = FIELDS;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Contact update",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });

        this.dispatchEvent(toastEvent);
    } 

    get name() {
        //return this.contact.data.fields.Name.value;
        return getFieldValue(this.contact.data, CONTACT_NAME_FIELD);
    }

    get phone() {
        return this.contact.data.fields.Phone.value;
    }
}