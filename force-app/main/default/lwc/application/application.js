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

//IBRAR FOR DATA IN APPLICATION MANAGEMENT
import getInternshipApplications from '@salesforce/apex/GetDataForHR.getInternshipApplications';
import updateApplicationStatus from '@salesforce/apex/SetDataForHr.updateApplicationStatus';
import getApplicationDetails from '@salesforce/apex/GetDataForHR.getApplicationDetails';
import getIntrnshipApplicationDetails from '@salesforce/apex/GetDataForHR.getIntrnshipApplicationDetails';
import getCandidateApplicationDetails from '@salesforce/apex/GetDataForHR.getCandidateApplicationDetails';
import getReadyInternship from '@salesforce/apex/GetDataForHR.getReadyInternship';

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
    @track updateInternshipApplicationStatus='Applied';
    @api internshipName;
    @api internshipDetail;
    @api internshipDuration;
    @api internshipLocation;
    @api internshipExperience;
    @api internshipDeadline;
    @api internshipStipend;

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


    handleFilter(event) {
        this.internshipApStatus = event.target.dataset.status;
        console.log('Selected Status:', this.internshipApStatus);
        this.updateButtonClasses();

        getInternshipApplications({status: this.internshipApStatus})
        .then(result =>{
            if(result){
                this.internshipApplications = result;
            }else{
                this.error='No data Found';
            }
            this.showApplcationManagement = true;
        })
        .catch(error =>{
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
    this.location ;
    this.createdOn;
    this.deadline;
    this.status ;
    this.detail ;
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
        this.showManageInternTemp = false;
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
        .then(res =>{
            console.log(res);

            this.internshipListings = res;

            this.showInternshipsListings = true;
        })
        .catch(err =>{
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

        getInternshipApplications({status: this.updateInternshipApplicationStatus})
        .then(result =>{
            if(result){
                this.internshipApplications = result;
            }else{
                this.error='No data Found';
            }
            this.showApplcationManagement = true;
        })
        .catch(error =>{
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


        // getInternCandidateDetails({ candidateId: this.candidateId })
        //     .then(result => {
        //         this.appCanData = result;
        //         console.log('Candidate Data:', this.appCanData);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching candidate details:', error);
        //     });

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
        this.showManageInternTemp = false;
    }
    
    handleSelectClick(event) {
        const button = event.target;
        this.applicationId = button.dataset.id;
        this.updateInternshipApplicationStatus = button.dataset.status;
        updateApplicationStatus({
            applicationId: this.applicationId,
            status:this.updateInternshipApplicationStatus
        })
        .then(res =>{
            this.showToast('Success', 'Status Updated Successfully', 'success');
            
            this.closeCandidateApplicationDetails();
        })
        .catch(error=>{
            console.log('Error occured:', error);
        });
        
    }
    handleRejectClick(event) {
        const button = event.target;
        this.applicationId = button.dataset.id;
        this.updateInternshipApplicationStatus = button.dataset.status;
        updateApplicationStatus({
            applicationId: this.applicationId,
            status:this.updateInternshipApplicationStatus
        })
        .then(res =>{
            
            this.showToast('Success', 'Status Updated Successfully', 'success');
            
            this.closeCandidateApplicationDetails();
        })
        .catch(error=>{
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



    projectname='';
    duration='';
    start='';
    End='';
    Navbar='';
    projectnames='';
    durations='';
    internname='';
    starts='';
    Ends='';
    Navbars='';
    teamleader='';
    role='';

    handlerole (event){
        this.role=event.target.value; 
    }

    handleprojectname(event){
        this.projectname = event.target.value;
    }
    handleduration(event){
        this.duration = event.target.value;
    }
    handlestart(event){
        this.start= event.target.value;
    }
    handleEnd(event){
        this.End= event.target.value;
    } 
    handleNavbarChange(event){
        this.Navbar= event.target.value;
    }
    handleprojectnames(event){
        this.projectnames= event.target.value;
    }
    handledurations(event){
        this.durations= event.target.value;
    }
    handleinternname(event){
        this.internname= event.target.value;
    }
    handlestarts(event){
        this.starts= event.target.value;
    }
    handleEnds(event){
        this.Ends= event.target.value;
    }
    handleNavbarsChange(event){
        this.Navbars= event.target.value;
    }
    handleteamleader(event){
        this.teamleader= event.target.value;
    }



@track createprojectsection= false;
@track assignprojectsection =false;
@track completesection=true;
createproject(){
    this.createprojectsection= true;
    this.assignprojectsection =false;
}

assignproject(){
    this.assignprojectsection =true;
    this.createprojectsection=false;
}
crox()
{
    this.createprojectsection= false;
    this.assignprojectsection =false;
    this.completesection=true;
}
takeprojectvalue()
{
    this.completesection=false;
}



}



// import { LightningElement,track } from 'lwc';

// export default class Application extends LightningElement {
//    profilePage = true;
//     UploadSection = false;
   
//    @track selectedTypeOption = ''; // 
//    genderOptions = [
//        { label: 'Male', value: 'Male' },
//        { label: 'Female', value: 'Female' },
//        { label: 'Rather Not Say', value: 'Rather Not Say' },

//    ];

//    @track selectedGradYear = ''; // 
//    options = [
//        { label: '2012', value: '2012' },
//        { label: '2013', value: '2013' },
//        { label: '2014', value: '2014' },
//        { label: '2015', value: '2015' },
//        { label: '2016', value: '2016' },
//        { label: '2017', value: '2017' },
//        { label: '2018', value: '2018' },
//        { label: '2019', value: '2019' },
//        { label: '2020', value: '2020' },
//        { label: '2021', value: '2021' },
//        { label: '2022', value: '2022' },
//        { label: '2023', value: '2023' },
//        { label: '2024', value: '2024' },
//        { label: '2025', value: '2025' },

//    ];

// @track selectedFacultyOption = '';
// facultyOptions = [
//     {label: 'Arts', value: 'Arts'},
//     {label: 'Science', value: 'Science'},
//     {label: 'Commerce', value: 'Commerce'},
// ]

// @track selectedGradFacultyOption = '';
// GradfacultyOptions = [
//     {label: 'Arts', value: 'Arts'},
//     {label: 'Science', value: 'Science'},
//     {label: 'Commerce', value: 'Commerce'},
// ]

//    handleTypeChange(event) {
//        this.selectedTypeOption = event.detail.value;
//    }
//    handleGradYearChange(event) {
//        this.selectedGradYear = event.detail.value;
//    }

//    handleFacultyChange(event){
//     this.selectedFacultyOption = event.detail.value;
//    }

//    handleGradFacultyChange(event){
//     this.selectedGradFacultyOption = event.detail.value;
//    }

//    goProfile(){
//     this.profilePage = true;
//     this.UploadSection = false;
//    }


//    goUpload(){
//     this.profilePage = false;
//     this.UploadSection = true;
//    }
// }