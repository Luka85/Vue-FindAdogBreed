export function fetchAllData(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })

    .catch((error) => {});
}
