import { LightningElement, wire, track } from 'lwc';

//Abhik Code for import apex class(SetDataForHr)for internship purpose in Hr Dashboard.
import createInternship from '@salesforce/apex/SetDataForHr.createInternship';
import updateInternship from '@salesforce/apex/SetDataForHr.updateInternship';
import deleteInternship from '@salesforce/apex/SetDataForHr.deleteInternship';


import Namea from '@salesforce/resourceUrl/Name';
import Dashboardimage from '@salesforce/resourceUrl/ImageSidebar';
import previewIcon from '@salesforce/resourceUrl/PreviewIcon';

//ABHISHEK IMPORT
import getFeedbacks from '@salesforce/apex/FeedbackDisplay.getFeedbacks';


import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCandidateRecords from '@salesforce/apex/GetDataForHR.getCandidateRecords';
export default class DashboardHR extends LightningElement {

    //utsav code for creating new internship
    @track selectedLocationOption = ''; // 
    locationOptions = [
        { label: 'Remote', value: 'Remote' },
        { label: 'Office', value: 'Office' },

    ];
    @track selectedExperienceOption = ''; // 
    experienceOptions = [
        { label: 'Fresher', value: 'Fresher' },
        { label: 'Experienced', value: 'Experienced' },

    ];
    @track selectedStatusOption = '';  
     statusOptions = [
         { label: 'Published', value: 'Published' },
        { label: 'Unpublished', value: 'Unpublished' },

     ];



    //variable name for storing values
    internshipName = '';
    internshipDetail = ''
    internshipDuration = '';
    internshipLocation = '';
    internshipExperience = '';
    internshipDeadline = '';
    internshipStipend = '';
    // 
    internshipNameChange(event) {
        this.internshipName = event.target.value;
        console.log(this.internshipName);
    }
    internshipDetailChange(event) {
        this.internshipDetail = event.target.value;
        console.log(this.internshipDetail);
    }
    internshipDurationChange(event) {
        this.internshipDuration = event.target.value;
        console.log(this.internshipDuration);
    }
    internshipLocationChange(event) {
        this.internshipLocation = event.target.value;
        console.log(this.internshipLocation);
    }
    internshipExperienceChange(event) {
        this.internshipExperience = event.target.value;
        console.log(this.internshipExperience);
    }
    internshipDeadlineChange(event) {
        this.internshipDeadline = event.target.value;
        console.log(this.internshipDeadline);
    }
    internshipStipendChange(event) {
        this.internshipStipend = event.target.value;
        console.log(this.internshipStipend);
    }
    

    //Abhik Code
    //major changes made by utsav
    showInternshipsListings = true;
    name;
    duration;
    createDate;
    deadline;
    stipend;
    details;
    location;
    experience;

    icon = Namea;
    dashboard = Dashboardimage;
    preview = previewIcon;
    record;

// abhik code for button click
handleButtonClick(event) {
    const action = event.target.innerText.toLowerCase();
    if (action === 'createNew') {
        this.createInternship();
    } else if (action === 'edit') {
        this.editInternship(internshipId);
    } else if (action === 'delete') {
        this.deleteInternship();
    }
}

// Handling form submission for creating a new internship
handleSubmit() {
    createInternship({
        name: this.internshipName,
        details: this.internshipDetail,
        duration: this.internshipDuration,
        deadline: this.internshipDeadline,
        location: this.internshipLocation,
        stipend: this.internshipStipend,
        experience: this.internshipExperience
    })
    .then(result => {
        this.showToast('Success', 'Internship created successfully', 'success');
        this.unShowNewInternship();
    })
    .catch(error => {
        this.showToast('Error', 'Error creating internship', 'error');
        console.error(error);
    });
}

// Handling updating an internship
handleEditSubmit() {
    updateInternship({
        internshipId: this.recordId,
        internshipName: this.internshipName,
        internshipDetails: this.internshipDetails
    })
    .then(result => {
        this.showToast('Success', 'Internship updated successfully', 'success');
        this.resetForm();
        this.isEditMode = false; // Exit edit mode after successful update
    })
    .catch(error => {
        this.showToast('Error', 'Error updating internship', 'error');
        console.error(error);
    });
}

// Handling deleting an internship
deleteInternship() {
    deleteInternship({
        name: this.internshipName
    })
    .then(result => {
        this.showToast('Success', 'Internship deleted successfully', 'success');
        this.resetForm();
    })
    .catch(error => {
        this.showToast('Error', 'Error deleting internship', 'error');
        console.error(error);
    });
}
    resetForm() {
        this.internshipName = '';
        this.internshipDetail = '';
        this.internshipDuration = '';
        this.internshipLocation = '';
        this.internshipExperience = '';
        this.internshipDeadline = '';
        this.internshipStipend = '';
    }
   

