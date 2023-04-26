export function fetchBreeds() {
  return new Promise((resolve, reject) => {
    fetch("https://api.thedogapi.com/v1/breeds/")
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(
            new Error(response.status + " error" + " Failed to fetch breeds: ")
          );
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function searchBreed(searchInput) {
  return new Promise((resolve, reject) => {
    fetch(`https://api.thedogapi.com/v1/breeds/search?q=${searchInput}`)
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(new Error(response.status + " - Failed to fetch breeds "));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
