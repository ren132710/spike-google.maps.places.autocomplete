/*
 * spike
 *  - understand how Autocomplete works
 *  - with and without async, defer attributes
 *  - with and without callback param
 *  - test with parcel
 */

const placeSearch = document.querySelector('[data-place-search]')
const placeResult = document.querySelector('[data-place-result]')

const autocomplete = new google.maps.places.Autocomplete(placeSearch, {
  types: ['geocode', 'cities'],
  fields: ['place_id', 'geometry', 'name', 'icon', 'address_components'],
  // fields: ['place_id', 'formatted_address', 'geometry.location'],
})
console.log(autocomplete)

autocomplete.addListener('place_changed', () => {
  const place = autocomplete.getPlace()
  if (place == null) return
  // if (!place.geometry) return
  placeResult.textContent = JSON.stringify(place, null, 2)
  // const lat = place.geometry.location.lat()
  // const long = place.geometry.location.lng()
  // const location = place.address_components[0].long_name
  // const maps_place_id = place.place_id
  // console.log('params: ', lat, long, maps_place_id, location)
})

/*
let autocomplete
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  initAutocomplete()
}

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(placeSearch, {
    types: ['geocode', 'cities'],
    fields: ['place_id', 'geometry', 'name', 'icon', 'address_components'],
  })
  // autocomplete.setFields(['place_id', 'geometry', 'name', 'icon', 'address_components'])
  console.log(autocomplete)

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (place == null) return
    // if (!place.geometry) return
    placeResult.textContent = JSON.stringify(place, null, 2)
    // const lat = place.geometry.location.lat()
    // const long = place.geometry.location.lng()
    // const location = place.address_components[0].long_name
    // const maps_place_id = place.place_id
    // console.log('params: ', lat, long, maps_place_id, location)
  })
}
*/
