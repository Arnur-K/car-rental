function onUser(data) {
  const template = document.createElement('template');

  template.innerHTML = `
    <div id="user-info" class="navbar-nav user-log ml-auto action-buttons">
      <div class="nav-item dropdown">
        <a href="#" data-toggle="dropdown" class="dropdown-toggle" aria-expanded="false">${data}</a>
        <div class="dropdown-menu action-form log-out-form">
          <input type="button" class="btn btn-primary btn-block" value="Sign Out">
        </div>
      </div>
    </div>
  `;

  document.querySelector('nav').appendChild(template.content.cloneNode(true));

  document.querySelector('input[value="Sign Out"]').onclick = () =>
    firebase.auth().signOut();
}

function onErrorMsg(target, msg) {
  document.querySelector(`p[name="${target}"]`).innerText = msg;
}

async function authUser(method, credentials) {
  const { email, password, confirmedPassword } = credentials;

  switch (method) {
    case 'login':
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log('function authUser login response: ', response);
      } catch (err) {
        onErrorMsg(method, err.message);
        throw new Error(err);
      }
      break;

    case 'signup':
      if (password !== confirmedPassword) {
        return onErrorMsg(method, "Passwords don't match");
      }
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        console.log('function authUser signup response: ', response);
      } catch (err) {
        onErrorMsg(method, err.message);
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
  initAuthForms();
  initAnimations();

  firebase.auth().onAuthStateChanged((user) => {
    const authButtonsEl = document.querySelector('#auth-buttons');
    const userInfoEl = document.querySelector('#user-info');

    if (user) {
      onUser(user.email);
      if (authButtonsEl) {
        authButtonsEl.setAttribute('hidden', '');
      }
    } else {
      if (authButtonsEl) {
        authButtonsEl.removeAttribute('hidden');
      }
      if (userInfoEl) {
        userInfoEl.remove();
      }
    }
  });
});
