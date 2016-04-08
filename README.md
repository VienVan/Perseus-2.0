#[Perseus](https://gaze-perseus.herokuapp.com/)
##A Crowd-sourcing platform to help you discover where the brightest stars shine near you.

#Technologies Used
1. MongoDB as NoSQL database for scalability.
2. Express.js, a light-weight MVC framework
3. Angular.js, a power and open source front-end framework.
4. Node.js as the back-end server.
5. Heroku as a freemium hosting platform.
6. Leaflet-Angular-Directive
7. Mapbox.js GeoJSON API
8. Boostrap as a CSS class-based framework
9. Font Awesome from Boostrap
10. Trello, for project planning

#Set-up Environment
Fork and clone the repo to make any contributions/edits. Once you have the repo on your system,

run ```npm install```

to download all of the dependencies.

Don't forget to run ```mongod```,


Then run ```nodemon server.js``` to start your server.

Default port at ```localhost:3000```.

To work with existing database,

run ```node db/seeds.js``` in a separate terminal window.

#Resources
I found most of the existing Dark Sky sites through DarkSkyFinder.com
[Angular Leaflet Directive](http://tombatossals.github.io/angular-leaflet-directive) Provided detailed documentation on how to set up and customize maps and markers using Angular and Leaflet.

#Code
Initializing a map in angular with a leaflet directive

```
<leaflet class="leaflet" defaults="defaults" bounds="bounds" controls="controls" markers="markers" layers="layers" center="center" height="700px" width="100%">

</leaflet>
```

Angular.extend hoists the bounding attributes to the controller's $scope
```angular.extend($scope, {
  bounds: bounds,
  icons: icons,
  center: {
    autoDiscover: true
  },
  defaults: {
    scrollWheelZoom: false,
    maxZoom: 14
  },
  layers: {
    baselayers: {
      mapbox_light: {
        name: 'Mapbox Dark',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        type: 'xyz',
        layerOptions: {
          opacity: .6,
          apikey: 'pk.eyJ1IjoidmllbnZhbiIsImEiOiJjaW1uczNyazYwMDE3dGtseTUxNndqcTEyIn0.fkvvqUjwFKLu5JhdbwKNWw',
          mapid: 'mapbox.dark'
        }
      },
      osm: {
          name: 'OpenStreetMap',
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          type: 'xyz'
      }
    }
  },
  markers: {}
});```
