// const API = `http://localhost:3000/`;
const API = "https://park-browser-backend.herokuapp.com/";

export const getParks = (query = "") => {
  if (query === "")
    return fetch(API + "parks", {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "https://park-browser-frontend.herokuapp.com/",
        mode: "cors"
      }
    }).then(res => res.json());
  else {
    let search = query.replace(/ /g, "+");
    return fetch(API + `parks&search=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res => res.json());
  }
};
export const getPark = parkId => fetch(API + "parks/" + parkId).then(res => res.json());

export const searchNPS = (category, parkCode) =>
  fetch(API + `parks&nps_search=${category}&parkCode=${parkCode}`).then(res => res.json());

export const getTrips = (page = 1) => {
  if (localStorage.token)
    return fetch(API + `trips&page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
        // "Access-Control-Allow-Origin": "*"
      }
    }).then(res => res.json());
};

export const login = user => {
  return fetch(API + "login", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ user })
  }).then(res => res.json());
};

export const getProfile = () => {
  if (localStorage.token)
    return fetch(API + "getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then(res => res.json());
};

export const signUp = user => {
  return fetch(API + "users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ user })
  }).then(res => res.json());
};

export const createTrip = trip => {
  return fetch(API + "trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({ trip })
  }).then(res => res.json());
};

export const editTrip = trip => {
  return fetch(API + "trips/" + trip.id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({ trip })
  }).then(res => res.json());
};

export const deleteTrip = tripId =>
  fetch(API + `trips/${tripId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.token}`
    }
  }).then(res => res.json());

export const createPicture = picture => {
  return fetch(API + "pictures", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({ picture })
  }).then(res => res.json());
};

export const deletePicture = pictureId =>
  fetch(API + `pictures/${pictureId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.token}`
    }
  }).then(res => res.json());

export const flickrPictures = (parkName, page = 1) =>
  fetch(API + `pictures&search=${parkName.replace(/ /g, "+")}&page=${page}`).then(res =>
    res.json()
  );
