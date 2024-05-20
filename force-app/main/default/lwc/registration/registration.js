import { LightningElement, track } from 'lwc';
// Abhik Code
import saveCandidate from '@salesforce/apex/RegisterCandidates.saveCandidate';
import saveCandidateProfile from '@salesforce/apex/RegisterCandidates.saveCandidateProfile';
import verifyOtp from '@salesforce/apex/RegisterCandidates.verifyOtp';
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

//Abhik Code
export default class Registration extends NavigationMixin(LightningElement) {
    registrationLeftImage = ImageSidebar;
    googleImage = Google;
    nameIcon = Name;
    emailIcon = Email;
    mobileIcon = Mobile;
    passwordIcon = password;
    ConfirmPasswordIcon = ConfirmPassword;
    //new code
    
    @track fullName;
    @track email;
    @track password;
    @track mobileNumber;
    @track confirmPassword;
    @track error;
    @track newCandidateId;

    //for otp verification by Ibrar
    showOtp = false;

    @track isPopupVisible = false;
    @track otp = '';


    showPopup() {
        this.isPopupVisible = true;
    }
    @track entrCode = '';

    closePopup() {
        this.isPopupVisible = false;
    }
    // showPopup(){
    //     this.showOtp = true;
    //     this.isPopupVisible = true;
    // }
// Abhik Code
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
        if (this.password !== this.confirmPassword) {
            this.error = 'Passwords do not match';
            return;
        } else {
            saveCandidate({
                fullName: this.fullName,
                email: this.email,
                mobileNumber: this.mobileNumber
            })
            .then(result => {
                console.log(result);
                if (result == 'exist') {
                    console.log(result);
                    const event = new ShowToastEvent({
                        title: 'Failed!',
                        message: 'Email ' + this.email + ' is already registered!',
                        variant: 'error',
                    });
                    this.dispatchEvent(event);

                    this.error = 'Email ' + this.email + ' is already registered! Please use "Forgot Password" or contact admin.';

                    console.log(this.error);

                } else {
                    //this.showOtp = true;
                    this.newCandidateId = result;
                    console.log(result);

                    this.showPopup();
                    //this.isPopupVisible = true;


                    const event = new ShowToastEvent({
                        title: 'Success!',
                        message: 'Registration successful. Please verify OTP sent to your email.',
                        variant: 'success',
                    });
                    this.dispatchEvent(event);
                    this.showPopup();
                }
            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Failed!',
                    message: 'Something went wrong!',
                    variant: 'error',
                });
                this.dispatchEvent(event);

                this.error = error.body.message;
                console.log(error);
                console.error('Error saving candidate:', this.error);
            });
        }
    }


//TO VERIFY WITH OTP
    handleCodeChange(event) {
        this.entrCode = event.target.value.toString();
    }

    i = 0;
    submitOtp() {
        verifyOtp({otp: this.entrCode, emailId: this.email })
            .then(result=>{
                if(result == this.entrCode){
                    
                    saveCandidateProfile({
                        fullName: this.fullName,
                        email: this.email,
                        mobileNumber: this.mobileNumber,
                        canId: this.newCandidateId,
                        password: this.password
                    })
                    .then( result=>{
                        if(result){
                            const event = new ShowToastEvent({
                                title: 'Success!',
                                message: 'Registration successful.',
                                variant: 'success',
                            });
                            this.dispatchEvent(event);
                            
                            this[NavigationMixin.Navigate]({
                                type: 'standard__namedPage',
                                attributes: {
                                    pageName: 'home',
                                },
                            });

                            this.closePopup();
                            //this.showOtp = false;
                            console.log('Profile created succefully');
                        }else{
                            const event = new ShowToastEvent({
                                title: 'Failed!',
                                message: 'Something Went Wrong!',
                                variant: 'error',
                            });
                            this.dispatchEvent(event);
                            this.error='Something went wrong while Registration! Try Again';
                        }
                        
                    })
                    .catch( error =>{
                        const event = new ShowToastEvent({
                            title: 'Failed!',
                            message: 'Something Went Wrong!',
                            variant: 'error',
                        });
                        this.dispatchEvent(event);
                        this.error = 'Something went wrong! While registration.';
                        console.log(error);
                    })

                }else{
                    
                    for(i = 0; i<2; i++){
                        this.showPopup();
                    }
                    
                    const event = new ShowToastEvent({
                        title: 'Failed!',
                        message: 'Incorrect Verification Code! Try Again.',
                        variant: 'error',
                    });
                    this.dispatchEvent(event);
                    this.error='Incorrect Verificaton Code! Try Again.';

                }

            })
            .catch(error => {
                console.log('Error occured: '+ error);
            });

        console.log('Submitted OTP:', this.entrCode);
        this.closePopup();
    }

    testing(){
        this.showOtp = true;
    }


    LoginRedirect() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home',
            },
        });
      }
}









// new css design