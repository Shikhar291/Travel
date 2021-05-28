let platform = new H.service.Platform({
    'apikey': 'LrzJUF8z6S9FpjJmT5bSSVgoaZ2DeBo8QsJwPzjEbCc'
  });


  
  function landmarkGeocode() {
      let title=document.querySelector('h1').textContent;
    var geocoder = platform.getSearchService(),
        landmarkGeocodingParameters = {
          q: title,
          at: '0,0',
          limit: 1
        };
  
    geocoder.discover(
      landmarkGeocodingParameters,
      showMap,
      (e)=> console.log(e)
    );
  }



// Instantiate (and display) a map object:

function showMap(result)
{
    let locations = result.items[0].position;
   
    let defaultLayers = platform.createDefaultLayers();
let map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 10,
      center: { lat: locations.lat, lng: locations.lng }
    });


    var Marker = new H.map.Marker({lat:locations.lat, lng:locations.lng});
    map.addObject(Marker);

    let ui = H.ui.UI.createDefault(map, defaultLayers);
}













landmarkGeocode();