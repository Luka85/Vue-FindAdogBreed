export function fetchBreeds() {
  return fetch("https://api.thedogapi.com1/v1/breeds/")
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then((results) => {
      return results;
    })

    .catch((error) => {
      return error;
    });
}
