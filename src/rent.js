let KEY = null,
  VALUE = null;

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
        <div class="text-center card-button-container">
          ${
            firebase.auth().currentUser
              ? `<button
                type='button'
                data-toggle='modal'
                data-target='#rent-popup'
                class='button-primary mt-3 button-rent'
                button-rent
              >
                Rent
              </button>`
              : 'Log in to your account to rent'
          }
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

  cars.forEach((car) => {
    const cardElement = getCardElement(
      car.img,
      car.name,
      car.type,
      car.price,
    ).content.cloneNode(true);

    container.appendChild(cardElement);
  });
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

  const rentDateInput = document.getElementById('rentDate');
  const returnDateInput = document.getElementById('returnDate');
  const datesSubmitButton = document.getElementById('datesSubmit');

  datesSubmitButton.onclick = () => {
    const rentDate = rentDateInput.value
    const returnDate = 
  };

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
