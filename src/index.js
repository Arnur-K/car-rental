function initFirebase() {
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
    console.log(firebase);

    const database = firebase.database();
    console.log(database);
  } catch (err) {
    console.error(err);
  }
}

function initAnimations() {
  function initFirebase() {
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
      console.log(firebase);

      const database = firebase.database();
      console.log(database);
    } catch (err) {
      console.error(err);
    }
  }

  function initAnimations() {
    var heading = {};
    heading.opacityIn = [0, 1];
    heading.sclaeIn = [0.2, 1];
    heading.scaleOut = 3;
    heading.durationIn = 800;
    heading.durationOut = 600;
    heading.delay = 500;

    AOS.init({ disable: 'mobile' });

    anime
      .timeline({ loop: true })
      .add({
        targets: '.heading-title .letters-1',
        opacity: heading.opacityIn,
        scale: heading.scaleIn,
        duration: heading.durationIn,
      })
      .add({
        targets: '.heading-title .letters-1',
        opacity: 0,
        scale: heading.scaleOut,
        duration: heading.durationOut,
        easing: 'easeInExpo',
        delay: heading.delay,
      })
      .add({
        targets: '.heading-title .letters-2',
        opacity: heading.opacityIn,
        scale: heading.scaleIn,
        duration: heading.durationIn,
      })
      .add({
        targets: '.heading-title .letters-2',
        opacity: 0,
        scale: heading.scaleOut,
        duration: heading.durationOut,
        easing: 'easeInExpo',
        delay: heading.delay,
      })
      .add({
        targets: '.heading-title .letters-3',
        opacity: heading.opacityIn,
        scale: heading.scaleIn,
        duration: heading.durationIn,
      })
      .add({
        targets: '.heading-title .letters-3',
        opacity: 0,
        scale: heading.scaleOut,
        duration: heading.durationOut,
        easing: 'easeInExpo',
        delay: heading.delay,
      })
      .add({
        targets: '.heading-title',
        opacity: 0,
        duration: 500,
        delay: 500,
      });
  }

  jQuery('document').ready(() => {
    initFirebase();
    initAnimations();
  });

  AOS.init({ disable: 'mobile' });

  anime
    .timeline({ loop: true })
    .add({
      targets: '.heading-title .letters-1',
      opacity: heading.opacityIn,
      scale: heading.scaleIn,
      duration: heading.durationIn,
    })
    .add({
      targets: '.heading-title .letters-1',
      opacity: 0,
      scale: heading.scaleOut,
      duration: heading.durationOut,
      easing: 'easeInExpo',
      delay: heading.delay,
    })
    .add({
      targets: '.heading-title .letters-2',
      opacity: heading.opacityIn,
      scale: heading.scaleIn,
      duration: heading.durationIn,
    })
    .add({
      targets: '.heading-title .letters-2',
      opacity: 0,
      scale: heading.scaleOut,
      duration: heading.durationOut,
      easing: 'easeInExpo',
      delay: heading.delay,
    })
    .add({
      targets: '.heading-title .letters-3',
      opacity: heading.opacityIn,
      scale: heading.scaleIn,
      duration: heading.durationIn,
    })
    .add({
      targets: '.heading-title .letters-3',
      opacity: 0,
      scale: heading.scaleOut,
      duration: heading.durationOut,
      easing: 'easeInExpo',
      delay: heading.delay,
    })
    .add({
      targets: '.heading-title',
      opacity: 0,
      duration: 500,
      delay: 500,
    });
}

jQuery('document').ready(() => {
  initFirebase();
  initAnimations();
});
