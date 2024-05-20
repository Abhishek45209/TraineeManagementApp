// inputFormData.js
import { LightningElement } from 'lwc';

export default class InputFormData extends LightningElement {
    fullName = '';
    email = '';
    phoneNumber = '';
    address = '';
    linkedin = '';

    handleFullNameChange(event) {
        this.fullName = event.target.value;
    }

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handlePhoneNumberChange(event) {
        this.phoneNumber = event.target.value;
    }

    handleAddressChange(event) {
        this.address = event.target.value;
    }

    handleLinkedInChange(event) {
        this.linkedin = event.target.value;
    }

    handleSubmit() {
        // Here you can process the input values, for example, log them to the console
        console.log('Full Name: ', this.fullName);
        console.log('Email Address: ', this.email);
        console.log('Phone Number: ', this.phoneNumber);
        console.log('Address: ', this.address);
        console.log('LinkedIn Profile: ', this.linkedin);

        // You can also emit a custom event to send the data to the parent component
        const event = new CustomEvent('submitdata', {
            detail: {
                fullName: this.fullName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                address: this.address,
                linkedin: this.linkedin
            }
        });
        this.dispatchEvent(event);
    }
}