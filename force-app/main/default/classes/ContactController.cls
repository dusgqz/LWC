public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        // throw new AuraHandledException('Forced error');
        return [SELECT FirstName, LastName, Email FROM contact
        with SECURITY_ENFORCED
        order by name];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT Id, Name, Title, Phone, Email
            FROM Contact
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactsByAccountId( Id accountId ){
        //取引先に関連する取引先責任者を取得する
        return [
            SELECT Id, Name, Department, Title ,Phone, Email
            FROM Contact
            WHERE AccountId = :accountId
            ORDER BY CreatedDate
            limit 10
        ];
    }
}