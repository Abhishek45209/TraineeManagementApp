import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class StartAnimation extends NavigationMixin(LightningElement) {
    @track fadeClass = 'fade-in';
    @track appCardClass = 'app-card';
    imageUrl = 'https://imgur.com/a/C4aMRvG';
    
    connectedCallback() {
        setTimeout(() => {
            this.fadeClass = 'fade-out';
            setTimeout(() => {
                this.appCardClass = 'app-card app-card-visible';
            }, 2000);
        }, 2000);
    }

    //for login page button
    
    navigateToLogin(){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
              apiName: 'LoginPage',
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

    navigateToRegister() {
        this[NavigationMixin.Navigate]({
            type: "standard__navItemPage",
            attributes: {
                apiName: 'Registration',
            },
        });
    }
    
}