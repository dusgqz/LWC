import { LightningElement,api,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord, getFieldValue,getRecordNotifyChange } from 'lightning/uiRecordApi';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
const FIELDS = [CONTACT_NAME_FIELD, CONTACT_PHONE_FIELD];

export default class Contactdetail extends LightningElement {
    @api recordId;
    nameOld = "";
    fields = FIELDS;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;
    get name() {    
        //return this.contact.data.fields.Name.value;       
        return getFieldValue(this.contact.data, CONTACT_NAME_FIELD);
    }    

    get phone() {
        console.log('wangpeng1');
        console.log(this.contact);  
        // return this.contact.data.fields.Phone.value;
    }

    handleClick(event) {
        event.preventDefault();
    
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    }

    can(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
      
}