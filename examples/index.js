/* global document */
import leaflet from 'leaflet';
import CRS from '../src';
import {leafletPopup} from './utils';
import {
  url,
  zoom,
  heading,
  center,
  tileSize
} from './config';

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

/**
 * Generate view with center and zoomLevel
 */
const view = nearMap.setView(
  center,
  zoom
);

/**
* Extend TileLayer with customised fetching tile URL
**/
const TileLayer = leaflet.TileLayer.extend({
  getTileUrl: crs.getTileUrl({url, heading})
});

const layer = new TileLayer({
  tileSize: tileSize
});

layer.addTo(view);

leafletPopup(view);

/**
 *  Panaroma view button onclick listeners
 *  users could switch different heading view by clicking buttons
 *  1. Remove existing TileLayer
 *  2. Generate new CRS
 *  3. Inject into Map Oject
 *  4. Generate layer with new heading
 *  5. Add new layer
 */
function onClickHandler(event) {
  // Get heading from button attribute
  const switchedHeading = event.target.getAttribute('data-heading');

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

  // Not clear why need this. but work (https://github.com/Leaflet/Leaflet/issues/2553)
  // nearMap._resetView(nearMap.getCenter(), nearMap.getZoom(), true);

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

/**
 * Binding "onClickHandler" on four buttons
 */
['btn_vert', 'btn_north', 'btn_south', 'btn_east', 'btn_west'].forEach((id)=> {
  document.getElementById(id).addEventListener('click', onClickHandler);
});
