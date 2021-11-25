import { LightningElement, track } from 'lwc';

export default class Lwc_eventSample extends LightningElement {
    @track page=1;
    previousHandlerS(){
        if(this.page>1){
            this.page= this.page-1;
        }
    }

    nextHandlerS(){
        this.page = this.page + 1;
    }
}