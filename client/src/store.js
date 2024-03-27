import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => {
    return {
      breedsList: [],
      searchList: [],
      error: null,
      searchQuery: "",
      isLoading: false,
      isInputDisabled: false,
      message: "",
      lastBreedState: [],
      indexClicked: 0,
      loginEmail: "",
      loginPassword: "",
      isAuthenticated: false,
      accessToken: "",
      errorNotification: "",
      btnMode: "",
    };
  },
  getters: {
    displayedList() {
      if (this.searchQuery) {
        return this.searchList;
      } else {
        return this.breedsList;
      }
    },
    loadingState() {
      if (this.isLoading) {
        return this.message;
      } else if (!this.isLoading && this.error) {
        return this.error;
      }
    },
    receivedDataState() {
      if (!this.displayedList.length && !this.isLoading) {
        return this.message;
      }
    },
  },
  actions: {
    fetchBreeds() {
      return new Promise((resolve, reject) => {
        fetch("https://api.thedogapi.com/v1/breeds/")
          .then((response) => {
            if (response.ok) {
              resolve(response.json());
            } else {
              reject(
                new Error(
                  response.status + " error" + " Failed to fetch breeds: "
                )
              );
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    searchBreed(searchInput) {
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
    },
    fetchBreedData(breedName) {
      this.isLoading = true;
      this.message = "Data is loading...";

      this.fetchBreeds()
        .then((results) => {
          this.isLoading = false;
          if (results.length > 0) {
            this.breedsList = results.map((breed) => {
              breed.isActive = false;
              if (breedName.toLowerCase() === breed.name.toLowerCase()) {
                breed.isActive = true;
              }
              return breed;
            });
            this.message = "";
          } else {
            this.message = "No Data Found. Please try again later.";

            this.breedsList = [];
            this.isInputDisabled = true;
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.name + ": " + error.message;
          this.isInputDisabled = true;
        });
    },
    getSearchResults(input) {
      this.isLoading = true;
      this.message = "Data is loading...";
      this.searchQuery = input;

      if (this.searchQuery.length === 0) {
        this.isLoading = false;
      }

      this.searchBreed(this.searchQuery)
        .then((results) => {
          this.isLoading = false;
          if (results.length > 1) {
            this.message = "";
            this.searchList = results.map((breed) => {
              breed.isActive = false;
              return breed;
            });
          } else if (results.length === 1) {
            results[0].isActive = true;
            this.searchList = results;

            this.message = "";
            return this.searchList;
          } else {
            this.searchList = [];

            if (this.searchQuery) {
              this.message = `Your searches for "${this.searchQuery}" did not have any matches. Try different keywords.`;
            } else {
              this.message = "No Data Found. Please try again later.";
            }
          }
        })
        .catch((error) => {
          this.isLoading = false;
          this.error = error.name + ": " + error.message;
          this.isInputDisabled = true;
        });
    },

    resetToDefault() {
      this.lastBreedState = [];
      this.indexClicked = 0;
    },
    resetSearchQuery() {
      this.searchQuery = "";
    },
    toggleCard(breed, id) {
      this.setBreedIsActive(this.ifBreedActive(this.toggleIsActive(breed)));
      this.addBreedState(id);
    },

    toggleIsActive(breed) {
      breed.isActive = !breed.isActive;
      return breed;
    },
    ifBreedActive(breed) {
      if (breed.isActive) {
        this.indexClicked++;
        return breed;
      }
      return breed;
    },
    setBreedIsActive(breed) {
      this.displayedList.forEach((item) => {
        if (item.name !== breed.name) {
          item.isActive = false;
          return item;
        }
        return item;
      });
    },
    addBreedState(id) {
      if (this.displayedList[id].isActive) {
        this.lastBreedState.push(id);
      }
    },
    iterateDisplayedList(isActive) {
      this.displayedList.forEach((breed) => (breed.isActive = isActive));
    },

    setAuth(email, password, router, btnMode) {
      this.loginEmail = email;
      this.loginPassword = password;
      this.btnMode = btnMode;

      console.log(this.btnMode);
      return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/auth/${this.btnMode}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.loginEmail,
            password: this.loginPassword,
          }),
        })
          .then((response) => response.json())
          .then((accessToken) => {
            this.accessToken = accessToken;
            console.log(accessToken);
            if (this.accessToken.accessToken) {
              this.isAuthenticated = true;
              router.push({
                name: "breeds",
              });

              return this.accessToken.accessToken;
            }
            this.isAuthenticated = false;
            console.log(this.accessToken.errors.msg);
            this.errorNotification = this.accessToken.errors.msg;
            return this.errorNotification;
          });
      });
    },
    userUnAuth(router) {
      return new Promise((resolve, reject) => {
        fetch(`http://localhost:8080/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken: this.accessToken,
          }),
        }).then((response) => {
          console.log(response);
          if (response.ok) {
            router.push({
              name: "auth",
            });
            this.isAuthenticated = false;
          } else {
            reject(new Error(response.status + " error"));
          }
        });
        // .then((data) => {
        //   console.log(data);
        // });
      });
    },

    checkIfValidToken() {
      console.log(this.accessToken);
      // setInterval(() => {
      return new Promise((resolve, reject) => {
        console.log(resolve);
        fetch("http://localhost:8080/breeds", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${this.accessToken}`,
          },
        })
          .then((response) => {
            console.log(response);
            if (response.ok) {
              resolve(response.json());
            } else {
              reject(new Error(response.status + " error"));
            }
          })
          .then((results) => {
            console.log(results);
          })
          .catch((error) => {
            reject(error);
          });
      });
      // }
      // , 6000);
    },
  },
});
