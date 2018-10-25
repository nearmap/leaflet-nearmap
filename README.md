# leaflet-nearmap-layer
Use leaflet js library with Nearmap serivces

## Installation

```bash
npm install --save-dev leaflet-nearmap
```

## Usage

You need to import nearmap CRS from leaflet-nearmap or your own one, set it up as Leaflet CRS, e.g`leaflet.map('mapid', {crs: YOUR_CRS)`.

[index.html](./examples/index.html):
```html
<!DOCTYPE html>
<html style="width: 100%; height: 100%;">
<head>
  <title>Quick Start - Leaflet</title>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" type="image/x-icon" href="docs/images/favicon.ico" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
    crossorigin="" />
</head>

<body>
  <div id="mapid" style="width: 100%; height: 100px;"></div>
</html>
```

More importantly, setup Leaflet Map container `<div id="mapid"></div>` for `L.map('mapid')` search.
[Leaflet docs](https://leafletjs.com/reference-1.3.4.html)

[./examples/index.js](./examples/index.js):
```js
/* global document */
import leaflet from 'leaflet';
import CRS from 'leaflet-nearmap';
import { 
  url, // 'https://yourdomain.com/tiles/{contentType}/{z}/{x}/{y}.img'
  zoom, // zoomLevel
  tileSize, // new Point()
  center, // [lat, lng]
  Heading, // String: 'North', 'South', 'EAST', 'WEST'
} from './YOUR_CONFIG';

/**
 * Generate Nearmap customised CRS
 */
const crs = new CRS(heading);

/**
 * Generate Leaflet Map container
 */
const nearMap = leaflet.map('mapid', {
  crs: crs.crs()
});

const view = nearMap.setView(
  center,
  zoom
);

/**
* Extend TileLayer with customised fetching tile URL
*
* @returns TileLayer
**/
const TileLayer = leaflet.TileLayer.extend({
  getTileUrl: crs.getTileUrl({url, heading})
});

const layer = new TileLayer({
  tileSize: tileSize
});

layer.addTo(view);

```

Switch among panorama views

```js

/**
 *  Switch panorama view
 *  1. Remove existing TileLayer
 *  2. Generate new CRS
 *  3. Inject into Map Oject
 *  4. Generate layer with new heading
 *  5. Add new layer
 */
function switchView(heading) {
  // Generate CRS with new heading
  const newCRS = new CRS(switchedHeading);

  // Remove existing TileLayer
  nearMap.eachLayer((existedLayer)=> nearMap.removeLayer(existedLayer));

  // Inject into Map Oject
  nearMap.options.crs = newCRS.crs();
  
  nearMap.setView(
    center,
    zoom
  );

  // Generate layer with heading
  const NewLayerClass = leaflet.TileLayer.extend({
    getTileUrl: newCRS.getTileUrl({url, heading: switchedHeading})
  });

  const newLayer = new NewLayerClass({
    tileSize: tileSize
  });

  // Add new layer to map
  nearMap.addLayer(newLayer);
}
```

Leaflet UI layer
```js
const nearMap = leaflet.map('mapid', {
  crs: crs.crs()
});

const view = nearMap.setView(
  rotateCenter({center, heading}),
  zoom
);

view.on('click', (coords)=> {
  leaflet.popup()
    .setLatLng(coords.latlng)
    .setContent(`You clicked the map at ${coords.latlng.toString()}`)
    .openOn(view);
});

```

## Running the Examples

```bash
npm ci
npx run
```

This starts a webserver and you can see the running app at http://localhost:8081
