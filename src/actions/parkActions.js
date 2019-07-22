export const getLat = (park) => park.latLong.slice(4).split(", long:").map(num => parseFloat(num))[0]
export const getLong = (park) => park.latLong.slice(4).split(", long:").map(num => parseFloat(num))[1]

export const displayParks = (parks, search) => {
  let newParks = parks
  return newParks.filter(park => searchParks(park, search))
}
export const searchParks = (park, search) => {
  return (
    park.fullname.toLowerCase().includes(search) ||
    park.description.toLowerCase().includes(search) ||
    park.weatherInfo.toLowerCase().includes(search) ||
    park.states.includes(search)
  )
}
