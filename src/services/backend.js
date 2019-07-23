const API = `http://localhost:3000/`

export const getParks = (query = '') => {
  if (query === '')
    return fetch(API + 'parks').then(res => res.json())
  else {
    let search = query.replace(/ /g, "+")
    return fetch(API + `parks&search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(res => res.json())
  }
}
export const getPark = (parkId) => fetch(API + 'parks/' + parkId).then(res => res.json())

export function getTrips() {
  if (localStorage.token)
    return (fetch(API + 'trips', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      }
    })).then(res => res.json())
}

export const login = (user) => {
  return (
    fetch(API + 'login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ user })
    }).then(res => res.json())
  )
}

export function getProfile() {
  if (localStorage.token)
    return (fetch(API + 'getUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      }
    })).then(res => res.json())
}
