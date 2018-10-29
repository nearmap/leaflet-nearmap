import leaflet from 'leaflet';

/**
  * Wraping TileLayer with custom getTileUrl of north heading
  *
  **/
export default function north(url) {
  return leaflet.TileLayer.extend({
    getTileUrl: function(coords) {
      return (
        url
          .replace('{contentType}', 'North')
          .replace('{x}', coords.x)
          .replace('{y}', coords.y)
          .replace('{z}', coords.z)
      );
    }
  });
}
