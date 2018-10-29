/* global document */
import leaflet from 'leaflet';
import {getCRSByHeading} from '../src/helper/getCRSByHeading';
import {getLayerByHeading} from '../src/helper/getLayerByHeading';
import {leafletPopup} from './utils';
import * as config from './config';

/**
 *  Panaroma view button onclick listeners
 *  users could switch different heading view by clicking buttons
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
  const LayerClass = getLayerByHeading(heading, url);

  const layer = new LayerClass({
    tileSize
  });

  // Add new layer to map
  map.addLayer(layer);

  leafletPopup(view);
}

/**
 * Generate Leaflet Map container
 */
const nearMap = leaflet.map('mapid');

render(nearMap, config);

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
