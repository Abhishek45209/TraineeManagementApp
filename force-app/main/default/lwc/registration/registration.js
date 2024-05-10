import { LightningElement, track } from 'lwc';
import saveCandidate from '@salesforce/apex/RegisterCandidates.saveCandidate';
import ImageSidebar from '@salesforce/resourceUrl/ImageSidebar';

import { RecordFieldDataType } from 'lightning/uiRecordApi';


import Google from '@salesforce/resourceUrl/Google';
import Name from '@salesforce/resourceUrl/Name';
import Email from '@salesforce/resourceUrl/Email';
import Mobile from '@salesforce/resourceUrl/Mobile';
import password from '@salesforce/resourceUrl/password';
import ConfirmPassword from '@salesforce/resourceUrl/ConfirmPassword';


export default class Registration extends LightningElement {
    registrationLeftImage = ImageSidebar;
    googleImage = Google;
    nameIcon = Name;
    emailIcon = Email;
    mobileIcon = Mobile;
    passwordIcon = password;
    ConfirmPasswordIcon = ConfirmPassword;
    //new code
    

//Abhik Code


    @track fullName;
    @track email;
    @track password;
    @track mobileNumber;
    @track confirmPassword;
    @track error;

    handleFullNameChange(event) {
        this.fullName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePasswordChange(event) {
        this.password = event.target.value;
    }

    handleMobileNumberChange(event) {
        this.mobileNumber = event.target.value;
    }

    handleConfirmPasswordChange(event) {
        this.retypePassword = event.target.value;
    }

    handleRegister() {
       
        if (this.password != this.confirmPassword) {
            this.error = 'Passwords do not match';
            return;
        }else{
            saveCandidate({ fullName: this.fullName, email: this.email, password: this.password, mobileNumber: this.mobileNumber })
            .then(() => {
                
                console.log('Candidate saved successfully!');
            })
            .catch(error => {
              
                this.error = error.body.message;
                console.error('Error saving candidate:', this.error);
            });
        }

        
        
    }
}









// new css design