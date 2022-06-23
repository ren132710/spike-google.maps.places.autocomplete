/*
 * spike
 *  - understand how SearchBox works
 *  - async: works if present or not
 *  - defer: works if present or not
 *  - type="text/javascript": works if present or not
 *  - callback: initSearchBox
 *      use to load google once page has loaded
 *      be sure to include: window.initSearchBox = initSearchBox
 *  - to hide the api key, build the <script> tag programmatically in index.html using dotenv
 *     <script>
 *     const API_KEY = process.env.API_KEY
 *     const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initSearchBox`
 *     const script = document.createElement('script')
 *     script.src = API_URL
 *     script.defer = true
 *     script.async = true
 *     document.head.appendChild(script)
 *     console.log('script tag: ', document.head.appendChild(script))
 *   </script>
 */

//TODO: Troubleshoot 'This page can't load Google Maps correctly. Do you own this website?'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const placeSearch = document.querySelector('[data-place-search]')
const placeResult = document.querySelector('[data-place-result]')

function initAutocomplete() {
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
}
window.initAutocomplete = initAutocomplete
