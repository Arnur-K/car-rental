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
          <p class="car-price mt-3">${price} PLN</p>
        </div>
        <div class="text-center">
          <button type="submit" class="button-primary mt-3">Rent</button>
        </div>
      </div>
    </div>
  `;

  return template;
}

function onCars(cars) {
  if (typeof cars === 'object') {
    cars = Object.values(cars);
  }

  const container = document.getElementById('cars-cards-container');
  const cardElements = [];

  cars.forEach((car, index) => {
    cardElements.push(getCardElement(car.img, car.name, car.type, car.price));

    if ((1 + index) % 3 === 0) {
      const rowEl = document.createElement('div');
      rowEl.classList.add('row');

      for (let i = 0; i < 1 + index; i++) {
        rowEl.appendChild(cardElements[i].content.cloneNode(true));
      }

      container.appendChild(rowEl);
    }
  });
}

async function fetchCars() {
  const type = new URLSearchParams(window.location.search).get('type');

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

jQuery('document').ready(() => {
  initFirebase();
  initRangeSlider();
  fetchCars();
});
