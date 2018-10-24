import leaflet from 'leaflet';
/**
* Rotate the lat, lng depending on the projection's heading
* In order to using one coords for four directions
*
* @returns [lat, lng]
**/
function rotateCenter({center, heading}) {
  if (heading === 'HEADING_NORTH' || heading === 'HEADING_SOUTH') {
    return center;
  }
  return center.map((coord)=> -coord);
}


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

export {
  rotateCenter,
  leafletPopup
};
