export function fetchBreeds() {
  return new Promise((resolve, reject) => {
    fetch("https://api.thedogapi.com/v1/breeds/")
      .then((response) => {
        console.log(response);
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(
            new Error("Failed to fetch breeds: " + response.status + " ERROR")
          );
        }
      })

      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}
