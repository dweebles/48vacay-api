var admin = require("firebase-admin"),
    serviceAccount = require("./service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "YOUR_PROJECT_LINK"
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } require('uuid');
const directoryPath = path.join(__dirname, "files");

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function(file) {
    var lastDotIndex = file.lastIndexOf(".");

    var menu = require("./files/" + file);

    menu.forEach(function(obj) {
      firestore
        .collection('venues')
        .doc(uuidv4())
        .set(obj)
        .then(function(docRef) {
          console.log("Document written");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    });
  });
});
