// index.js

// Callbacks
const handleClick = (event) => {
  fetch(`http://localhost:3000/ramens/${event.target.id}`)
    .then((respond) => respond.json())
    .then((information) => {
      const img = document.querySelector(".detail-image");
      img.src = information.image;
      const nombre = document.querySelector(".name");
      nombre.textContent = information.name;
      const rest = document.querySelector(".restaurant");
      rest.textContent = information.restaurant;
      const rating = document.querySelector("#rating-display");
      rating.textContent = information.rating;
      const comment = document.querySelector("#comment-display");
      comment.textContent = information.comment;
    });
};

const addSubmitListener = (data) => {

  data.addEventListener("submit", (event) => {
    event.preventDefault();

    const ramenMenuDiv = document.getElementById("ramen-menu");
    const img = document.createElement("img");
    img.src = event.target.image.value;

    const body = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: parseInt(event.target.rating.value),
      comment: event.target.comment.value,
    };
    fetch(`http://localhost:3000/ramens`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((json) => {
        img.id = json.id;
        ramenMenuDiv.append(img);
        img.addEventListener("click", (event) => {
          handleClick(event);
        });
      });
  });

};

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramen) => {
      const ramenMenuDiv = document.getElementById("ramen-menu");
      ramen.forEach((noodle) => {
        const img = document.createElement("img");
        img.src = noodle.image;
        img.id = noodle.id;
        ramenMenuDiv.append(img);
        img.addEventListener("click", (event) => {
          handleClick(event);
        });
      });
    })
};

const main = () => {
  displayRamens();
  const ramenForm = document.querySelector("#new-ramen");
  addSubmitListener(ramenForm);

  // Invoke displayRamens here
  // Invoke addSubmitListener here
};

main();

// Export functions for testing
export { displayRamens, addSubmitListener, handleClick, main };
