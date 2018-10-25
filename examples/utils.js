import leaflet from 'leaflet';

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
  leafletPopup
};
