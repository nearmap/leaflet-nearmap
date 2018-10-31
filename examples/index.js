/* global document */
import leaflet from 'leaflet';
import {render} from './utils';


/**
 * configuration
 */
const demoKey ='Yzc2MjEzMWUtY2Q4YS00NTM2LTgyMDgtMDljZjI2YTdhMTMz';
const url = `https://api.nearmap.com/tiles/v3/{contentType}/{z}/{x}/{y}.img?tertiary=default&apikey=${demoKey}`;


function initMap() {
  // demo area that is available for demo API-key
  const lat = -34.915302;
  const lng = 138.595637;
  const zoom = 13;
  const heading = 'HEADING_NORTH';

  const map = leaflet.map('mapid', {
    center: [lat, lng],
    zoom
  });

  render(map, {url, heading});

  return map;
}


function initButtons(map) {
  const buttons = [
    'btn_vert', 'btn_north', 'btn_south', 'btn_east', 'btn_west'
  ];

  for (const id of buttons) {
    document.getElementById(id).addEventListener('click', ({target})=> {
      const heading = target.getAttribute('data-heading');
      render(map, {url, heading});
    });
  }
}


function init() {
  const map = initMap();
  initButtons(map);
}

init();
