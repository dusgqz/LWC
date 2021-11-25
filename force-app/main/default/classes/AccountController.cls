public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [select name,annualRevenue,Industry,Phone  
                from Account
                with SECURITY_ENFORCED
                order by name];
    }
}