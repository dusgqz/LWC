import { LightningElement,api } from 'lwc';

export default class ImportHoliday extends LightningElement {

    // アップロードファイル
    file = null;
    /**
    * 処理中フラグ
    */
    isProgress = false;

   /**
    * ファイル非選択フラグ
    */
   isNotChooseFile = true;

   /**
    * ファイルName
    */
   fileName ;

   /**
    * 読み込んだファイルデータ
    */
   data;

    handleCancelClick(event){    }

    handleChangeFile(event){
        this.file = event.detail.files;
        this.fileName = this.file[0].name;
        // FileReaderオブジェクトの生成
        const fileReader = new FileReader();
        fileReader.onloadend =() => {
            // 読み込んだデータを設定する
           this.data = fileReader.result;
           // ファイル非選択フラグを設定する
           this.isNotChooseFile = false;
        }

        // ファイルを読み込む
        fileReader.readAsText(event.detail.files[0], 'Shift_JIS');
    }

    handleConfirmImportClick(){
        // 読み込んだデータを改行で分割する
       const rows = this.data.split(/\r\n|\n/);
       // 処理中フラグを設定する
       this.isProgress = true;

       const holidays = [];
       for(let i=1 ; i<rows.length ; i++){
           const cols = rows[i].split(',');
           holidays.push({
            ID: cols[0],
            holiday: cols[1]
        });
        }

        console.log("wangpeng");
        console.log(holidays);
        console.log(JSON.stringify(holidays));

        this.isProgress = false;
    }
}