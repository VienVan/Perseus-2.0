console.log("map hit");
$(document).ready(function(){

    L.mapbox.accessToken = 'pk.eyJ1IjoidmllbnZhbiIsImEiOiJjaW1uczNyazYwMDE3dGtseTUxNndqcTEyIn0.fkvvqUjwFKLu5JhdbwKNWw';
    var map = L.mapbox.map('map')
    .setView([40, -74.50], 9);
    var circle = L.circle([51.508, -0.11], 500, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(mymap);

})
