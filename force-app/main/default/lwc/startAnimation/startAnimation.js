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
    

// Aniket Implement

    renderedCallback() {
        const text = "Let's Build Something great Together";
        const typingTextElement = this.template.querySelector(".typing-text");

        if (!typingTextElement) {
            // Element not found, maybe it's not rendered yet, try again later
            return;
        }

        let index = 0;
        let isTyping = true;

        const type = () => {
            if (isTyping) {
                typingTextElement.textContent += text[index];
                index++;
                if (index === text.length) {
                    isTyping = false;
                    setTimeout(type, 1000); // Pause before deleting
                } else {
                    setTimeout(type, 150); // Adjusting typing speed (in milliseconds)
                }
            } else {
                if (typingTextElement.textContent.length > 0) {
                    typingTextElement.textContent = typingTextElement.textContent.slice(0, -1);
                    setTimeout(type, 100); // Adjusting deleting speed (in milliseconds)
                } else {
                    isTyping = true;
                    index = 0;
                    setTimeout(type, 1000); // Pause before typing again
                }
            }
        };

        type();
    }








}