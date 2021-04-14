import firebase from 'firebase';
// Készítsd el a saját config.js fájlodat a config.example.js fájl alapján
import firebaseConfig from './firebase/config';
import shopItem from "./firebase/shopItem";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

firebase
  .auth()
  .signInAnonymously()
  .then(() => {
    console.log('signed in');
  })
  .catch((error) => {
    console.error(error);
  });

firebase.auth().onAuthStateChanged(async (user) => {
  const promises = [];
  if (user) {
    shopItem.forEach((item, index) => {
      const writePromise = db.collection('shopItems')
        .doc(index + "")
        .set(item)
        .then(() => {
          console.log('Document written');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
      promises.push(writePromise);
    });
    Promise.all(promises).then(() => {
      process.exit(0);
    });
  }
});