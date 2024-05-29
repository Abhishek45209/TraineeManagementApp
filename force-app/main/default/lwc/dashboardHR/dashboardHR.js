import { LightningElement, wire, track, api } from 'lwc';

//Abhik Code for import apex class(SetDataForHr)for internship purpose in Hr Dashboard.
import createInternship from '@salesforce/apex/SetDataForHr.createInternship';
import updateInternship from '@salesforce/apex/SetDataForHr.updateInternship';
import getInternshipListings from '@salesforce/apex/GetDataForHR.getInternshipListings';
import deleteInternship from '@salesforce/apex/SetDataForHr.deleteInternship';


import Namea from '@salesforce/resourceUrl/Name';
import Dashboardimage from '@salesforce/resourceUrl/ImageSidebar';
import previewIcon from '@salesforce/resourceUrl/PreviewIcon';

//ABHISHEK IMPORT
import getFeedbacks from '@salesforce/apex/FeedbackDisplay.getFeedbacks';
import getFeedback from '@salesforce/apex/GetDataForHR.getFeedback'
import getInquiries from '@salesforce/apex/GetDataForHR.getInquiries'

//IBRAR FOR DATA IN APPLICATION MANAGEMENT
import getInternshipApplications from '@salesforce/apex/GetDataForHR.getInternshipApplications';
import updateApplicationStatus from '@salesforce/apex/SetDataForHr.updateApplicationStatus';
import getApplicationDetails from '@salesforce/apex/GetDataForHR.getApplicationDetails';
import getIntrnshipApplicationDetails from '@salesforce/apex/GetDataForHR.getIntrnshipApplicationDetails';
import getCandidateApplicationDetails from '@salesforce/apex/GetDataForHR.getCandidateApplicationDetails';
import getReadyInternship from '@salesforce/apex/GetDataForHR.getReadyInternship';
import getInternCandidateDetails from '@salesforce/apex/GetDataForHR.getInternCandidateDetails';

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
    internshipName;
    internshipDetail;
    internshipDuration;
    internshipLocation;
    internshipExperience;
    internshipDeadline;
    internshipStipend;

    //VARIABLE FOR INTERNSHIP APPLICATION
    internshipApplications;

    @track internshipApStatus = 'Applied';
    @track applicationId;
    @track candidateId;
    @track internshipId;
    @track appCanData;
    @track appIntrData;
    @track appAllData;
    @track CandidateApplicationDetails = false;
    @track showDetails = false;
    @track updateInternshipApplicationStatus = 'Applied';
    @api internshipName;
    @api internshipDetail;
    @api internshipDuration;
    @api internshipLocation;
    @api internshipExperience;
    @api internshipDeadline;
    @api internshipStipend;

    showInternProfilePop = false;
    @api internshipApplications;
    //VARIABLE FOR INTERN MANAGEMENT
    @api holdAnyRecord;
    showManageInternTemp = false;



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
    internshipId;
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


    //ABHIK'S CODE TO EDIT AND DELETE INTERNSHIP 
    //START
    @track internshipListings = [];
    @track showInternshipsListings = true;
    @track isEditMode = false;
    @track currentEditInternshipId = null;

    // Variable for storing values
    internshipName;
    internshipDetail;
    internshipDuration;
    internshipLocation;
    internshipExperience;
    internshipDeadline;
    internshipStipend;


    connectedCallback() {
        this.fetchInternshipListings();
    }

    fetchInternshipListings() {
        getInternshipListings()
            .then(res => {
                console.log(res);

                this.internshipListings = res;

                this.showInternshipsListings = true;
            })
            .catch(err => {
                const event = new ShowToastEvent({
                    title: 'Failed!',
                    message: 'Something is Wrong!.',
                    variant: 'error',
                });
                this.dispatchEvent(event);

                console.error('Query Error ====>>' + error);
            })
    }

    // Handling form submission for creating a new internship
    handleSubmit() {
        if (this.isEditMode) {
            this.updateInternship();
        } else {
            this.createInternship();
        }
    }

    createInternship() {
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
                this.fetchInternshipListings();
                this.clearForm();
            })
            .catch(error => {
                this.showToast('Error', 'Error creating internship', 'error');
                console.error(error);
            });
    }

    updateInternship() {
        updateInternship({
            id: this.currentEditInternshipId,
            name: this.internshipName,
            details: this.internshipDetail,
            duration: this.internshipDuration,
            deadline: this.internshipDeadline,
            location: this.internshipLocation,
            stipend: this.internshipStipend,
            experience: this.internshipExperience
        })
            .then(result => {
                this.showToast('Success', 'Internship updated successfully', 'success');
                this.fetchInternshipListings();
                this.clearForm();
            })
            .catch(error => {
                this.showToast('Error', 'Error updating internship', 'error');
                console.error(error);
            });
    }

    handleDelete(event) {
        const internshipId = event.target.dataset.id;
        deleteInternship({ id: internshipId })
            .then(result => {
                this.showToast('Success', 'Internship deleted successfully', 'success');
                this.fetchInternshipListings();
            })
            .catch(error => {
                this.showToast('Error', 'Error deleting internship', 'error');
                console.error(error);
            });
    }

    handleEdit(event) {
        const internship = this.internshipListings.find(item => item.Id === event.target.dataset.id);
        this.currentEditInternshipId = internship.Id;
        this.internshipName = internship.Name;
        this.internshipDetail = internship.Details;
        this.internshipDuration = internship.Duration__c;
        this.internshipLocation = internship.Location__c;
        this.internshipExperience = internship.Experience_Level__c;
        this.internshipDeadline = internship.Deadline__c;
        this.internshipStipend = internship.Stipend__c;
        this.isEditMode = true;
    }


    clearForm() {
        this.internshipName;
        this.internshipDetail;
        this.internshipDuration;
        this.internshipLocation;
        this.internshipExperience;
        this.internshipDeadline;
        this.internshipStipend;
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }

    //END ABHIK'S CODE


    //IBRAR ADD FILTER BUTTONS IN APPLICATION MANAGEMENT
    handleFilter(event) {
        this.internshipApStatus = event.target.dataset.status;
        console.log('Selected Status:', this.internshipApStatus);
        this.updateButtonClasses();

        getInternshipApplications({ status: this.internshipApStatus })
            .then(result => {
                if (result) {
                    this.internshipApplications = result;
                } else {
                    this.error = 'No data Found';
                }
                this.showApplcationManagement = true;
            })
            .catch(error => {
                console.log(error);
                console.log('Error in getting application');
            });
    }

    updateButtonClasses() {
        const buttons = this.template.querySelectorAll('button[data-status]');
        buttons.forEach(button => {
            if (button.dataset.status === this.internshipApStatus) {
                button.classList.add('activeap');
            } else {
                button.classList.remove('activeap');
            }
        });
    }

    renderedCallback() {
        this.updateButtonClasses();
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
    //Abhik code for deleteing internship
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
    // Handling deleting an internship
    handleDelete() {
        this.internshipId = item.Id;
        console.log(this.internshipId);
        deleteInternship({ internshipId: this.internshipId })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Internship deleted',
                        variant: 'success'
                    })
                );
                console.log(this.internshipId);

                this.clearFields();
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting internship',
                        message: error.body.message,
                        variant: 'error'
                    })
                );
            });

    }
    clearFields() {
        this.internshipId;
        this.internshipName;
        this.duration;
        this.location;
        this.createdOn;
        this.deadline;
        this.status;
        this.detail;
        this.stipend;

    }

    // Handling updating an internship
    handleEdit() {
        this.internshipId = item.Id;
        const updatedData = {
            internshipId: this.internshipId,
            name: this.internshipName,
            details: this.internshipDetail,
            duration: this.internshipDuration,
            deadline: this.internshipDeadline,
            location: this.internshipLocation,
            stipend: this.internshipStipend,
            experience: this.internshipExperience
        };

        console.log('Internship ID:', this.internshipId);
        console.log('Updated Data:', updatedData);

        editInternship(updatedData)
            .then(() => {
                this.showToast('Success', 'Internship updated successfully', 'success');
            })
            .catch(error => {
                this.showToast('Error', `Error updating internship: ${error.body.message}`, 'error');
                console.error('Error updating internship:', error);
            });

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

    NewNotes = false;
    // functions to handle the different templates showing up on a button click on admin panel

    feedBackDetails;
    inquiriesDetails;

    handleShowDashboard() {
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showProjectManagement = false;;
        this.showNotificationsAndCommunicationManagement = false;
        this.showManageInternTemp = false;

        getFeedback()
            .then(res => {
                this.feedBackDetails = res;
                console.log(this.feedBackDetails);
                this.showDashboard = true;

            })
            .error(err => {
                const event = new ShowToastEvent({
                    title: 'Failed!',
                    message: 'Something is Wrong!.',
                    variant: 'error',
                });
                this.dispatchEvent(event);

                console.error('Query Error ====>>' + err);
            });

        getInquiries()
            .then(res => {
                this.inquiriesDetails = res;
                console.log(this.inquiriesDetails);
                this.showDashboard = true;

            })
            .error(err => {
                const event = new ShowToastEvent({
                    title: 'Failed!',
                    message: 'Something is Wrong!.',
                    variant: 'error',
                });
                this.dispatchEvent(event);

                console.error('Query Error ====>>' + err);
            })

    }

    internshipListings;

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
        this.showManageInternTemp = false;



        //Utsav's code for getting internship details from Internship__c

        getInternshipListings()
            .then(res => {
                console.log(res);

                this.internshipListings = res;

                this.showInternshipsListings = true;
            })
            .catch(err => {
                const event = new ShowToastEvent({
                    title: 'Failed!',
                    message: 'Something is Wrong!.',
                    variant: 'error',
                });
                this.dispatchEvent(event);

                console.error('Query Error ====>>' + error);
            })
    }

    handleShowApplicationManagement() {
        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showProjectManagement = false;
        this.showNotificationsAndCommunicationManagement = false;
        this.showManageInternTemp = false;

        getInternshipApplications({ status: this.updateInternshipApplicationStatus })
            .then(result => {
                if (result) {
                    this.internshipApplications = result;
                } else {
                    this.error = 'No data Found';
                }
                this.showApplcationManagement = true;
            })
            .catch(error => {
                console.log(error);
                console.log('Error in getting application');
            });
    }

    handleShowInternManagement() {
        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showApplcationManagement = false;
        this.showCandidateManagement = false;
        this.showProjectManagement = false;
        this.showNotificationsAndCommunicationManagement = false;
        this.showManageInternTemp = false;


        this.showInternManagement = true;
        getReadyInternship()
            .then(result => {
                if (result) {
                    this.holdAnyRecord = result;
                    console.log('Intern Management', result);
                } else {
                    console.error('No data found - internship');
                }
            })
            .catch(error => {
                console.error('Error fetching candidate details:', error);
            });
    }

    handleShowProjectsManagement() {
        this.showProjectManagement = true;
        this.dashboardImage = false;
        this.showDashboard = false;
        this.showInternshipsListings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showNotificationsAndCommunicationManagement = false;
        this.showManageInternTemp = false;

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
        this.showManageInternTemp = false;


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
        this.showManageInternTemp = false;
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
        this.showManageInternTemp = false;
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
        this.showManageInternTemp = false;
    }

    // end utsav code





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

    newNotes(){
        this.NewNotes = true;
    }
    unshowNewNotes(){
        this.NewNotes = false;
    }

    viewCandidateApplicationDetails(event) {
        const button = event.target;
        this.applicationId = button.dataset.id;
        this.candidateId = button.dataset.canid;
        this.internshipId = button.dataset.intrid;

        this.CandidateApplicationDetails = true;
        this.showDetails = true;

        getCandidateApplicationDetails({ candidateId: this.candidateId })
            .then(result => {
                this.appCanData = result;
                console.log('Candidate Data:', this.appCanData);
            })
            .catch(error => {
                console.error('Error fetching candidate details:', error);
            });

        getIntrnshipApplicationDetails({ internshipId: this.internshipId })
            .then(result => {
                this.appIntrData = result;
                console.log('Internship Data:', this.appIntrData);
            })
            .catch(error => {
                console.error('Error fetching internship details:', error);
            });

        getApplicationDetails({ applicationId: this.applicationId })
            .then(result => {
                this.appAllData = result;
                console.log('Application Data:', this.appAllData);
            })
            .catch(error => {
                console.error('Error fetching application details:', error);
            });
    }

    viewProfileInternManagement(event) {
        const button = event.target;
        this.candidateId = button.dataset.canid;

        this.showInternProfilePop = true;
        this.showDetails = true;

        getCandidateApplicationDetails({ candidateId: this.candidateId })
            .then(result => {
                this.appCanData = result;
                console.log('Candidate Data:', this.appCanData);
            })
            .catch(error => {
                console.error('Error fetching candidate details:', error);
            });

    }



    showInternManagemePopup(event) {
        this.internshipId = event.target.dataset.id;

        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        this.showCandidateManagement = false;
        this.showProjectManagement = false;
        this.showNotificationsAndCommunicationManagement = false;

        this.showManageInternTemp = true;


        getInternCandidateDetails({ internshipId: this.internshipId })
            .then(result => {
                this.appCanData = result;
                console.log('Candidate Data:', this.appCanData);
            })
            .catch(error => {
                console.error('Error fetching candidate details:', error);
            });

        //GETTING INTERNSHIP DETAILS OF INTERN MANAGEMENT (ONGOING INTERNSHIP)
        getIntrnshipApplicationDetails({ internshipId: this.internshipId })
            .then(result => {
                this.appIntrData = result;
                console.log('Internship Data:', this.appIntrData);
            })
            .catch(error => {
                console.error('Error fetching internship details:', error);
            });

        // getApplicationDetails({ applicationId: this.applicationId })
        //     .then(result => {
        //         this.appAllData = result;
        //         console.log('Application Data:', this.appAllData);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching application details:', error);
        //     });
    }



    closeCandidateApplicationDetails() {
        this.CandidateApplicationDetails = false;
        this.showDetails = false;
    }

    closeInternManagemePopup() {
        this.showInternProfilePop = false;
    }

    handleSelectClick(event) {
        const button = event.target;
        this.applicationId = button.dataset.id;
        this.updateInternshipApplicationStatus = button.dataset.status;
        updateApplicationStatus({
            applicationId: this.applicationId,
            status: this.updateInternshipApplicationStatus
        })
            .then(res => {
                this.showToast('Success', 'Status Updated Successfully', 'success');

                this.closeCandidateApplicationDetails();
            })
            .catch(error => {
                console.log('Error occured:', error);
            });

    }
    handleRejectClick(event) {
        const button = event.target;
        this.applicationId = button.dataset.id;
        this.updateInternshipApplicationStatus = button.dataset.status;
        updateApplicationStatus({
            applicationId: this.applicationId,
            status: this.updateInternshipApplicationStatus
        })
            .then(res => {

                this.showToast('Success', 'Status Updated Successfully', 'success');

                this.closeCandidateApplicationDetails();
            })
            .catch(error => {
                console.log('Error occured:', error);
            });
    }



    closeCandidateApplicationDetails() {
        this.CandidateApplicationDetails = false;
        this.showDetails = false;
    }

    @track date;
    handleDateChange(event) {
        this.date = event.target.value;
    }



    projectname = '';
    duration = '';
    start = '';
    End = '';
    Navbar = '';
    projectnames = '';
    durations = '';
    internname = '';
    starts = '';
    Ends = '';
    Navbars = '';
    teamleader = '';
    role = '';

    handlerole(event) {
        this.role = event.target.value;
    }

    handleprojectname(event) {
        this.projectname = event.target.value;
    }
    handleduration(event) {
        this.duration = event.target.value;
    }
    handlestart(event) {
        this.start = event.target.value;
    }
    handleEnd(event) {
        this.End = event.target.value;
    }
    handleNavbarChange(event) {
        this.Navbar = event.target.value;
    }
    handleprojectnames(event) {
        this.projectnames = event.target.value;
    }
    handledurations(event) {
        this.durations = event.target.value;
    }
    handleinternname(event) {
        this.internname = event.target.value;
    }
    handlestarts(event) {
        this.starts = event.target.value;
    }
    handleEnds(event) {
        this.Ends = event.target.value;
    }
    handleNavbarsChange(event) {
        this.Navbars = event.target.value;
    }
    handleteamleader(event) {
        this.teamleader = event.target.value;
    }



    @track createprojectsection = false;
    @track assignprojectsection = false;
    @track completesection = true;
    createproject() {
        this.createprojectsection = true;
        this.assignprojectsection = false;
    }

    assignproject() {
        this.assignprojectsection = true;
        this.createprojectsection = false;
    }
    crox() {
        this.createprojectsection = false;
        this.assignprojectsection = false;
        this.completesection = true;
    }
    takeprojectvalue() {
        this.completesection = false;
    }



}