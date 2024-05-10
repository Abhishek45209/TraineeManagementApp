import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export class LandingPage5 extends LightningElement {
    imageUrl = 'https://imgur.com/a/C4aMRvG';
}

export default class NavigationPart extends NavigationMixin(LightningElement) {
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


    // changes made by utsav
    navigateToRegister() {
        this[NavigationMixin.Navigate]({
          type: "standard__navItemPage",
          attributes: {
            apiName: 'Registration',
          },
        });
      }
}