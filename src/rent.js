let KEY = null;
let VALUE = null;

function initRangeSlider() {
  $('.js-range-slider').ionRangeSlider({
    type: 'double',
    min: 0,
    max: 500,
    from: 90,
    to: 300,
    grid: true,
  });
}

function getCardElement(img, name, type, price) {
  const template = document.createElement('template');

  template.innerHTML = `
    <div class="col-lg-4 col-md-4 col-12 mt-5 car-container">
      <div class="car-card text-center pt-3 pb-3">
        <div class="img-container">
          <img
            class="car-image"
            src="${img}"
            alt="car"
          />
        </div>
        <div class="car-info mt-3">
          <h4 class="car-name">${name}</h4>
          <p class="car-type mt-3">${type.toUpperCase()}</p>
          <p class="car-price mt-3">${price} PLN/day</p>
        </div>
        <div class="text-center">
          <button type="button" class="button-primary mt-3 button-rent">Rent</button>
        </div>
      </div>
    </div>
  `;

  return template;
}

function onCars(cars) {
  if (!cars) return;

  if (typeof cars === 'object') {
    cars = Object.values(cars);
  }

  const container = document.getElementById('cars-cards-container');
  container.innerHTML = '';

  cars.forEach((car) =>
    container.appendChild(
      getCardElement(car.img, car.name, car.type, car.price).content.cloneNode(
        true,
      ),
    ),
  );

  document.querySelectorAll('.button-rent').forEach(
    (btn) =>
      (btn.onclick = () => {
        if (!firebase.auth().currentUser) {
          alert('Login to your account to rent');
        }
      }),
  );
}

async function fetchCars() {
  const type = new URLSearchParams(window.location.search).get('type');

  if (KEY && VALUE) {
    KEY = KEY.toLowerCase();
    if (typeof VALUE === 'string') VALUE = VALUE.toLowerCase();

    try {
      const cars = await firebase
        .database()
        .ref('cars')
        .orderByChild(KEY)
        .equalTo(VALUE)
        .once('value');

      onCars(cars.val());
    } catch (err) {
      console.error(err);
    }

    return;
  }

  if (!!type) {
    try {
      const cars = await firebase
        .database()
        .ref('cars')
        .orderByChild('type')
        .equalTo(type.toLowerCase())
        .once('value');

      onCars(cars.val());
    } catch (err) {
      console.error(err);
    }

    return;
  }

  try {
    const cars = await firebase.database().ref('cars').once('value');
    onCars(cars.val());
  } catch (err) {
    console.error(err);
  }
}

function initFields() {
  const mainSelect = document.getElementById('main-select');
  const filtersForm = document.getElementById('filters-form');
  const filtersFormDivElements = filtersForm.querySelectorAll('div[name]');

  mainSelect.onchange = ({ target }) => {
    filtersFormDivElements.forEach((div) => {
      if (!div.hasAttribute('hidden')) {
        div.setAttribute('hidden', '');
      }
    });

    const value = target.value.trim().toLowerCase().replace(' ', '-');
    const selectedDiv = filtersForm.querySelector(`div[name="${value}-div"]`);

    if (!!selectedDiv.querySelector('select')) {
      selectedDiv.querySelector('select').onchange = (event) => {
        KEY = target.value;
        VALUE = event.target.value;
      };
    }

    selectedDiv.toggleAttribute('hidden');
  };

  document.getElementById('type-select').onchange = (event) => {
    KEY = 'type';
    VALUE = event.target.value;
  };

  filtersForm.onsubmit = (event) => {
    event.preventDefault();

    filtersFormDivElements.forEach((div) => {
      if (!div.hasAttribute('hidden')) {
        KEY = div.querySelector('select').name;
        VALUE = div.querySelector('select').value;
      }
    });

    fetchCars();
  };
}

jQuery('document').ready(() => {
  initFirebase();
  initFields();
  initRangeSlider();
  fetchCars();
});
