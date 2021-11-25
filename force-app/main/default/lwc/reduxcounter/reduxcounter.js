import { LightningElement } from 'lwc';
import { Redux } from 'c/lwcRedux';

export default class Reduxcounter extends Redux(LightningElement) {
    valueTemp;

    mapStateToProps(state) {
        const { allInfo } = state;
        return { ...allInfo };
    }

    changehandle(){
        console.log('wangpeng');
        console.log(this.valueTemp);
    }
}