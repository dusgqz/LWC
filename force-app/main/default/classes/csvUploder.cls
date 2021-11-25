public with sharing class csvUploder {
    @AuraEnabled
    public static void insertCsvData(String jsonData) {

        // importデータ格納用変数
        List<Account> importData = new List<Account>();
        // 引数のデータをリストで取得
        List<Object> readData = (List<Object>)JSON.deserializeUntyped(jsonData);
        System.debug(readData);
        // リストをループ
        for(Object o : readData) {
            Map<String, Object> m = (Map<String, Object>)o;

            // 項目の値を取得
            Account a = new Account();
            a.Name = (String)m.get('Name');
            a.Site = (String)m.get('Site');
            a.BillingState= (String)m.get('BillingState');
            a.Phone= (String)m.get('Phone');
            a.Type = (String)m.get('Type');

            importData.add(a);
            System.debug('wangpeng');
        }
        try {
            insert importData;
        }
        catch(DmlException e) {
            throw e;
        }
    }
}