const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const directoryPath = path.join(__dirname, "data/json/cities");

// Firebase Setup
const admin = require("firebase-admin");
const serviceAccount = require("./config/firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseUrl: "https://poetic-genius-285622.firebaseio.com"
});

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};

firestore.settings(settings);

// The magic Loop
fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function(file) {
    const venue = require(directoryPath+'/' + file);

    venue.forEach(function(obj) {
      const genID = uuidv4();

      // Missing categories data
      if (obj.categories === null || obj.categories.length <= 1) {
        console.log("Skipping ->" +obj.name+": Missing categories data");
        return;
      }
      // Missing description data
      if (obj.description_text === null || obj.description_text.length <= 1) {
        console.log("Skipping ->" +obj.name+": Missing description_text data");
        return;
      }
      // Missing media data
      if (obj.media_landscape === null || obj.media_landscape.length <= 1 || obj.media_portrait === null || obj.media_portrait <= 1) {
        console.log("Skipping ->" +obj.name+": Missing media data");
        return;
      }
      
      firestore.collection("venues")
        .doc(genID)
        .set(obj)
        .then((res) => {
          console.log(obj.name + " was successfully added to database!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    });
  });
});
