/* global document */
import leaflet from 'leaflet';
import {render} from './utils';
import * as config from './config';

/**
 * Generate Leaflet Map container
 */
const map = leaflet.map('mapid');

render(map, config);

/**
 * Binding "onClickHandler" on four buttons
 */
['btn_vert', 'btn_north', 'btn_south', 'btn_east', 'btn_west'].forEach((id)=> {
  document.getElementById(id).addEventListener('click',
    (event)=> render(map, {
      ...config,
      heading: event.target.getAttribute('data-heading')
    })
  );
});
