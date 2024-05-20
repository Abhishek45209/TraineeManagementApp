import { LightningElement,track } from 'lwc';

export default class Application extends LightningElement {
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
}