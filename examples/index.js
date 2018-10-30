/* global document */
import leaflet from 'leaflet';
import {render} from './utils';

/**
 * configuration
 */
const url = 'https://api.nearmap.com/tiles/v3/{contentType}/{z}/{x}/{y}.img?tertiary=default&apikey=Yzc2MjEzMWUtY2Q4YS00NTM2LTgyMDgtMDljZjI2YTdhMTMz';
const zoom = 13;
const lat = -34.915302;
const lng = 138.595637;
const heading = 'HEADING_NORTH';
const center = [lat, lng];

/**
 * Generate Leaflet Map container
 */
const map = leaflet.map('mapid');

map.setView(
  center,
  zoom
);

render(map, {url, heading});

/**
 * Binding "onClickHandler" on four buttons
 */
['btn_vert', 'btn_north', 'btn_south', 'btn_east', 'btn_west'].forEach((id)=> {
  document.getElementById(id).addEventListener('click',
    (event)=> render(map, {
      url,
      heading: event.target.getAttribute('data-heading')
    })
  );
});
