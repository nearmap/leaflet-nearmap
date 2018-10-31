/* global document */
import leaflet from 'leaflet';
import {getCRSByHeading} from 'leaflet-nearmap/helper/getCRSByHeading';
import {getLayerByHeading} from 'leaflet-nearmap/helper/getLayerByHeading';


/**
 * configuration
 */
const demoKey ='Yzc2MjEzMWUtY2Q4YS00NTM2LTgyMDgtMDljZjI2YTdhMTMz';
const urlTemplate = `https://api.nearmap.com/tiles/v3/{contentType}/{z}/{x}/{y}.img?tertiary=default&apikey=${demoKey}`;


/**
*  setup a popup with coords where you clicked on
**/
function initPopup(map) {
  map.on('click', (coords)=> {
    leaflet.popup()
      .setLatLng(coords.latlng)
      .setContent(`You clicked the map at ${coords.latlng.toString()}`)
      .openOn(map);
  });
}

/**
 *  Update process
 *  1. Remove existing TileLayer
 *  2. Generate new CRS
 *  3. Inject CRS into Map Oject
 *  4. Generate layer with new heading
 *  5. Add new layer
 */
export function updateMap(map, url, heading) {
  // Get current zoom level and coords for next view
  const zoom = map.getZoom();
  const center = map.getCenter();

  // Remove existing TileLayer
  map.eachLayer((existingLayer)=> map.removeLayer(existingLayer));

  // Inject crs into Map Oject
  map.options.crs = getCRSByHeading(heading);
  // reset to previous center and zoom
  map.setView(center, zoom);

  // Generate layer with heading
  const layer = getLayerByHeading(heading, url);
  // Add new layer to map
  map.addLayer(layer);
}


function initButtons(map) {
  const buttons = [
    'btn_vert', 'btn_north', 'btn_south', 'btn_east', 'btn_west'
  ];

  for (const id of buttons) {
    document.getElementById(id).addEventListener('click', ({target})=> {
      const heading = target.getAttribute('data-heading');
      updateMap(map, urlTemplate, heading);
    });
  }
}


function init() {
  // demo area that is available for demo API-key
  const lat = -34.915302;
  const lng = 138.595637;
  const zoom = 13;
  const heading = 'HEADING_NORTH';

  const map = leaflet.map('mapid', {
    center: [lat, lng],
    zoom
  });

  updateMap(map, urlTemplate, heading);

  initPopup(map);

  initButtons(map);
}

init();
