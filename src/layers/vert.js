import leaflet from 'leaflet';

/**
  * Wraping TileLayer with custom getTileUrl of vertical heading
  *
  **/
export default function vert(url) {
  return leaflet.TileLayer.extend({
    getTileUrl: function(coords) {
      return (
        url
          .replace('{contentType}', 'Vert')
          .replace('{x}', coords.x)
          .replace('{y}', coords.y)
          .replace('{z}', coords.z)
      );
    }
  });
}
