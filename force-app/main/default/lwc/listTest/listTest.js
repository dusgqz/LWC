import { LightningElement,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import namefield from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ann from '@salesforce/schema/Account.AnnualRevenue';
import ind from '@salesforce/schema/Account.Industry';
const COLUMNS = [
    { label: 'Account Name', fieldName: namefield.fieldApiName, type: 'text', editable: true},
    { label: 'Annual Revenue', fieldName: REVENUE_FIELD.fieldApiName, type: 'currency', editable: true},
    { label: 'Industry', fieldName: INDUSTRY_FIELD.fieldApiName, type: 'text', editable: true  }
];

export default class ListTest extends LightningElement {
    columnList = COLUMNS;
    @wire(getAccounts)
    accdata;

    objectApiName = ACCOUNT_OBJECT;
    fields = [NAME_FIELD, ann, ind];

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });

        this.dispatchEvent(toastEvent);
    }    
}