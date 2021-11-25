public class AccountExtensionsController {
    public List<Account> acct{get; set;}
    private ApexPages.StandardSetController localCon;
    public AccountExtensionsController(ApexPages.StandardSetController controller) {
        localCon = controller;
        localCon.getRecords();
    }

    public void test(){        
        Account a =(account)(localCon.getRecords().get(0));
    }
}