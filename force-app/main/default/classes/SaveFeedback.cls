public with sharing class SaveFeedback {

    @AuraEnabled
    public static void saveFeedbackDetails(String email, String subject, String description, String screenshot) {
        Feedback__c feedbackItem = new Feedback__c();
        feedbackItem.Email__c = email;
        feedbackItem.Subject__c = subject;
        feedbackItem.Description__c = description;
        feedbackItem.Screenshot__c = screenshot;

        insert feedbackItem;
    }
}


// public with sharing class saveFeedback{

//     @AuraEnabled
//     public static saveFeedbackDetails(String email, String subject, String description, String screenshot) {
//         Feedback__c feedbackItem = new Feedback__c(
//             Email__c = email,
//             Subject__c = subject,
//             Description__c = description,
//             Screenshot__c = screenshot
//             );

//     insert feedback;
//     }
// }
