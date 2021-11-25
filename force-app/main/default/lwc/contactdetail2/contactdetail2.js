import { LightningElement,api,wire } from 'lwc';
import { getRecord} from 'lightning/uiRecordApi';
import CONTACT_NAME_FIELD from '@salesforce/schema/Contact.Name';
import CONTACT_PHONE_FIELD from '@salesforce/schema/Contact.Phone';
const FIELDS = [CONTACT_NAME_FIELD, CONTACT_PHONE_FIELD];

export default class Contactdetail2 extends LightningElement {

    @api recordId;
    createFields = FIELDS;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;

    onSubmit( event ){
        event.preventDefault();
        let fields = event.detail.fields;
        var r = confirm("请按按钮");
        if (r == true) {
        this.template.querySelector('lightning-record-form').submit(fields);
        }
    }
}