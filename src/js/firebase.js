let isInitialized = false;

function initFirebase() {
  if (isInitialized) return;

  const firebaseConfig = {
    apiKey: 'AIzaSyDUO2rGdBWrCGeaK3MSTWR3LTHHya8khcg',
    authDomain: 'car-rental-eec8c.firebaseapp.com',
    databaseURL: 'https://car-rental-eec8c.firebaseio.com',
    projectId: 'car-rental-eec8c',
    storageBucket: 'car-rental-eec8c.appspot.com',
    messagingSenderId: '198736107539',
    appId: '1:198736107539:web:a615c6b39ff069687d07e6',
  };

  try {
    firebase.initializeApp(firebaseConfig);
    isInitialized = true;
  } catch (err) {
    console.error(err);
  }
}
