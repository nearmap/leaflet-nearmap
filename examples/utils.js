import leaflet from 'leaflet';
import {getCRSByHeading} from 'leaflet-nearmap/helper/getCRSByHeading';
import {getLayerByHeading} from 'leaflet-nearmap/helper/getLayerByHeading';


/**
*  setup a popup with coords where you clicked on
**/
function leafletPopup(view) {
  view.on('click', (coords)=> {
    leaflet.popup()
      .setLatLng(coords.latlng)
      .setContent(`You clicked the map at ${coords.latlng.toString()}`)
      .openOn(view);
  });
}


/**
 *  Render process
 *  1. Remove existing TileLayer
 *  2. Generate new CRS
 *  3. Inject CRS into Map Oject
 *  4. Generate layer with new heading
 *  5. Add new layer
 */
export function render(map, {url, heading}) {

  // Get current zoom level and coords for next view
  const zoom = map.getZoom();
  const center = map.getCenter();

  // Remove existing TileLayer
  map.eachLayer((existingLayer)=> map.removeLayer(existingLayer));

  // Inject crs into Map Oject
  map.options.crs = getCRSByHeading(heading);

  const view = map.setView(center, zoom);

  // Generate layer with heading
  const layer = getLayerByHeading(heading, url);

  // Add new layer to map
  map.addLayer(layer);

  leafletPopup(view);
}
