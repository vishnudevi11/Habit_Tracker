# Habit_Tracker
Created web application,which helps user to create,update and delete habits on daily basis.The user can track their
habit in the mode of done,not done and not yet started.It is a specific app for user,which means user can sign-in/sign-up 
and tracker their habit.Project build tech stack consisting of NodeJS,Express,MongoDB,ejs.The data are stored and managed 
by mongodb.
_______________________________________________________________________________________________________________________
## **How to Setup the project?**
* Clone this project from github repository
* Start by installing npm
* Navigate to project directory and run the following command.
````
npm install
````
* Run project
````
npm start
````

* Visit local browser-http://localhost:7000/
* Hosted Link-https://habit-tracker-app-hhhi.onrender.com
________________________________________________________________________________________________________________________
## **Step by step Procedure**
* **Sign-Up/Sign-In** into your account.
* Click the **"Add-Habit"** button to create a new habit.
* Give a **habit name**,which you want to track.
* Click on the **"Add habit"** to save the habit.
* To mark a habit as **complete/incomplete** for the day,give click on corresponding icon.
________________________________________________________________________________________________________________________
## **Folder Structure**
````
 Habit_Tracker
   |
   |                      
 assets-------------->|-->css
   |                  |-->images
   |                  |-->js
   |
 config-------------->|-->flashmiddleware.js
   |                  |-->mongoose.js
   |                  |-->passport_local.js 
   |
 controller---------->|-->habit_controller.js
    |                 |-->homepage_controller.js
    |                 |-->user_controller.js 
    |
 models-------------->|-->habit.js
    |                 |-->user.js
    |
    |
 routes-------------->|-->habit.js
   |                  |-->index.js
   |                  |-->users.js
   |
 views--------------->|-->_footer.ejs
   |                  |-->_header.ejs
   |                  |-->forget_password.ejs
   |                  |-->home.ejs
   |                  |-->layout.ejs
   |                  |-->user_sign_in.ejs
   |                  |-->user_sign_up.ejs
   |                  |-->weekly_view.ejs
   |
   |
node_modules
.gitignore
package-lock.json
package.json
````

















