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
import leaflet from 'leaflet';
import {getCRSByHeading} from '../src/helper/getCRSByHeading';
import {getLayerByHeading} from '../src/helper/getLayerByHeading';
import {leafletPopup} from './utils';
import * as config from './config';

/**
 *  Rendering 
 *  1. Remove existing TileLayer
 *  2. Generate new CRS
 *  3. Inject into Map Oject
 *  4. Generate layer with new heading
 *  5. Add new layer
 */
function render(map, configure) {
  const {
    url,
    zoom,
    heading,
    center,
    tileSize
  } = configure;

  // Remove existing TileLayer
  map.eachLayer((existedLayer)=> map.removeLayer(existedLayer));

  // Inject crs into Map Oject
  map.options.crs = getCRSByHeading(heading);

  const view = map.setView(
    center,
    zoom
  );

  // Generate layer with heading
  const NewLayerClass = getLayerByHeading(heading, url);

  const newLayer = new NewLayerClass({
    tileSize: tileSize
  });

  // Add new layer to map
  map.addLayer(newLayer);

  leafletPopup(view);
}

/**
 * Generate Leaflet Map container
 */
const nearMap = leaflet.map('mapid');

render(nearMap, config);

```
Import nearmap custom CRS. e.g
```js
import northCRS from 'leaflet-nearmap/crs/north';

const nearMap = leaflet.map('mapid',{
  crs: northCRS
});

```
Import nearmap custom Layer, which overwrites `getTileUrl` for nearmap panorama views, e.g
```js
import NorthLayer from 'leaflet-nearmap/layers/north';
const NewLayerClass = northLayer;

const layer = new NorthLayer();

map.addLayer(layer);

```

Adding event listeners on switching among panorama views buttons

```js

/**
 * Binding "onClickHandler" on four buttons
 */
['btn_vert', 'btn_north', 'btn_south', 'btn_east', 'btn_west'].forEach((id)=> {
  document.getElementById(id).addEventListener('click',
    (event)=> render(nearMap, {
      ...config,
      heading: event.target.getAttribute('data-heading')
    })
  );
});
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
