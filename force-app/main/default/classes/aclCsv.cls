public with sharing class aclCsv {

    /**
    * CSVデータ
    */
    public String data { get; set; }

    /**
    * ファイル名
    */
    public String fileName { get; set; }
    
    public aclCsv() {

    }

    /**
    * CSVデータを作成する
    */
    public void create() {
        List<String> lst = new List<String>();
        lst.add('"0001","岩手県"');
        lst.add('"0002","秋田県"');

        data = String.join(lst, '\r\n');

        data +='\r\n';
        fileName ='shiftjis';
        fileName +='.csv';
    }
}