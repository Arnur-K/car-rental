function displayUserData(data) {
  document.querySelector('#auth-buttons').setAttribute('hidden', '');

  const template = document.createElement('template');

  template.innerHTML = `<div class="navbar-nav ml-auto">
    ${data}
  </div>`;

  document.querySelector('nav').appendChild(template.content.cloneNode(true));
}

const dispatchErrorMsg = (target, msg) =>
  (document.querySelector(`p[name="${target}"]`).innerText = msg);

async function authUser(method, credentials) {
  const { email, password, confirmedPassword } = credentials;

  switch (method) {
    case 'login':
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log(response);

        if (response.user) {
          displayUserData(response.user.email);
        }
      } catch (err) {
        dispatchErrorMsg(method, err.message);
        throw new Error(err);
      }
      break;

    case 'signup':
      if (password !== confirmedPassword) {
        return dispatchErrorMsg(method, "Passwords don't match");
      }
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        console.log(response);

        if (response.user) {
          displayUserData(response.user.email);
        }
      } catch (err) {
        dispatchErrorMsg(method, err.message);
        throw new Error(err);
      }
      break;

    default:
      throw new Error('Invalid auth method. Should be login or signup');
  }
}

function initAuthForms() {
  const authForms = document.querySelectorAll('form');

  authForms.forEach((form) => {
    form.onsubmit = (event) => {
      event.preventDefault();

      const authMethod = form.getAttribute('name');

      const credentials = {};
      const fields = form.querySelectorAll('*[name]');

      fields.forEach((field) => {
        credentials[field.getAttribute('name')] = field.value;
      });
      authUser(authMethod, credentials);
    };
  });
}

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

    initAuthForms();

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
