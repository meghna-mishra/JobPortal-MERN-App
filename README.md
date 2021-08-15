# Description

A job portal application built using the MERN stack for both applicants and recruiters. The app supports basic functionalities such as login, registration and personalized profiles, along with more detailed functionalities for the process of application and recruitment.

Every user must have a username, password and type (Applicant/Recruiter).

# Applicants

Every applicant can enter details about their education such as the name of the institute(s), start year(s) and end year(s) of education. This is accompanied by selection of one or more skills. These details can be edited later on the profile page.


Applicants can view a list of available jobs along with the name of the recruiter, salary, duration, required skills, type and duration. Also visible alongside is the option to apply for the job, and the date and current status of all the applications can be viewed. The list of jobs can be:

1. Sorted in ascending and descending order of both salary and duration.
2. Filtered by salary (min/max), type and duration.
3. Searched by job titles.


To apply for a job, an applicant is given the option to provide a statement of purpose before submitting the application.

# Recruiters

Every recruiter can enter their contact number along with a short bio. These details can be edited later.


The recruiter can create a new job with a title, salary, maximum number of applications, maximum number of positions, deadline, required skills, type and duration.


Recruiters can view active job listings with their dates, number of applicants, and other details along with the option to edit them or delete the job listing.


Applications for every active job listing can be viewed with the name, skills, education, date of application and statement of purpose of the applicant. This is followed by the option to shortlist or reject the application. Upon shortlisting, the applicant can be accepted or rejected. This will be reflected on the applicant's profile when viewing the status of applications.

# Running the app

* Run Mongo daemon:
```
sudo mongod
sudo chown mongodb /tmp/mongodb-27017.sock
sudo chgrp mongodb /tmp/mongodb-27017.sock
sudo systemctl restart mongod
```
Mongo will be running on port 27017.

* Run Express Backend:
```
cd backend/
npm install
npm start
```

* Run React Frontend:
```
cd frontend/
npm install
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

