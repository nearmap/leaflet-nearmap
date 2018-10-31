# leaflet-nearmap
Use leaflet library with Nearmap's Tile API.


## Installation

```bash
npm install --save-dev leaflet-nearmap
```

## Usage

Follow the [Leaflet docs](https://leafletjs.com/reference-1.3.4.html)
for setting up a basic map.

Import custom CRS for panoramas to initialize the map, and add the respective
layer:

```js
import leaflet from 'leaflet';
import northCrs from 'leaflet-nearmap/crs/north';
import northLayer from 'leaflet-nearmap/layers/north';

const ApiKey = 'YOUR_API_KEY';
const UrlTemplate = `https://api.nearmap.com/tiles/v3/{layer}/{z}/{x}/{y}.img?tertiary=default&apikey=${ApiKey}`;

const map = leaflet.map('mapid', {
  crs: northCrs,
  center: [-34.915302, 138.595637],
  zoom: 13
});

map.addLayer(northLayer(UrlTemplate));
```


See [./examples/index.js](./examples/index.js) for more details.


## Running the Examples

```bash
npm ci
npx run
```

This starts a webserver and you can see the running app at http://localhost:8080
