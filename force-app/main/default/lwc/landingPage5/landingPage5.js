import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { loadStyle } from 'lightning/platformResourceLoader';


// Aniket import 

import instagram from '@salesforce/resourceUrl/instagramiconHome';
import facebook from '@salesforce/resourceUrl/facebookicon';
import github from '@salesforce/resourceUrl/Githubicon';
import linkedin from '@salesforce/resourceUrl/linkedinHomeicon';
import phone from '@salesforce/resourceUrl/phoneHomeicon';
import address from '@salesforce/resourceUrl/AddressHomeicon';
import openinghour from '@salesforce/resourceUrl/openingHouricon';
import emails from '@salesforce/resourceUrl/emailHomecon';
import twitters from '@salesforce/resourceUrl/twitterIconhome';










// //IMPORTS FOR REGISTRATION
// import saveCandidate from '@salesforce/apex/RegisterCandidates.saveCandidate';
// import saveCandidateProfile from '@salesforce/apex/RegisterCandidates.saveCandidateProfile';
// import verifyOtp from '@salesforce/apex/RegisterCandidates.verifyOtp';

import saveCandidate from '@salesforce/apex/NewRegistration.saveCandidate';
import saveCandidateProfile from '@salesforce/apex/NewRegistration.saveCandidateProfile';
import verifyOtp from '@salesforce/apex/NewRegistration.verifyOtp';

import ImageSidebar from '@salesforce/resourceUrl/ImageSidebar';
import ContactMessageHomePage from '@salesforce/apex/Contact.ContactMessageHomePage';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { RecordFieldDataType } from 'lightning/uiRecordApi';

import Google from '@salesforce/resourceUrl/Google';
import Name from '@salesforce/resourceUrl/Name';
import Email from '@salesforce/resourceUrl/Email';
import Mobile from '@salesforce/resourceUrl/Mobile';
import password from '@salesforce/resourceUrl/password';
import ConfirmPassword from '@salesforce/resourceUrl/ConfirmPassword';
import awesome from '@salesforce/resourceUrl/FontAwesome';

export default class StartAnimation extends NavigationMixin(LightningElement) {
    @track fadeClass = 'fade-in';
    @track appCardClass = 'app-card';
    imageUrl = 'https://imgur.com/a/C4aMRvG';
    gridStyle = 'background-color: white;';

    //VARIABLES FOR REGISTRATION PAGE
    registrationLeftImage = ImageSidebar;
    googleImage = Google;
    nameIcon = Name;
    emailIcon = Email;
    mobileIcon = Mobile;
    passwordIcon = password;
    ConfirmPasswordIcon = ConfirmPassword;
    //new code
    showRegistrationPage = false;





    insta = instagram;
    face = facebook;
    git = github;
    link = linkedin;
    twitt = twitters;
    emailiconhome = emails;
    address = address;
    phone = phone;
    openinghour = openinghour;
    










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
    @track entrCode = '';

    showPopup() {
        this.isPopupVisible = true;
    }

    closePopup() {
        this.isPopupVisible = false;
    }

    //FUNCTION FOR LANDING PAGE
    connectedCallback() {
        setTimeout(() => {
            this.fadeClass = 'fade-out';
            setTimeout(() => {
                this.appCardClass = 'app-card app-card-visible';
            }, 2000);
        }, 2000);
    }




    //for login page button

    openAbout() {
        const aboutSection = this.template.querySelector('.about-section');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }

    openContact() {
        const contactUsSection = this.template.querySelector('.contactUs');
        contactUsSection.scrollIntoView({ behavior: 'smooth' });
    }


