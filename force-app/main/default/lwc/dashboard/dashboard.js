import { LightningElement, api, wire, track } from 'lwc';

import { getRecord } from 'lightning/uiRecordApi';


//login page
import emailIcon from '@salesforce/resourceUrl/EmailIcon';
import passwordIcon from '@salesforce/resourceUrl/PasswordIcon';
import googleIcon from '@salesforce/resourceUrl/GoogleIcon';
import gmailIcon from '@salesforce/resourceUrl/EmailIcon';
import linkedinIcon from '@salesforce/resourceUrl/LinkedinIcon';
import avtar from '@salesforce/resourceUrl/Avtarimage';
import iconToggle from '@salesforce/resourceUrl/iconToggle';


import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import validateCandidate from '@salesforce/apex/LoginCandidate.validateCandidate';
import saveFeedbackDetails from '@salesforce/apex/SaveFeedback.saveFeedbackDetails';
import getInternshipDetails from '@salesforce/apex/GetDataForCandidate.getInternshipDetails';
import updateOtp from '@salesforce/apex/ForgotPasswordCls.updateOtp';
import updatePassword from '@salesforce/apex/ForgotPasswordCls.updatePassword';
import verifyOtp from '@salesforce/apex/ForgotPasswordCls.verifyOtp';

//aniket's dashboard
import image from '@salesforce/resourceUrl/Dashboardimage';
import video from '@salesforce/resourceUrl/videoAppy';
import internship from '@salesforce/resourceUrl/InternshipImage';
import job from '@salesforce/resourceUrl/jobimage';


import picture from '@salesforce/resourceUrl/photo1';
import pictures from '@salesforce/resourceUrl/photo2';
import copy from '@salesforce/resourceUrl/photo3';
import copys from '@salesforce/resourceUrl/photo4';



import facebook from '@salesforce/resourceUrl/facebook';
import linkedin from '@salesforce/resourceUrl/LinkedinIcon2';
import pinerest from '@salesforce/resourceUrl/pinerest';
import twitter from '@salesforce/resourceUrl/twitter';
import instagram from '@salesforce/resourceUrl/instagram';


import salesforce from '@salesforce/resourceUrl/salesforcejob';
import salesforcecloud from '@salesforce/resourceUrl/salesforcejob1';
import salesforceadmin from '@salesforce/resourceUrl/salesforcejob2';


import img from '@salesforce/resourceUrl/Internshipicon';
import img1 from '@salesforce/resourceUrl/HomeIcon';
import img2 from '@salesforce/resourceUrl/FeedBackicon';
import img3 from '@salesforce/resourceUrl/Profile';
import img4 from '@salesforce/resourceUrl/Applicationicon';
import img5 from '@salesforce/resourceUrl/Task';
import appy from '@salesforce/resourceUrl/LogoAppyNtern';






import project from '@salesforce/resourceUrl/recommendedphoto1';
import project1 from '@salesforce/resourceUrl/recommendedphoto2';
import module5 from '@salesforce/resourceUrl/recommendedphoto3';
import module1 from '@salesforce/resourceUrl/recommendedphoto4';
import project2 from '@salesforce/resourceUrl/recommendedphoto5';


const slides = [
    {
        id: 'project Recommended',
        language: 'cloud Project',
        imageUrl: project,
        description: 'Data Cloud-Powered Experiences Use Data Cloud to create personalized, real-time experiences across.'
    },
    {
        id: 'Module Recommended',
        language: 'CRM',
        imageUrl: project1,
        description: 'Why is CRM important.'
    },
    {
        id: 'project Recommended1',
        language: 'Prompt Builder',
        imageUrl: module5,
        description: 'Quick Start: Prompt Builder.Create and test a prompt template for summarizing support cases with'

    },
    {
        id: 'project Recommended2',
        language: 'Einstein Copilot',
        imageUrl: module1,
        description: 'Quick Start: Einstein Copilot.Bring Flow automations into conversational AI with Einstein Copilot actions'
    },
    {
        id: 'project Recommended3',
        language: 'Data Cloud Project',
        imageUrl: project2,
        description: 'Create a Data Stream in Data Cloud.Connect your Salesforce data in Data Cloud.'
    }

];


















//abhishek import



import getTaskReminders from '@salesforce/apex/TaskReminderController.getTaskReminders';
import updateTaskStatus from '@salesforce/apex/TaskReminderController.updateTaskStatus';


import Currentresume from '@salesforce/resourceUrl/Currentresume';
import achievementsicon1 from '@salesforce/resourceUrl/achievementsicon';
import Certificateicon from '@salesforce/resourceUrl/Certificateicon';




//improting for backend




export default class DashboardCandidate extends NavigationMixin(LightningElement) {

