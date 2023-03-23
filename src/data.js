export function fetchBreeds() {
  return new Promise((resolve, reject) => {
    fetch("https://api.thedogapi.com/v1/breeds/")
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        }
      })

      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
