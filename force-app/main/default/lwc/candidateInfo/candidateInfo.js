// inputFormData.js
import { LightningElement } from 'lwc';

export default class InputFormData extends LightningElement {
    fullName = '';
    email = '';
    phoneNumber = '';
    address = '';
    linkedin = '';
    jobTitle = '';
    currentCompany = '';
    workExperience = '';
    industryExperience = '';
    salesExperience = '';
    educationBackground = '';

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

    handleJobTitleChange(event) {
        this.jobTitle = event.target.value;
    }

    handleCurrentCompanyChange(event) {
        this.currentCompany = event.target.value;
    }

    handleWorkExperienceChange(event) {
        this.workExperience = event.target.value;
    }

    handleIndustryExperienceChange(event) {
        this.industryExperience = event.target.value;
    }

    handleSalesExperienceChange(event) {
        this.salesExperience = event.target.value;
    }

    handleEducationBackgroundChange(event) {
        this.educationBackground = event.target.value;
    }

    handleSubmit() {
        // Log or process the input values as needed
        console.log('Full Name: ', this.fullName);
        console.log('Email Address: ', this.email);
        console.log('Phone Number: ', this.phoneNumber);
        console.log('Address: ', this.address);
        console.log('LinkedIn Profile: ', this.linkedin);
        console.log('Current Job Title: ', this.jobTitle);
        console.log('Current Company: ', this.currentCompany);
        console.log('Work Experience (Years): ', this.workExperience);
        console.log('Industry Experience: ', this.industryExperience);
        console.log('Sales Experience: ', this.salesExperience);
        console.log('Educational Background: ', this.educationBackground);

        // Emit a custom event to send the data to the parent component
        const event = new CustomEvent('submitdata', {
            detail: {
                fullName: this.fullName,
                email: this.email,
                phoneNumber: this.phoneNumber,
                address: this.address,
                linkedin: this.linkedin,
                jobTitle: this.jobTitle,
                currentCompany: this.currentCompany,
                workExperience: this.workExperience,
                industryExperience: this.industryExperience,
                salesExperience: this.salesExperience,
                educationBackground: this.educationBackground
            }
        });
        this.dispatchEvent(event);
    }
}