    // template variable assignment
    dashboardImage = true;
    showDashboard = false;
    showProfile = false;
    showInternship = false;
    showTasks = false;
    showApplication = false;
    showFeedback = false;
    showJobs = false;
    showCourse = false;

    showHome = false;
    showLandingPage = false;
    showRegistrationPage = false;
    showLoginPage = false;


    //from aniket's dashboard
    logophoto = appy;
    internship = img;
    homeimage = img1;
    profile = img3;
    application = img4;
    feedback = img2;
    task = img5;

    avtarimage = avtar;

    iconToggleImg = iconToggle;


    intern = internship;
    jobappy = job;
    //form login
    emailIcon = emailIcon;
    passwordIcon = passwordIcon;
    googleIcon = googleIcon;
    gmailIcon = gmailIcon;
    linkedinIcon = linkedinIcon;





    slides = slides;





    //from abhishek profile section
    @track showOverview = true;
    @track showWorkandEdu = false;
    @track showContact = false;
    @track showHobbies = false;





    facebookicon = facebook;
    likedinicon = linkedin;
    pineresticon = pinerest;
    twittericon = twitter;
    instagramicon = instagram;


    salescloud = salesforce;
    salesadmin = salesforcecloud;
    developer = salesforceadmin;

    resumeImageUrl = Currentresume;
    achievementImageUrl = achievementsicon1;
    certificateImageUrl = Certificateicon;






    dashboard = image;

    videos = video;

    craft = picture;
    crafting = pictures
    home = copy;
    homes = copys;


    //ibrar's code set profile
    //VARIABLES FOR FORGOT PASSWORD
    @track email;
    @track password;
    @track confirmPassword;
    @track newCandidateId;

    candidate;
    error;

    //Ibrar Working..
    isLogin = false;
    @api entrUsr;
    @api entrPass;
    error = '';
    candidate;
    showForgotPass = false;
    showLogin = false;
    internshiprecord;

    //FORGOT PASSWORD PAGE
    showOtp = false;

    @track isPopupVisible = false;
    @track otp = '';



    toggleSidebar() {
        const sidebar = this.template.querySelector('.sidebar');
        if (sidebar.classList.contains('hidden')) {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('show');
            sidebar.style.display = 'block';
        } else {
            sidebar.classList.add('hidden');
            sidebar.style.display = 'none';
        }
    }
    
    // toggleSidebar() {
    //     const sidebar = this.template.querySelector('.sidebar');
    //     sidebar.classList.toggle('show');
    // }
    // toggleSidebarHide() {
    //     const sidebar = this.template.querySelector('.sidebar');
    //     sidebar.classList.toggle('hide');
    // }



    showPopup() {
        this.isPopupVisible = true;
    }
    @track entrCode = '';




    testLogin(){
        this.isLogin=true;
    }


    closePopup() {
        this.isPopupVisible = false;
    }
    //Get email and password for Forgot Password
    getEmailFP(event) {
        this.email = event.target.value;
    }
    getPasswordFP(event) {
        this.password = event.target.value;
    }
    getConPasswordFP(event) {
        this.confirmPassword = event.target.value;
    }


    //LOGIN PAGE BUTTONS
    navigateToForgotPass() {
        this.showLogin = true;
        this.showForgotPass = true;
    }
    navigateToRegister() {
        this[NavigationMixin.Navigate]({
            type: "standard__navItemPage",
            attributes: {
                apiName: 'Registration',
            },
        });
    }
    cancelPass() {
        this.showLogin = false;
        this.showForgotPass = false;
    }
    //CODE FOR DASHBOARD PAGE
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
                    this.candidate = result;

