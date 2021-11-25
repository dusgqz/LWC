// Lightning Web Componentから @wire, @api をインポート
import { LightningElement, api } from "lwc";
// ShowToastEvent(ポップアップメッセージ)をインポート
import { ShowToastEvent } from "lightning/platformShowToastEvent";
// Apex Classの定義
import insertCsvData from "@salesforce/apex/csvUploder.insertCsvData";

export default class CsvUploader extends LightningElement {
  // アップロードファイル
  @api file = null;
  // ファイル名(画面表示用)
  @api fileName;
  // 送信フラグ
  @api isSend = false;
  @api isLoaded = false;
  // ファイルの中身
  data;

  // ファイルを選択すると発火
  handleCsvUpload(event) {
    // 選択したアップロードファイルを取得
    this.file = event.detail.files;

    // ファイル名を取得
    this.fileName = this.file[0].name;
    // ファイルが選択されたらボタンをアクティブ化
    this.isSend = this.file;

    // FileReaderオブジェクトの生成
    const fileReader = new FileReader();

    // ファイルの読み込みが完了したら実行
    fileReader.onloadend = () => {
      // 読み込み結果を設定
      this.data = fileReader.result;
    };

    // ファイルを読み込み
    fileReader.readAsText(this.file[0]);
  }

  // csvアップロード処理
  handleUpload() {
    // アップロードファイルを選択していないと送信させない
    if (!this.file) {
      return;
    }
    // ローディング表示をtrue
    this.isLoaded = true;

    Promise.resolve()
      .then(() => {
        return new Promise((resolve, reject) => {
          // ファイルを改行で分割しフィールドごとに配列で取得
          const rows = this.data.split(/\r\n|\n/);
          console.log(rows);

          // データをjson形式で取得
          const outputJson = [];
          for (let i = 1; i < rows.length; i++) {
            const cols = rows[i].split(",");
            outputJson.push({
              Name: cols[0],
              Site: cols[1],
              BillingState: cols[2],
              Phone: cols[3],
              Type: cols[4]
            });
          }

          // Apexでインポート処理
          insertCsvData({
            jsonData: JSON.stringify(outputJson)
          })
            .then((result) => {
              this.data = result;
              resolve(this.data);
              // 成功ポップアップメッセージ表示
              this.dispatchEvent(
                new ShowToastEvent({
                  title: "Success!!",
                  message: "Success!!",
                  variant: "success"
                })
              );
            })
            // 失敗ポップアップメッセージ表示
            .catch((error) => {
              this.dispatchEvent(
                new ShowToastEvent({
                  title: "Error!!",
                  message: error,
                  variant: "error"
                })
              );
            });
        });
      })
      .catch((error) => {
        console.log(error);
      })
      // 最終処理
      .finally(() => {
        // input fileを初期化
        this.template.querySelectorAll("lightning-input").forEach((each) => {
          each.value = "";
        });
        // アップロードファイルを初期化
        this.file = null;

        // 送信ボタンを非アクティブ化
        this.isLoaded = false;
      });
  }
}