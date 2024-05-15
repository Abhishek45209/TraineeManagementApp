import { LightningElement, track } from 'lwc';
import saveCandidate from '@salesforce/apex/RegisterCandidates.saveCandidate';
import ImageSidebar from '@salesforce/resourceUrl/ImageSidebar';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { RecordFieldDataType } from 'lightning/uiRecordApi';
import { NavigationMixin } from 'lightning/navigation';


import Google from '@salesforce/resourceUrl/Google';
import Name from '@salesforce/resourceUrl/Name';
import Email from '@salesforce/resourceUrl/Email';
import Mobile from '@salesforce/resourceUrl/Mobile';
import password from '@salesforce/resourceUrl/password';
import ConfirmPassword from '@salesforce/resourceUrl/ConfirmPassword';


export default class Registration extends NavigationMixin(LightningElement) {
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
        this.confirmPassword = event.target.value;
    }

    handleRegister() {
       
        if (this.password != this.confirmPassword) {
            this.error = 'Passwords do not match';
            return;
        }else{
            saveCandidate({ fullName: this.fullName,
                 email: this.email, 
                 password: this.password,
                  mobileNumber: this.mobileNumber })
            .then(() => {
                const event = new ShowToastEvent({
                    title: 'Success!',
                    message: 'Registration successful.',
                    variant: 'success',
                });
                this.dispatchEvent(event);
                
                this[NavigationMixin.Navigate]({
                    type: 'standard__navItemPage',
                    attributes: {
                      apiName: 'LoginPage',
                    },
                  });

            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Failed!',
                    message: 'Something went wrong!',
                    variant: 'error',
                });
                this.dispatchEvent(event);
              
                this.error = error.body.message;
                console.error('Error saving candidate:', this.error);
            });
        }

        
        
    }


    LoginRedirect() {
        this[NavigationMixin.Navigate]({
          type: 'standard__navItemPage',
          attributes: {
            apiName: 'LoginPage',
          },
        });
      }
}









// new css design