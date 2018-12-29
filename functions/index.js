const functions = require('firebase-functions');

// Importing and configuring admin firebase function
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)


// Simple function that has as response some text
 exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello Sasa!");
 });


 // This is function that creates new notification - add new document
 const createNotification = (notification => {
     return admin.firestore().collection('notifications')
     .add(notification)
     .then(doc => console.log('notification added', doc));
 })

/////////////////////////////////////////////////////////////////////////////////

 // Function that will add notification when new project is created
 // in that case "onCreate()" function is activated
 exports.projectCreated = functions.firestore
    .document('projects/{projectId}')
    .onCreate(doc => {

        // Data stored in here will be added to notifications section in App
        const project = doc.data();
        const notification = {
            content: 'Added a new project',
            user: `${project.authorFirstName} ${project.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        // Returns function taht takes 'notification' object as parameter
        return createNotification(notification);
 });

 /////////////////////////////////////////////////////////////////////////////////

 // Function that create notification when user is signed in
 // With auth service we create new notification
 exports.userJoined = functions.auth.user()
    .onCreate(user => {

        // Gets data from 'users' in firestore by it's ID 
        return admin.firestore().collection('users')
            .doc(user.uid).get().then(doc =>{

                // After connecting to document we output this as bellow
                const newUser = doc.data();
                const notification = {
                    content: 'New user joined the app',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }

                // Returns function taht takes 'notification' object as parameter
                return createNotification(notification);

            });

 })

