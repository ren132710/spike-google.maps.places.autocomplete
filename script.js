/*
 * spike
 *  - understand how SearchBox works
 *  - async: file is downloaded asynchronously and then executed as soon as it’s downloaded
 *  - defer: file is downloaded asynchronously, but executed only when the document parsing is completed
 *  - callback: initAutocomplete
 *      use to load google once page has loaded
 *      be sure to declare the global variable: window.initAutocomplete = initAutocomplete
 *  - to hide the api key, build the <script> tag programmatically in index.html
 *
 *    //TODO: This approach does not work with parcel 2.0
 *     <script>
 *     const API_KEY = process.env.API_KEY
 *     const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initSearchBox`
 *     const script = document.createElement('script')
 *     script.src = API_URL
 *     script.defer = true
 *     document.head.appendChild(script)
 *     console.log('script tag: ', document.head.appendChild(script))
 *   </script>
 */

const placeSearch = document.querySelector('[data-place-search]')
const placeResult = document.querySelector('[data-place-result]')

function initAutocomplete() {
  const autocomplete = new google.maps.places.Autocomplete(placeSearch, {
    types: ['geocode'],
    fields: ['place_id', 'name', 'geometry.location'],
  })
  console.log(autocomplete)

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace()
    if (place == null) return
    // if (!place.geometry) return
    placeResult.textContent = JSON.stringify(place, null, 2)
    const location = place.name
    const lat = place.geometry.location.lat()
    const long = place.geometry.location.lng()
    const maps_place_id = place.place_id
    console.log('params: ', location, lat, long, maps_place_id)
  })
}
window.initAutocomplete = initAutocomplete
