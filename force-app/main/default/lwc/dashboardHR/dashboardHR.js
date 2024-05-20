import { LightningElement,wire, track} from 'lwc';

//Abhik Code for import apex class(SetDataForHr)for internship purpose in Hr Dashboard.
import createInternship from '@salesforce/apex/SetDataForHr.createInternship';
import updateInternship from '@salesforce/apex/SetDataForHr.updateInternship';
import deleteInternship from '@salesforce/apex/SetDataForHr.deleteInternship';


import Name from '@salesforce/resourceUrl/Name';
import Dashboardimage from '@salesforce/resourceUrl/ImageSidebar';
import previewIcon from '@salesforce/resourceUrl/PreviewIcon';

//ABHISHEK IMPORT
import getFeedbacks from '@salesforce/apex/FeedbackDisplay.getFeedbacks';


import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCandidateDetails from '@salesforce/apex/GetDataForHR.getCandidateDetails';
export default class DashboardHR extends LightningElement {
//Abhik Code

    showInternshipsListings = true;
     name = '';
     duration = '';
     createDate = '';
     createdOn = '';
     deadline = '';
     status = '';
     stipend='';
     details ='';
     Location='';

    
    statusOptions = [
        { label: 'Published', value: 'Published' },
        { label: 'Unpublished', value: 'Unpublished' }
    ];
    //static resources
    icon = Name;
    dashboard = Dashboardimage;
    preview = previewIcon;
    record;
//Abhik code for button event
handleInputChange(event) {
    const field = event.target.name;
    if (field) {
        this[field] = event.target.value;
    }
}

handleButtonClick(event) {
    const action = event.target.dataset.id;
    if (action === 'createNew') {
        this.createInternship();
    } else if (action === 'edit') {
        this.updateInternship();
    } else if (action === 'delete') {
        this.deleteInternship();
    }
}

   //Abhik Code for creating Internship
createInternship() {
    createInternship({
        name: this.internshipName,
        duration: this.duration,
        createdOn: this.createdOn,
        deadline: this.deadline,
        status: this.status
    })
    .then(result => {
        this.showToast('Success', 'Internship created successfully', 'success');
        this.resetForm();
    })
    .catch(error => {
        this.showToast('Error', 'Error creating internship', 'error');
    });
}

updateInternship() {
    updateInternship({
        name: this.internshipName,
        duration: this.duration,
        createdOn: this.createdOn,
        deadline: this.deadline,
        status: this.status
    })
    .then(result => {
        this.showToast('Success', 'Internship updated successfully', 'success');
    })
    .catch(error => {
        this.showToast('Error', 'Error updating internship', 'error');
    });
}

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
    });
}

showToast(title, message, variant) {
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
    });
    this.dispatchEvent(event);
}

resetForm() {
    this.internshipName = '';
    this.duration = '';
    this.createdOn = '';
    this.deadline = '';
    this.status = '';
    this.lastModifiedDate = '';
}

     



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
    showJobPostings = false;


    // functions to handle the different templates showing up on a button click on admin panel
    
    handleShowDashboard(){
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

    handleShowInternshipListings(){
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

    handleShowApplicationManagement(){
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
 
    handleShowInternManagement(){
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

    handleShowCandidateManagement(){
        this.showDashboard = false;
        this.dashboardImage = false;
        this.showInternshipsListings = false;
        this.showJobPostings = false;
        this.showApplcationManagement = false;
        this.showInternManagement = false;
        //this.showCandidateManagement = true;
        this.showProjectManagement = false;
        this.showNotificationsAndCommunicationManagement = false;

        //By Ibrar feching details from LoginCandidate class to show in Manage Candidate of dashboardHR.
        getCandidateDetails()
            .then(result => {
                //Handle the result
                console.log('data'+result);
                this.record = result;
                    
                this.showCandidateManagement = true;

            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Failed!',
                    message: 'Something is Wrong!.',
                    variant: 'error',
                });
                this.dispatchEvent(event);

                console.error('Query Error ====>>'+error);
            });
        
    }

    handleShowProjectsManagement(){
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


    handleShowJobPostings(){
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

    handleShowNotificationsAndCommunications(){
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

//Abhik Code for creating Internship
handleSubmit() {
    createInternship({
        name: this.name,
        duration: parseInt(this.duration, 10),
        createDate: this.createDate,
        createdOn: this.createdOn,
        deadline: this.deadline,
        status: this.status
    })
    
}

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

    newInternship(){
        this.NewInternship = true;
    }

    unShowNewInternship(){
        this.NewInternship = false;
    }

    @track date;
    handleDateChange(event){
        this.date = event.target.value;
    }
    
}