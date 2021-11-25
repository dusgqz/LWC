public inherited sharing class CaseExtensionsController {
    private ApexPages.StandardSetController localCon;
        /**
    * CSVデータ
    */
    public String data { get; set; }
    public List<Case>  caseList { get; set; }
    /**
    * ファイル名
    */
    public String fileName { get; set; }
    public CaseExtensionsController(ApexPages.StandardSetController controller) {
        localCon = controller;
        caseList = (List<Case>)localCon.getRecords();
    }

        /**
    * CSVデータを作成する
    */
    public void create() {
        List<String> lst = new List<String>();
        // lst.add('"0001","岩手県"');
        // lst.add('"0002","秋田県"');
        for(Case temp: caseList ){
            String str = temp.Id;
            str = '"' + str +'"';
            lst.add(str);
        }

        data = String.join(lst, '\r\n');
        
        data +='\r\n';
        fileName ='shiftjis';
        fileName +='.csv';
    }
    
}