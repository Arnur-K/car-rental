let KEY = null,
  VALUE = null;

function getCardElement(car) {
  const template = document.createElement('template');

  template.innerHTML = `
    <div class="col-lg-4 col-md-4 col-12 mt-5 car-container">
      <div class="car-card text-center pt-3 pb-3">
        <div class="img-container">
          <img
            class="car-image"
            src="${car.img}"
            alt="car"
          />
        </div>
        <div class="car-info mt-3">
          <h4 class="car-name">${car.name}</h4>
          <p class="car-type mt-3">${car.type.toUpperCase()}</p>
          <p class="car-price mt-3">${car.price} PLN/day</p>
          ${
            !!car.returnDate
              ? `<p class='car-return-date mt-3'>Available after ${new Date(car.returnDate).toLocaleDateString()}</p>`
              : ''
          }
        </div>
        ${
          !car.returnDate
            ? `<div class="text-center card-button-container">
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
        </div>`
            : ''
        }
      </div>
    </div>
  `;

  return template;
}

function onCars(cars) {
  if (!cars) return;
  let array = [];
  if (typeof cars === 'object') array = [...Object.values(cars)];

  const container = document.getElementById('cars-cards-container');
  container.innerHTML = '';

  array.forEach((car) => {
    const cardElement = getCardElement(car).content.cloneNode(true);
    if (cardElement.querySelector('button'))
      cardElement.querySelector('button').onclick = () => localStorage.setItem('car', JSON.stringify(car));
    container.appendChild(cardElement);
  });
}

async function fetchCars() {
  const type = new URLSearchParams(window.location.search).get('type');

  if (KEY && VALUE) {
    KEY = KEY.toLowerCase();
    if (typeof VALUE === 'string') VALUE = VALUE.toLowerCase();

    try {
      const cars = await firebase.database().ref('cars').orderByChild(KEY).equalTo(VALUE).once('value');
      onCars(cars.val());
    } catch (err) {
      console.error(err);
    }
    return;
  }

  if (!!type) {
    try {
      const cars = await firebase.database().ref('cars').orderByChild('type').equalTo(type.toLowerCase()).once('value');
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
  const d = new Date();
  const rentDateInputMin = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2), ('0' + d.getDate()).slice(-2)].join(
    '-',
  );

  rentDateInput.min = rentDateInputMin;
  rentDateInput.value = rentDateInputMin;
  returnDateInput.min = [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + (d.getDate() + 1)).slice(-2),
  ].join('-');

  datesSubmitButton.onclick = async () => {
    const car = JSON.parse(localStorage.getItem('car'));
    const updatedCar = { ...car, rentDate: rentDateInput.value, returnDate: returnDateInput.value };

    await firebase.database().ref(`cars/${car.id}`).update(updatedCar);
    await firebase.database().ref(`rent/${firebase.auth().currentUser.uid}/${car.id}`).set(updatedCar);

    alert(`You succesfully rented ${car.name}`);
    window.location.reload();
  };

  mainSelect.onchange = ({ target }) => {
    filtersFormDivElements.forEach((div) => {
      if (!div.hasAttribute('hidden')) div.setAttribute('hidden', '');
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
  fetchCars();
});