                    if (this.entrPass === this.candidate.Password__c) {
                        const eventa = new ShowToastEvent({
                            title: 'Success!',
                            message: 'Login successful.',
                            variant: 'success',
                        });
                        this.dispatchEvent(eventa);
                        //Navigate to Dashboard Page
                        this.isLogin = true;
                        this.showDashboard = true;
                        this.showHome = true;

                        //console.log(enterPass, result.Password__c);

                    } else {
                        this.error = 'Incorrect Password! Check carefully';
                        console.log(this.error);

                        //console.log(this.entrPass, result.Password__c , this.candidate);
                    }


                } else {
                    const event = new ShowToastEvent({
                        title: 'Failed!',
                        message: 'Invalid Username or Password.',
                        variant: 'error',
                    });
                    this.dispatchEvent(event);

                    this.error = 'Invalid Username or Password';
                    console.log(this.error);
                }
            })
            .catch(error => {
                // Handle error
                console.error('Error:', error);
                this.error = 'Invalid Username or Password';
                console.log(this.error)
            });
    }

    //FOR FORGOT PASSWORD

    handleForgotPassword() {
        if (this.password !== this.confirmPassword) {
            this.error = 'Passwords do not match';
            return;
        } else {
            updateOtp({
                email: this.email
            })
                .then(result => {
                    console.log(result);
                    if (result == 'empty') {
                        console.log(result);
                        const event = new ShowToastEvent({
                            title: 'Failed!',
                            message: 'Email ' + this.email + ' is not registered!',
                            variant: 'error',
                        });
                        this.dispatchEvent(event);

                        this.error = 'Email ' + this.email + ' is not registered! Please check carefully';

                        console.log(this.error);

                    } else {
                        //this.showOtp = true;
                        this.newCandidateId = result;
                        console.log(result);

                        //this.showPopup();
                        //this.isPopupVisible = true;


                        const event = new ShowToastEvent({
                            title: 'Success!',
                            message: 'Verification Code sent to your Registered email.',
                            variant: 'success',
                        });
                        this.dispatchEvent(event);

                        this.showPopup();
                    }
                })
                .catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Failed!',
                        message: 'Something went wrong!',
                        variant: 'error',
                    });
                    this.dispatchEvent(event);

                    this.error = error.body.message;
                    console.log(error);
                    console.error('Error changing password:', this.error);
                });
        }
    }


    //TO VERIFY WITH OTP
    handleCodeChange(event) {
        this.entrCode = event.target.value.toString();
    }

    submitOtpF() {
        verifyOtp({ otp: this.entrCode, emailId: this.email })
            .then(result => {
                if (result === this.entrCode) {
                    updatePassword({
                        email: this.email,
                        canId: this.newCandidateId,
                        newPassword: this.password
                    })
                        .then(result => {
                            if (result) {
                                const event = new ShowToastEvent({
                                    title: 'Success!',
                                    message: 'Password changed successfully.',
                                    variant: 'success',
                                });
                                this.dispatchEvent(event);

                                this.cancelPass();

                                this.closePopup();
                            } else {
                                this.showError('Something went wrong while updating the password! Please try again.');
                            }
                        })
                        .catch(error => {
                            this.showError('Something went wrong while updating the password! Please try again.');
                            console.log(error);
                        });
                } else {
                    this.showError('Incorrect Verification Code! Please try again.');
                }
            })
            .catch(error => {
                console.log('Error occurred: ' + error);
                this.showError('Error verifying OTP. Please try again.');
            });

        console.log('Submitted OTP:', this.entrCode);
    }

    showError(errorMessage) {
        const event = new ShowToastEvent({
            title: 'Failed!',
            message: errorMessage,
            variant: 'error',
        });
        this.dispatchEvent(event);
        this.error = errorMessage;
        this.updateError();
        this.showPopup(); // Ensure the popup remains open
    }

    updateError() {
        const errorElement = this.querySelector('.slds-m-top_medium');
        if (errorElement) {
            errorElement.textContent = this.error;
        }
    }


    showErrorToast(title, message) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: 'error',
        });
        this.dispatchEvent(event);
        this.error = message;
    }



    // for dashboard candidate
    clickHome() {
        this.showHome = true;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = false;;
        this.showJobs = false;
        this.showCourse = false;
        this.showEditProfile = false;
        this.showCourse = false;
        this.showApplicationForm = false;

    }

    clickProfile() {
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = true;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = false;
        this.showJobs = false;
        this.showCourse = false;
        this.showEditProfile = false;
        this.showApplicationForm = false;

    }

    clickInternship() {
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = false;
        this.showJobs = false;
        this.showCourse = false;
        this.showEditProfile = false;
        this.showInternship = true;
        this.showApplicationForm = false;


        getInternshipDetails()
            .then(result => {
                //Handle the result
                console.log('data' + result);
                this.internshiprecord = result;


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

    clickTasks() {
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = true;
        this.showEditProfile = false;
        this.showApplication = false;
        this.showFeedback = false;
        this.showJobs = false;
        this.showCourse = false;
        this.showApplicationForm = false;

    }

    clickApplication() {
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = true;
        this.showFeedback = false;
        this.showJobs = false;
        this.showCourse = false;
        this.showEditProfile = false;
        this.showApplicationForm = false;

    }

    clickFeedback() {
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = true;
        this.showJobs = false;
        this.showCourse = false;
        this.showEditProfile = false;
        this.showApplicationForm = false;

    }

    clickJobs() {
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = false;
        this.showJobs = true;
        this.showCourse = false;
        this.showEditProfile = false;
        this.showApplicationForm = false;

    }
    clickCourse() {
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = false;;
        this.showJobs = false;
        this.showCourse = true;
        this.showEditProfile = false;
        this.showApplicationForm = false;

    }

    clickLogout() {
        this.isLogin = false;
    }


    handleButtonClick() {
        // Add your logic here
        console.log('Button clicked');
    }


    //profile 
    // clickFeedback(){
    //     this.showHome = false;
    //     this.dashboardImage = false;
    //     this.showProfile = false;
    //     this.showInternship = false;
    // }


    //Abhishek profile section js 

    clickOverview() {
        this.showOverview = true;
        this.showWorkandEdu = false;
        this.showContact = false;
        this.showHobbies = false;

    }

    clickWorkandExperience() {
        this.showOverview = false;
        this.showWorkandEdu = true;
        this.showContact = false;
        this.showHobbies = false;
    }

    clickContact() {
        this.showOverview = false;
        this.showWorkandEdu = false;
        this.showContact = true;
        this.showHobbies = false;
    }

    clickHobbies() {
        this.showOverview = false;
        this.showWorkandEdu = false;
        this.showContact = false;
        this.showHobbies = true;
    }



    //feedback Abhishek

    handleEmailChange(event) {
        this.email = event.target.value;
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
    }

    handleDescriptionChange(event) {
        this.description = event.target.value;
    }

    handleFileChange(event) {
        this.file = event.target.files[0];
    }

    handleSubmit() {
        saveFeedbackDetails({
            email: this.email,
            subject: this.subject,
            description: this.description
        })
            .then(result => {
                alert('Feedback sent successfully!');
                this.email = '';
                this.subject = '';
                this.description = '';
                this.file = '';
            })
            .catch(error => {
                console.error('An error occurred: ', error);
            });
    }

    //TASK SECTION 

    taskReminders;

    @wire(getTaskReminders)
    wiredTaskReminders({ error, data }) {
        if (data) {
            this.taskReminders = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleTaskCompletion(event) {
        const taskId = event.target.dataset.taskId;
        const taskStatus = event.target.checked;

        updateTaskStatus({ taskId: taskId, status: taskStatus })
            .then(result => {

                this.taskReminders = this.taskReminders.map(task => {
                    if (task.Id === taskId) {
                        return { ...task, Status__c: taskStatus };
                    }
                    return task;
                });
            })
            .catch(error => {
                console.error(error);
            });
    }


    clickHandler(event) {
        const sectionName = event.detail.openSections[0];
        console.log('Section toggled:', sectionName);
        // You can perform any additional logic here based on the toggled section
    }



    // Aniket import for animination 
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



    // Utsav's code for integrating forms and other things.
    showEditProfile = false;
    showApplicationForm = false;
    editProfile() {
        this.showEditProfile = true;
        this.showHome = false;
    }

    applyInternship(){
        this.showApplicationForm = true;
        this.showInternship = false;
    }


    profilePage = true;
    UploadSection = false;
   
   @track selectedTypeOption = ''; // 
   genderOptions = [
       { label: 'Male', value: 'Male' },
       { label: 'Female', value: 'Female' },
       { label: 'Rather Not Say', value: 'Rather Not Say' },

   ];

   @track selectedGradYear = ''; // 
   options = [
       { label: '2012', value: '2012' },
       { label: '2013', value: '2013' },
       { label: '2014', value: '2014' },
       { label: '2015', value: '2015' },
       { label: '2016', value: '2016' },
       { label: '2017', value: '2017' },
       { label: '2018', value: '2018' },
       { label: '2019', value: '2019' },
       { label: '2020', value: '2020' },
       { label: '2021', value: '2021' },
       { label: '2022', value: '2022' },
       { label: '2023', value: '2023' },
       { label: '2024', value: '2024' },
       { label: '2025', value: '2025' },

   ];

@track selectedFacultyOption = '';
facultyOptions = [
    {label: 'Arts', value: 'Arts'},
    {label: 'Science', value: 'Science'},
    {label: 'Commerce', value: 'Commerce'},
]

@track selectedGradFacultyOption = '';
GradfacultyOptions = [
    {label: 'Arts', value: 'Arts'},
    {label: 'Science', value: 'Science'},
    {label: 'Commerce', value: 'Commerce'},
]

   handleTypeChange(event) {
       this.selectedTypeOption = event.detail.value;
   }
   handleGradYearChange(event) {
       this.selectedGradYear = event.detail.value;
   }

   handleFacultyChange(event){
    this.selectedFacultyOption = event.detail.value;
   }

   handleGradFacultyChange(event){
    this.selectedGradFacultyOption = event.detail.value;
   }

   goProfile(){
    this.profilePage = true;
    this.UploadSection = false;
   }


   goUpload(){
    this.profilePage = false;
    this.UploadSection = true;
   }




   @api recordId;
    imageUrl;

    @wire(getRecord, { recordId: '$recordId', fields: ['ObjectApiName.Image_Field__c'] })
    wiredRecord({ error, data }) {
        if (data) {
            this.imageUrl = data.fields.Image_Field__c.value;
        } else if (error) {
            // handle error
        }
    }


    
    @track imageUrl;

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        this.imageUrl = uploadedFiles[0].documentId;
    }








}