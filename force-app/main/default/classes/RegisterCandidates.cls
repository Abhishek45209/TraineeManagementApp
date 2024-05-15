public with sharing class RegisterCandidates {

        @AuraEnabled
        public static void saveCandidate(String fullName, String email, String password, String mobileNumber) {
            try {
                Register_Candidate__c candidate = new Register_Candidate__c();
                candidate.Name = fullName;
                candidate.Email__c = email;
                candidate.UserPassword__c = password;
                candidate.phone_Number__c = mobileNumber;
                insert candidate;

                
                Candidate_Profile__c profile = new Candidate_Profile__c();
                profile.Name = fullName ;
                profile.Email_ID__c = email;
                profile.Phone__c	 = mobileNumber ;
                profile.Candidate_ID__c = candidate.Id;
                
                insert profile;
            } catch(Exception ex) {
                throw new AuraHandledException('Error occurred while saving candidate: ' + ex.getMessage());
            }
        }
    }