public with sharing class TaskReminderController {
    @AuraEnabled(cacheable=true)
    public static List<TaskReminder__c> getTaskReminders() {
        return [SELECT Id, Name, Due_Date__c, Status__c FROM TaskReminder__c];
    }

    @AuraEnabled
    public static void updateTaskStatus(String taskId, Boolean status) {
        TaskReminder__c task = [SELECT Id, Status__c FROM TaskReminder__c WHERE Id = :taskId];
        task.Status__c = status;
        update task;
    }
}