trigger ItemTestObjectTrigger on ItemTestObject__c (before insert,after insert) {

    if (Trigger.isBefore) {
        if (Trigger.isInsert) {

            for(ItemTestObject__c atemp : Trigger.new){               
                System.debug('wp');
                System.debug(atemp.NumItem__c);
                System.debug(atemp.dateItem__c);
                System.debug(atemp.LengthItem__c);                
            }

        }        
    }

    if (Trigger.isAfter) {
        if (Trigger.isInsert) {

            for(ItemTestObject__c atemp : Trigger.new){
                System.debug('wp');
                System.debug(atemp.NumItem__c);
                System.debug(atemp.dateItem__c);
                System.debug(atemp.LengthItem__c);
            }

        }        
    }
}