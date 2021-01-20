const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
var serviceAccount = require("./tutoring-517bb-firebase-adminsdk-kxk9q-411bfd4193.json");
const { firestore } = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tutoring-517bb.firebaseio.com"
});

let db = admin.firestore();
const app = express();
app.use(cors({ origin: true }));

app.post('/submit', (req, res)=>{
  let content = req.body.action.params
  let docRef = db.collection('tutoring').doc();
  docRef.set({
    name: content.name,
    id: content.id,
    phone: content.phone,
    lang: content.lang,
    time: firestore.FieldValue.serverTimestamp()
  }).then(()=>{
      return res.send({
        version: "2.0",
        data: {
        }
      })
    }).catch(err=>console.log(err));
});


exports.tutoring = functions.https.onRequest(app);