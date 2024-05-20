import { LightningElement, api, wire, track } from 'lwc';




//login page
import emailIcon from '@salesforce/resourceUrl/EmailIcon';
import passwordIcon from '@salesforce/resourceUrl/PasswordIcon';
import googleIcon from '@salesforce/resourceUrl/GoogleIcon';
import gmailIcon from '@salesforce/resourceUrl/EmailIcon';
import linkedinIcon from '@salesforce/resourceUrl/LinkedinIcon';
import avtar from '@salesforce/resourceUrl/Avtarimage';



import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import validateCandidate from '@salesforce/apex/LoginCandidate.validateCandidate';
import saveFeedbackDetails from '@salesforce/apex/SaveFeedback.saveFeedbackDetails';

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


intern = internship;
jobappy = job;
 //form login
 emailIcon = emailIcon;
 passwordIcon = passwordIcon;
 googleIcon = googleIcon;
 gmailIcon = gmailIcon;
 linkedinIcon = linkedinIcon;










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
    //LOGIN PAGE BUTTONS
    navigateToForgotPass(){
        this.showLogin = true;
        this.showForgotPass = true;
    }
    navigateToRegister(){
        this[NavigationMixin.Navigate]({
            type: "standard__navItemPage",
            attributes: {
                apiName: 'Registration',
            },
        });
    }
    cancelPass(){
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

                    if(this.entrPass === this.candidate.UserPassword__c){
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

                        //console.log(enterPass, result.UserPassword__c);
                        
                    }else{
                        this.error = 'Incorrect Password! Check carefully';
                        console.log(this.error);

                        //console.log(this.entrPass, result.UserPassword__c , this.candidate);
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


    // for dashboard candidate
    clickHome(){
        this.showHome = true;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = false;;
        this.showJobs = false;
        this.showCourse = false;
        this.showCourse = false;
    }

    clickProfile(){
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = true;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = false;
        this.showJobs = false;
        this.showCourse = false;
}

    clickInternship(){
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = true;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = false;
        this.showJobs = false;
        this.showCourse = false;
    }
 
    clickTasks(){
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = true;
        this.showApplication = false;
        this.showFeedback = false;
        this.showJobs = false;
        this.showCourse = false;
    }

    clickApplication(){
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = true;
        this.showFeedback = false;
        this.showJobs = false;
        this.showCourse = false;

        //To retrived data from CandidateApplication object
    //     getCandidateDetails()
    //         .then(result => {
    //             //Handle the result
    //             //console.log('data'+result);
    //             this.record = result;
                    
    //             this.showApplication = true;

    //         })
    //         .catch(error => {
    //             const event = new ShowToastEvent({
    //                 title: 'Failed!',
    //                 message: 'Something is Wrong!.',
    //                 variant: 'error',
    //             });
    //             this.dispatchEvent(event);

    //             console.error('Query Error ====>>'+error);
    //         });
        
     }

    clickFeedback(){
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = true;
        this.showJobs = false;
        this.showCourse = false;
    
    }

    clickJobs(){
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = false;
        this.showJobs = true;
        this.showCourse = false;
    }
    clickCourse(){
        this.showHome = false;
        this.dashboardImage = false;
        this.showProfile = false;
        this.showInternship = false;
        this.showTasks = false;
        this.showApplication = false;
        this.showFeedback = false;;
        this.showJobs = false;
        this.showCourse = true;
    }

    clickLogout(){
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




    











}