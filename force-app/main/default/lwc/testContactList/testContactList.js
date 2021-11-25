import { api, LightningElement, track, wire } from 'lwc';
import getContacts  from '@salesforce/apex/ContactController.getContactsByAccountId';
/** トーストメッセージを表示する */
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
/** カスタム表示ラベル：取引先責任者を取得でエラーが発生しました。 */
import ERROR_GETCONTACTS from '@salesforce/label/c.ErrMsg_GetContacts';
/** 新規取引先責任者作成用項目取得 */
import { refreshApex } from '@salesforce/apex';
import FIELD_LASTNAME from '@salesforce/schema/Contact.LastName';
import FIELD_FIRSTNAME from '@salesforce/schema/Contact.FirstName';
import FIELD_DEPARTMENT from '@salesforce/schema/Contact.Department';
import FIELD_TITLE from '@salesforce/schema/Contact.Title';
import FIELD_PHONE from '@salesforce/schema/Contact.Phone';
import FIELD_EMAIL from '@salesforce/schema/Contact.Email';

export default class TestContactList extends LightningElement {
    @api recordId;
    @track columns = [
        {label:'取引先責任者名',fieldName:'Name'}
        ,{label:'部署', fieldName:'Department'}
        ,{label:'役職', fieldName:'Title' }
        ,{label:'電話', fieldName:'Phone', type:'phone'}
        ,{label:'メール', fieldName:'Email', type: 'email'}
    ];

    // 取引先責任者取得結果
    resultContact = [];
    // 取引先責任者リストデータ
    @track contactList = [];
    // 新規作成モーダルダイアログ表示フラグ
    @track isShowModal = false;
    // 新規ダイアログ表示項目
    createFields = [FIELD_LASTNAME, FIELD_FIRSTNAME, FIELD_DEPARTMENT, FIELD_TITLE, FIELD_PHONE, FIELD_EMAIL];

    @wire (getContacts,{'accountId': '$recordId'})
        setContactList(result) {
            this.resultContact = result;
            if(result.data) {
                this.contactList= result.data
            }else if(result.error){
                this.ShowToast(ERROR_GETCONTACTS,result.error.detail.body.message,'error','sticky');
            }
        }
    
         /**
     * modalダイアログオープン
     */
    openModal(){
        this.isShowModal = true;
    }

    /**
     * modalダイアログクローズ
     */
    closeModal(){
        this.isShowModal = false;
    }

    /**
     * 新規 取引先責任者データ作成実行
     */
    onSubmit( event ){
        event.preventDefault();
        let fields = event.detail.fields;
        fields.AccountId = this.recordId;
        fields.Top_Secret__c = 'wangpengtest';
        console.log(JSON.stringify(fields));
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    /**
     * 新規データ作成成功時メソッド
     * 更新データ画面描画
     */
    onSuccess(event) {

        // 確認用コード
        const contact = event.detail;
        console.log(JSON.stringify(contact));
        const updatedRecord = event.detail.id;
        console.log('onsuccess: ', updatedRecord);
        // @wireのキャッシュをクリアして、取引先責任者データを再取得する。
        refreshApex(this.resultContact);
        //ダイアログクローズ
        this.isShowModal = false;
        //データ作成報告
        this.showToast('SUCCESS','取引先責任者が作成されました。','success','pester');
    }


    /*
     *トーストによるメッセージ表示
     */
    showToast(title,message,varient,mode) {
        const event = new ShowToastEvent({
             title   : title
            ,message : message
            ,variant : varient //info/success/warning/error
            ,mode    : mode    //sticky クローズボタンを押すまで表示
                               //pester 3秒間表示
                               //dismissable sticky+pester
        });
        this.dispatchEvent(event);
    }
}