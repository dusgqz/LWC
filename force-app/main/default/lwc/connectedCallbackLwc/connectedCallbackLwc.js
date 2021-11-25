import { LightningElement, wire, track, api } from 'lwc';
import getLatestAccounts from '@salesforce/apex/AccountController.getAccounts';
const COLS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Stage', fieldName: 'Phone', type: 'text' },
    { label: 'Amount', fieldName: 'Industry', type: 'text' }
];
export default class ConnectedCallbackLwc extends LightningElement {
    cols = COLS;
    @api isSpinner = false;
    @track accountList = [];

    connectedCallback() {
        this.isSpinner = true; 
        // setTimeout(() => {
        //     this.isSpinner = true;
        // }, 3000);
        console.log("wangpeng1");
    }

    @wire(getLatestAccounts) fetchAccList(result) {
        this.isSpinner = false;
        if (result.data) {
            this.accountList = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.accountList = [];
        }
        console.log("wangpeng");
        console.log(result.data);
    }
}