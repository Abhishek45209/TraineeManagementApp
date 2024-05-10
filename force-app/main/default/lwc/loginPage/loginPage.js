// loginPage.js
import { LightningElement,wire } from 'lwc';
import emailIcon from '@salesforce/resourceUrl/EmailIcon';
import passwordIcon from '@salesforce/resourceUrl/PasswordIcon';
import googleIcon from '@salesforce/resourceUrl/GoogleIcon';
import gmailIcon from '@salesforce/resourceUrl/EmailIcon';
import linkedinIcon from '@salesforce/resourceUrl/LinkedinIcon';


import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import validateCandidate from '@salesforce/apex/LoginCandidate.validateCandidate';

//export default class LoginPage extends LightningElement {
export default class LoginPage extends NavigationMixin(LightningElement) {
    emailIcon = emailIcon;
    passwordIcon = passwordIcon;
    googleIcon = googleIcon;
    gmailIcon = gmailIcon;
    linkedinIcon = linkedinIcon;

    //Ibrar Working..
    entrUsr;
    entrPass;
    //record;
    error = '';
    
    
    //Aniket's code
    loginWithGoogle() {
        window.location.href = 'https://www.googli.com/'; // Redirect to Google login URL
    }

    loginWithGmail() {
        window.location.href = 'https://www.gmail.com/'; // Redirect to Gmail login URL
    }

    loginWithLinkedIn() {
        window.location.href = 'https://www.linkedin.com/'; // Redirect to LinkedIn login URL
    }
    //end

    //Ibrar's login
    getEmail(event) {
        this.entrUsr = event.target.value;
    }
    getPassword(event) {
        this.entrPass = event.target.value;
    }
    userLogin() {
        validateCandidate({ username: this.entrUsr, password: this.entrPass })
            .then(result => {
                if (result) {
                    const event = new ShowToastEvent({
                        title: 'Success!',
                        message: 'Login successful.',
                        variant: 'success',
                    });
                    this.dispatchEvent(event);
                    // Navigate to Dashboard
                    this[NavigationMixin.Navigate]({
                        type: 'standard__app',
                        attributes: {
                            pageName: 'Welcome'
                        }
                    });
                } else {
                    const event = new ShowToastEvent({
                        title: 'Failed!',
                        message: 'Invalid username or password.',
                        variant: 'error',
                    });
                    this.dispatchEvent(event);
                }
            })
            .catch(error => {
                // Handle error
                const event = new ShowToastEvent({
                    title: 'Failed!',
                    message: 'Something went wrong! Please try again.',
                    variant: 'error',
                });
                this.dispatchEvent(event);
                console.error('Error:', error);
            });
    }
    
     }