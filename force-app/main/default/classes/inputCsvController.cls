public inherited sharing class inputCsvController {
        public inputCsvController() {

        }

        /** 入力ファイル */
    public Blob file {get; set;}

    /** ボタン押した時のメソッド */
    public PageReference ImportBtn(){
        String csvfile =file.toString();
        system.debug('wangpeng ' + csvfile);

        // // CSVリスト化してオブジェクトを作成しInsert
        // List<List<String>> strListLists = new List<List<String>>();

        // // 取込みCSV
        // System.debug('wangpeng ' + this.cv);
        // System.debug('wangpeng1 ' + this.cv.body);
        // String csvFile = this.cv.VersionData.toString();
        // //文字列からCSV行毎のリストを作成
        // List<String> rowList = csvFile.split('\r\n', 0);
        // //CSV行毎のリストから項目のリストを作成
        // for(Integer i = 1 ; i < rowList.size() ; i++){
        //     // 項目単位にリスト化し、取込みCSVリストに追加
        //     List<String> strLists = rowList[i].split(',') ;
        //     strListLists.add(strLists);
        // }

        // // // リスト作成
        // // List<Target__c> targetList = insertCreator(strListLists);

        // // // 新規作成
        // // insert targetList;

        // System.debug('wangpeng' + strListLists);

        return null;
    }

    // public List<Target__c> insertCreator(List<List<String>> targetStringList) {

    //     // 更新用のリストを作成
    //     List<Target__c> insertList = new List<Target__c>();
    
    //     // 対象の番号を付けてMapに保存
    //     integer numberCounter = 0;
    //     Map<Integer,String> targetStringMap = new Map<Integer,String>();
    //     for (String targetString : ) {
    //         targetStringMap.put(numberCounter,targetString);
    //         numberCounter += 1;
    //     }
    
    //     // Mapの値を取得して更新用リストに詰める
    //     for (List<String> stringList : targetStringList) {
    //         Target__c target = new Target__c();
    //         target.Name = targetStringMap.get(0);
    //         insertList.add(target);
    //     }
    
    //     return insertList;
    // }
}