export function fetchBreeds() {
  return fetch("https://api.thedogapi.com/v1/breeds/")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })

    .catch((error) => {
      throw new Error(error.message);
    });
}
