public with sharing class FeedbackDisplay {
    @AuraEnabled(cacheable=true)
    public static List<Feedback__c> getFeedbacks() {
        return [SELECT Id, Email__c, Subject__c, Description__c, Screenshot__c FROM Feedback__c];
    }
}