    navigateToLogin() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home',
            },
        });
    }
    navigateToHome() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: '/home',
            },
        });
    }

    navigateToTraining() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: '/training',
            },
        });
    }

    navigateToAbout() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: '/aboutus',
            },
        });
    }

    navigateToFaq() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: '/faqs',
            },
        });
    }

    openHome() {
        this.showRegistrationPage = false;
    }

    navigateToRegister() {

        this.showRegistrationPage = true;
        // this[NavigationMixin.Navigate]({
        //     type: "standard__navItemPage",
        //     attributes: {
        //         apiName: 'Registration',
        //     },
        // });
    }




    //FUNCTIONS FOR REGISTRATION PAGE

    showPopup() {
        this.isPopupVisible = true;
    }

    closePopup() {
        this.isPopupVisible = false;
    }

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
        // Validate form inputs
        if (!this.fullName || !this.email || !this.mobileNumber || !this.password || !this.confirmPassword) {
            this.error = 'All fields are required.';
            this.updateError();
            return;
        }

        if (this.mobileNumber.length !== 10 || !/^\d{10}$/.test(this.mobileNumber)) {
            this.error = 'Invalid mobile number. Please enter a 10-digit number.';
            this.updateError();
            return;
        }

        if (this.password !== this.confirmPassword) {
            this.error = 'Passwords do not match.';
            this.updateError();
            return;
        }

        // Clear any previous errors
        this.error = '';
        this.updateError();

        saveCandidate({
            fullName: this.fullName,
            email: this.email,
            mobileNumber: this.mobileNumber,
            password: this.password
        })
            .then(result => {
                if (result === 'exist') {
                    const event = new ShowToastEvent({
                        title: 'Failed!',
                        message: `Email ${this.email} is already registered!`,
                        variant: 'error',
                    });
                    this.dispatchEvent(event);

                    this.error = `Email ${this.email} is already registered! Please try "Forgot Password" or contact admin.`;
                    this.updateError();
                } else {
                    this.newCandidateId = result;
                    this.showPopup();

                    const event = new ShowToastEvent({
                        title: 'Success!',
                        message: 'Registration successful. Please verify OTP sent to your email.',
                        variant: 'success',
                    });
                    this.dispatchEvent(event);
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
                this.updateError();
                console.error('Error saving candidate:', error);
            });
    }


    handleCodeChange(event) {
        this.entrCode = event.target.value.toString();
    }


    submitOtp() {
        verifyOtp({ otp: this.entrCode, emailId: this.email })
            .then(result => {
                if (result === this.entrCode) {
                    saveCandidateProfile({
                        fullName: this.fullName,
                        email: this.email,
                        mobileNumber: this.mobileNumber,
                        canId: this.newCandidateId,
                        password: this.password
                    })
                        .then(result => {
                            if (result) {
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
                                console.log('Profile created successfully');
                            } else {
                                const event = new ShowToastEvent({
                                    title: 'Failed!',
                                    message: 'Something Went Wrong!',
                                    variant: 'error',
                                });
                                this.dispatchEvent(event);
                                this.error = 'Something went wrong while Registration! Try Again';
                                this.updateError();
                            }
                        })
                        .catch(error => {
                            const event = new ShowToastEvent({
                                title: 'Failed!',
                                message: 'Something went wrong!',
                                variant: 'error',
                            });
                            this.dispatchEvent(event);
                            this.error = 'Something went wrong while Registration! Try Again';
                            this.updateError();
                            console.log(error);
                        });
                } else {
                    const event = new ShowToastEvent({
                        title: 'Failed!',
                        message: 'Incorrect Verification Code! Try Again.',
                        variant: 'error',
                    });
                    this.dispatchEvent(event);
                    this.error = 'Incorrect Verification Code! Try Again.';
                    this.updateError();
                }
            })
            .catch(error => {
                console.log('Error occurred: ' + error);
                const event = new ShowToastEvent({
                    title: 'Failed!',
                    message: 'Error verifying OTP. Please try again.',
                    variant: 'error',
                });
                this.dispatchEvent(event);
                this.error = 'Incorrect Verification Code! Try Again.';
                this.updateError();
            });

        console.log('Submitted OTP:', this.entrCode);
        this.showPopup();
    }

    updateError() {
        const errorElement = this.querySelector('.slds-m-top_medium');
        if (errorElement) {
            errorElement.textContent = this.error;
        }
    }


    LoginRedirect() {
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'home',
            },
        });
    }

    //utsav's code for updating contact details
    contactName;
    contactCity;
    contactEmail;
    contactPhone;
    contactMessage;


    getFullName(event) {
        this.contactName = event.target.value;
        console.log(this.contactName);
    }
    getCity(event) {
        this.contactCity = event.target.value;
        console.log(this.contactCity);

    }
    getEmail(event) {
        this.contactEmail = event.target.value;
        console.log(this.contactEmail);

    }
    getPhone(event) {
        this.contactPhone = event.target.value;
        console.log(this.contactPhone);
    }
    getMessage(event) {
        this.contactMessage = event.target.value;
        console.log(this.contactMessage);
    }

    name;
    City;
    Email;
    Phone;
    Message;


    SendMessage() {
        ContactMessageHomePage({
            name: this.contactName,
            City: this.contactCity,
            Email: this.contactEmail,
            Phone: this.contactPhone,
            Message: this.contactMessage,
        })
        .then(res=>{
            const eventSuccess = new ShowToastEvent({
                title: 'Success!',
                message: 'Data Saved!',
                variant: 'success',
            });
            this.dispatchEvent(eventSuccess);
            
        })
        .catch(err=>{
            console.log(err);

            const eventFail = new ShowToastEvent({
                title: 'Failed!',
                message: 'Something Went Wrong!',
                variant: 'error',
            });

            this.dispatchEvent(eventFail);
        })

    }


}