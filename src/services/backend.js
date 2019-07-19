const API = `http://localhost:3000/`

export const getParks = () => fetch(API + 'parks').then(res => res.json())

export async function getTrips() {
  if (localStorage.token)
    return await (fetch(API + 'trips', {
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

export async function getProfile() {
  if (localStorage.token)
    return await (fetch(API + 'getUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      }
    })).then(res => res.json())
}