import { LightningElement, api, wire, track } from 'lwc';

// Aniket Code for Frontend / (LWC)
import image from '@salesforce/resourceUrl/Dashboardimage';
import video from '@salesforce/resourceUrl/videoAppy';


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


//improting for backend

import getCandidateDetails from '@salesforce/apex/LoginCandidate.getCandidateDetails';
import validateCandidate from '@salesforce/apex/LoginCandidate.validateCandidate';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class Dashboard extends NavigationMixin(LightningElement) {


logophoto = appy;
internship = img;
homeimage = img1;
profile = img3;
application = img4;
feedback = img2;
task = img5;





facebookicon = facebook;
likedinicon = linkedin;
pineresticon = pinerest;
twittericon = twitter;
instagramicon = instagram;


salescloud = salesforce;
salesadmin = salesforcecloud;
developer = salesforceadmin;





    dashboard = image;
   
    videos = video;
    
    craft = picture;
    crafting = pictures
    home = copy;
    homes = copys;


//ibrar's code set profile
    //@api candidateId;
    candidate;
    error;

    @track candidateId;

    connectedCallback() {
        // Retrieve the candidateId from the URL parameters
        const params = new URLSearchParams(window.location.search);
        this.candidateId = params.get('candidateId');
    }

    // connectedCallback() {
    //     // Retrieve candidate ID from the state
    //     const currentState = history.state;
    //     if (currentState && currentState.candidateId) {
    //         this.candidateId = currentState.candidateId;
    //     }
    // }

    @wire(getCandidateDetails, { candidateId: 'a00a5000006OTBuAAO' })
    wiredCandidate({ error, data }) {
        if (data) {
            this.candidate = data;
            console.log(data);
        } else if (error) {
            console.error('Error fetching candidate details:', error);
            this.error = 'An error occurred while fetching candidate details';
        }
    }
    
    

// if(candidate != null){
//     console.log(candidate);
// }else{
//     console.log('no data found')
// }


// Uncomment and implement logout logic if needed
// handleLogout() {
//     logoutUser()
//         .then(result => {
//             this[NavigationMixin.Navigate]({
//                 type: 'standard__navItemPage',
//                 attributes: {
//                     apiName: 'LoginPage',
//                 },
//             });
//         })
//         .catch(error => {
//             console.error('Error logging out:', error);
//         });
// }
 record;
check() {
    console.log(this.candidateId);
}


    handleButtonClick() {
        // Add your logic here
        console.log('Button clicked');
    }



}