    //utsav code

    // template variable assignment
    dashboardImage = true;
    showDashboard = false;
    showInternshipsListings = false;
    showApplcationManagement = false;
    showInternManagement = false;
    showCandidateManagement = false;
    showProjectManagement = false;
    showNotificationsAndCommunicationManagement = false;
    NewInternship = false;
    CandidateApplicationDetails = false;
    showJobPostings = false;


    // functions to handle the different templates showing up on a button click on admin panel

    handleShowDashboard() {
        this.showDashboard = true;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showProjectManagement = false;;
        this.showNotificationsAndCommunicationManagement = false;
    }

    handleShowInternshipListings() {
        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = true;
        this.showJobPostings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showProjectManagement = false;
        this.showNotificationsAndCommunicationManagement = false;
    }

    handleShowApplicationManagement() {
        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showApplcationManagement = true;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showProjectManagement = false;
        this.showNotificationsAndCommunicationManagement = false;
    }

    handleShowInternManagement() {
        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = true;
        this.showCandidateManagement = false;
        this.showProjectManagement = false;
        this.showNotificationsAndCommunicationManagement = false;
    }

    handleShowProjectsManagement()
    {
        this.showProjectManagement = true;
        this.dashboardImage = false;
        this.showDashboard = false;
        this.showInternshipsListings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showNotificationsAndCommunicationManagement = false;

    }
     candidateRecords;
    handleShowCandidateManagement() {
        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        this.showCandidateManagement = true;
        this.showProjectManagement = false;
        this.showNotificationsAndCommunicationManagement = false;

        //end utsav code
        //By Ibrar feching details from LoginCandidate class to show in Manage Candidate of dashboardHR.
        

        getCandidateRecords()
            .then(result => {
                //Handle the result
                console.log('data' + result);
                this.candidateRecords = result;
                this.showCandidateManagement = true;

            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Failed!',
                    message: 'Something is Wrong!.',
                    variant: 'error',
                });
                this.dispatchEvent(event);

                console.error('Query Error ====>>' + error);
            });

    }


    // utsav code 
    handleShowProjectsManagement() {
        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showProjectManagement = true;
        this.showNotificationsAndCommunicationManagement = false;
    }


    handleShowJobPostings() {
        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = true;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showProjectManagement = false;
        this.showNotificationsAndCommunicationManagement = false;
    }

    handleShowNotificationsAndCommunications() {
        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showProjectManagement = false;
        this.showNotificationsAndCommunicationManagement = true;
    }

    // end utsav code

    //Abhik Code for creating Internship


    //ABHISHEK CODE FOR GETTING FEEDBACK 

    @track feedbacks;
    @wire(getFeedbacks)
    wiredFeedbacks({ error, data }) {
        if (data) {
            this.feedbacks = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.feedbacks = undefined;
        }
    }

    newInternship() {
        this.NewInternship = true;
    }

    unShowNewInternship() {
        this.NewInternship = false;
    }

    viewCandidateApplicationDetails() {
        this.CandidateApplicationDetails = true;
    }
    closeCandidateApplicationDetails() {
        this.CandidateApplicationDetails = false;
    }

    @track date;
    handleDateChange(event) {
        this.date = event.target.value;
    }

}