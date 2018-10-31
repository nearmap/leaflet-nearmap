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
import northCRS from 'leaflet-nearmap/crs/north';
import layer from 'leaflet-nearmap/layers/north';

const map = leaflet.map('mapid', {
  crs: northCRS,
  center: [-34.915302, 138.595637],
  zoom: 13
});

map.addLayer(layer);

map.setView(center, zoom);
```


See [./examples/index.js](./examples/index.js) for more details.


## Running the Examples

```bash
npm ci
npx run
```

This starts a webserver and you can see the running app at http://localhost:8080
