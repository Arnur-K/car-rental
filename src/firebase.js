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

    // apiKey: proccess.env.API_KEY,
    // authDomain: proccess.env.AUTH_DOMAIN,
    // databaseURL: proccess.env.DATAVASE_URL,
    // projectId: proccess.env.PROJECT_ID,
    // storageBucket: proccess.env.STORAGE_BUCKET,
    // messagingSenderId: proccess.env.MESSAGE_SENDER_ID,
    // appId: proccess.env.APP_ID,
  };

  try {
    firebase.initializeApp(firebaseConfig);
    isInitialized = true;
  } catch (err) {
    console.error(err);
  }
}
