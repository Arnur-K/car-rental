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
          <p class="car-price mt-3">Rent date: ${new Date(car.rentDate).toLocaleDateString()}</p>
          <p class="car-price mt-3">Return date: ${new Date(car.returnDate).toLocaleDateString()}</p>
          <button
            type='button'
            class='button-primary mt-3 button-rent'
            button-rent
          >
            Return
          </button>
      </div>
    </div>
  `;

  return template;
}

function onCars(cars, userID) {
  document.querySelector('main').innerHTML = `
        <section class="cars mt-5">
          <div 
            class="container" 
            id="cars-cards-container" 
            style="display: flex; flex-wrap: wrap;"
          ></div>
        </section>
      `;
  const container = document.getElementById('cars-cards-container');
  container.innerHTML = '';
  if (!cars) return;

  console.log(cars);

  cars.forEach((car) => {
    const cardElement = getCardElement(car).content.cloneNode(true);
    if (cardElement.querySelector('button'))
      cardElement.querySelector('button').onclick = async () => {
        if (confirm(`Are you sure you want to return ${car.name}?`)) {
          const updatedCar = { ...car, rentDate: null, returnDate: null };

          await firebase.database().ref(`cars/${car.id}`).update(updatedCar);
          await firebase.database().ref(`rent/${userID}/${car.id}`).remove();

          window.location.reload();
        }
      };
    container.appendChild(cardElement);
  });
}

jQuery('document').ready(() => {
  const main = document.querySelector('main');

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      const response = await firebase.database().ref(`rent/${user.uid}`).once('value');
      const cars = response.val();
      let array = [];

      if (!cars) return (main.innerHTML = '<h1>You do not have any rented cars</h1>');
      else if (typeof cars === 'object') array = [...Object.values(cars)];
      else if (Array.isArray(cars)) array = [...cars];
      else throw new Error(`Unhandled type of ${typeof cars}`);

      onCars(array, user.uid);
    } else main.innerHTML = '<h1>Log in to your account to view rented cars</h1>';
  });
});
